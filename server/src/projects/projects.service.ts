import "dotenv/config";
import { ProjectStatus, type NewProject, type Project } from "./projects.repository.ts";
import { insertProject } from "./projects.repository.ts";


export async function createProject(newProject:NewProject): 
Promise<NewProject> 
    {
        const project = insertProject(newProject);
        return newProject;
    }
