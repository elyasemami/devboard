import 'dotenv/config';
import { ProjectStatus, type NewProject } from './projects.repository.ts';
import { insertProject } from './projects.repository.ts';

export const projectStatus = {
  Active: 'active',
  Inactive: 'inactive',
  Completed: 'completed',
  Cancelled: 'cancelled',
} as const satisfies Record<string, ProjectStatus>;

export async function getProjectDetails(
  name: string,
  description: string,
  status: ProjectStatus,
  createdBy: string,
  dueDate: Date,
): Promise<NewProject> {
  const project: NewProject = {
    name: name,
    description: description,
    status: status ?? 'active',
    createdBy: createdBy,
    dueDate: dueDate,
  };
  return project;
}
export async function createProject(
  newProject: NewProject,
): Promise<NewProject> {
  const project = await getProjectDetails(
    newProject.name,
    newProject.description,
    newProject.status,
    newProject.createdBy,
    newProject.dueDate,
  );
  return insertProject(project);
}
