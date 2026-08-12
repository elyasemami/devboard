import { pool } from "../db/pool.ts";

const ProjectStatusRow = {
  Acitve: "active",
  Inactive: "inactive",
  Completed: "completed",
  Cancelled: "cancelled",
} as const;

type ProjectStatusRow =
  (typeof ProjectStatusRow)[keyof typeof ProjectStatusRow];

interface ProjectRow {
  name: string;
  description: string;
  project_status: ProjectStatusRow;
  current_owner_id: string;
  created_by: string;
  created_at: Date;
  updated_at: Date;
}

export interface Project {
  Name: string;
  Description: string;
  projectStatus: string;
  currentOwnerId: string;
  createdBy: string;
  createdAt: Date;
}

/**
 *
 * @param row
 * @returns
 * we need to query the database to get the owner of a project,
 * and then insert the project into the table.
 */
function toProjcet(row: ProjectRow): Project {
  return {
    Name: row.name,
    Description: row.description,
    projectStatus: row.project_status,
    currentOwnerId: row.current_owner_id,
    createdBy: row.created_by,
    createdAt: row.created_at,
  };
}
// duplicate date submitted to pg
function isUniqueViolation(err: unknown): boolean {
  return (
    typeof err === "object" &&
    err !== null &&
    "code" in err &&
    (err as { code: string }).code === "23505"
  );
}

export async function insertProject(
  name: string,
  description: string,
  project_status: string,
  current_owner_id: string,
  created_by: string,
  created_at: Date,
  updated_at: Date,
): Promise<Project> {
  const ProjectOwner;
  const result = await pool.query<ProjectRow>(
    `INSERT INTO projects(id, name, description, project_status,
    current_owner_id )`,
  );
}
