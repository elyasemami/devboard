import { pool } from "../db/pool.ts";

interface SessionRow {
  id: string;
  users_id: string;
  created_at: Date;
  expires_at: Date;
}

export interface Session {
  id: string;
  userId: string;
  createdAt: Date;
  expiresAt: Date;
}

function toSession(row: SessionRow): Session {
  return {
    id: row.id,
    userId: row.users_id,
    createdAt: row.created_at,
    expiresAt: row.expires_at,
  };
}
function isUniqueViolation(err: unknown): boolean {
  return (
    typeof err === "object" &&
    err !== null &&
    "code" in err &&
    (err as { code: string }).code === "23505"
  );
}

export async function insertSession(
  id: string,
  user_id: string,
  created_at: Date,
  expires_at: Date,
): Promise<Session> {
  const result = await pool.query<SessionRow>(
    `INSERT INTO sessions(id, user_id, created_at, expires_at) VALUES ($1,$2,$3,$4) RETURNING *`,
    [id, user_id, created_at, expires_at],
  );
  const row = result.rows[0];
  if (!row) throw new Error("InsertUser: INSERT ... RETURNING produced no row");
  return toSession(row);
}

export async function findValidSession(id: string): Promise<Session | null> {
  const result = await pool.query<SessionRow>(
    `SELECT id, user_id, created_at, expires_at FROM sessions WHERE id=$1 AND expires_at > now()`,
    [id],
  );
  return result.rows[0] ? toSession(result.rows[0]) : null;
}

export async function deleteSession(id: string): Promise<void> {
  await pool.query(`DELETE FROM sessions WHERE id=$1`, [id]);
}
