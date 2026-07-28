import {
  createServer,
  type IncomingMessage,
  type ServerResponse,
} from "node:http";
import { randomUUID } from "node:crypto";
import { push } from "node:stream/iter";
import { uptime } from "node:process";
import { read } from "node:fs";

type Project = {
  id: string;
  name: string;
  description: string;
  createdAt: string;
};

type CreateProjectBody = { name: string; description?: string };

const projects: Project[] = [];

function isCreateProjectBody(value: unknown): value is CreateProjectBody {
  if (typeof value !== "object" || value === null) return false;
  const c = value as Record<string, unknown>;
  if (typeof c.name !== "string" || c.name.trim() === "") return false;
  if (c.description !== undefined && typeof c.description !== "string")
    return false;
  return true;
}

function sendJson(res: ServerResponse, status: number, body: unknown): void {
  const payload = JSON.stringify(body);
  res.writeHead(status, {
    "content-type": "application/json; charset=utf-8",
    "content-length": Buffer.byteLength(payload),
  });
  res.end(payload);
}

async function readJsonBody(req: IncomingMessage): Promise<unknown> {
  const chunks: Buffer[] = [];
  let size = 0;
  for await (const chunk of req as AsyncIterable<Buffer>) {
    size += chunk.length;
    if (size > 1000000) throw new Error("payload too large");
    chunks.push(chunk);
  }
  if (chunks.length === 0) return undefined;
  return JSON.parse(Buffer.concat(chunks).toString("utf8"));
}

const server = createServer(async (req, res) => {
  const url = new URL(
    req.url ?? "/",
    `http://${req.headers.host ?? "localhost"}`,
  );
  const route = `${req.method} ${url.pathname}`;

  try {
    switch (route) {
      case "GET /health":
        return sendJson(res, 200, { status: "ok", uptime: process.uptime() });

      case "GET /api/projects":
        return sendJson(res, 200, { data: projects });

      case "POST /api/projects": {
        const body = await readJsonBody(req);
        if (!isCreateProjectBody(body)) {
          return sendJson(res, 400, {
            error: "name is required and must not be non-empty",
          });
        }
        const project: Project = {
          id: randomUUID(),
          name: body.name.trim(),
          description: body.description?.trim() ?? "",
          createdAt: new Date().toISOString(),
        };
        projects.push(project);
        res.setHeader("location", `/api/projects/${project.id}`);
        return sendJson(res, 201, { data: project });
      }
      default:
        return sendJson(res, 404, { error: `No route for ${route}` });
    }
  } catch (err) {
    console.error(err);
    return sendJson(res, 500, { error: `Internal Server Error` });
  }
});
const port = Number(process.env.PORT ?? 3000);
server.listen(port, () => console.log(`listening on http://localhost:${port}`));
