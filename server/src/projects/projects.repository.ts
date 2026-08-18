import { Pool, type PoolClient, DatabaseError } from "pg";
import { pool } from "../db/pool.ts";

/** Anything that can run a query: 
 * the pool, or a client 
 * inside a transaction. */
export type Executor = Pool | PoolClient;

export const ProjectStatus = {
  Active: "active",
  Inactive: "inactive",
  Completed: "completed",
  Cancelled: "cancelled",
} as const;

export type ProjectStatus = 
(typeof ProjectStatus)[keyof typeof ProjectStatus];

/** DB transport shape: snake_case, exactly 
 * what pg hands back. */
interface ProjectRow {
  id: string;
  name: string;
  description: string | null;
  project_status: ProjectStatus;
  current_owner_id: string;
  created_by: string;
  created_at: Date;
  updated_at: Date;
}

/** Domain shape: what the rest 
 * of the app works with. */
export interface Project {
  id: string;
  name: string;
  description: string | null;
  status: ProjectStatus;
  currentOwnerId: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

/** Input shape: only what a 
 * caller can actually know. */
export interface NewProject {
  name: string;
  description?: string | null;
  status?: ProjectStatus;
  currentOwnerId: string;
  createdBy: string;
}

function toProject(row: ProjectRow): Project {
  return {
    id: row.id,
    name: row.name,
    description: row.description,
    status: row.project_status,
    currentOwnerId: row.current_owner_id,
    createdBy: row.created_by,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

/** 23505 = unique_violation. 
 * Codes are stable across PG 
 * versions; messages are not. */
export function isUniqueViolation(err: unknown): err is DatabaseError {
  return err instanceof DatabaseError && err.code === "23505";
}

const INSERT_PROJECT = `
  INSERT INTO projects (name, description, project_status, current_owner_id, created_by)
  VALUES ($1, $2, $3, $4, $5)
  RETURNING id, name, description, project_status,
            current_owner_id, created_by, created_at, updated_at
`;

export async function insertProject(
  input: NewProject,
  db: Executor = pool,
): Promise<Project> {
  const { rows } = await db.query<ProjectRow>(INSERT_PROJECT, [
    input.name,                           
    input.description ?? null,           
    input.status ?? ProjectStatus.Active,  
    input.currentOwnerId,                  
    input.createdBy,                      
  ]);

  const row = rows[0];
  if (!row) throw new 
  Error("insertProject: INSERT ... RETURNING produced no row");

  return toProject(row);
}