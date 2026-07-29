import express, { type ErrorRequestHandler } from "express";
import { error } from "node:console";
import { randomUUID } from "node:crypto";

type Project = {
  id: string;
  name: string;
  description?: string;
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

// express application
const app = express();

// req total size limit
app.use(express.json({ limit: "1mb" }));

// health status
app.get("/health", (_req, res) => {
  res.json({ status: "ok", uptime: process.uptime() });
});

// getting all projects
app.get("/b/projects", (_req, res) => {
  const page = parseInt(_req.query.page as string) || 1;
  const limit = parseInt(_req.query.limit as string) || 20;

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const paginatedProjects = projects.slice(startIndex, endIndex);

  res.json({
    page,
    limit,
    totalItems: projects.length,
    totalPages: Math.ceil(projects.length / limit),
    data: paginatedProjects,
  });
});

app.post("/api/project", (_req, res) => {
  if (!isCreateProjectBody(_req.body)) {
    res.status(400).json({ error: "name is required and must be non-empty" });
    return;
  }
  const project: Project = {
    id: randomUUID(),
    name: _req.body.name,
    description: _req.body.description,
    createdAt: new Date().toISOString(),
  };
  projects.push(project);
  res
    .status(201)
    .location(`/api/projects/${project.id}`)
    .json({ data: project });
});

app.use((_req, res) => {
  res.status(404).json({ error: "Not Found" });
});

const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: "Internal Server Error " });
};

app.use(errorHandler);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
