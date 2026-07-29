import express, { type ErrorRequestHandler } from "express";

type Project = {
    id: string;
    name: string;
    description: string;
    createdAt: string;
}

type CreateProjectBody = {name:string; description?:string};

const projects: Project[] = [];

function isCreateProjectBody(value: unknown): value is CreateProjectBody {
  if (typeof value !== 'object' || value === null) return false;
  const c = value as Record<string, unknown>;
  if (typeof c.name !== 'string' || c.name.trim() === '') return false;
  if (c.description !== undefined && typeof c.description !== 'string') return false;
  return true;
}

// express application
const app = express();

// req total size limit
app.use(express.json({ limit: "1mb" }));

// health status
app.get('/health', (_req, res){
    res.json({status: 'ok', uptime: process.uptime()});

});

// getting all projects
app.get('/api/projects', (_req, res) => {
    res.json({data:projects});
});

app.post('/api/project', (_req, res) => {
    if(!isCreateProjectBody(_req.body)){
        res.status(400).json({error: 'name is required and must be non-empty'});
        return; 
    }
    const project: Project = {};
    projects.push(project);
    res.status(201).location(`/api/projects/${project.id}`).json({ data: project});

    
});
