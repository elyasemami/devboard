import { Router } from 'express';
import { date, z } from 'zod';

import {
  createProject,
  getProjectDetails,
  projectStatus,
} from './projects.service.ts';

const masterSchema = z.object({
  name: z.string().min(2).max(25),
  description: z.string().min(1).max(1000),
  status: z.enum(projectStatus),
  createdBy: z.string(),
  dueDate: z.coerce.date(),
});

const router = Router();

router.post('/newproject', async (req, res) => {
  const parsed = masterSchema.safeParse(req.body);
  if (!parsed.success)
    return res.status(400).json({ error: parsed.error.flatten() });

  const newProject = await getProjectDetails(
    parsed.data.name,
    parsed.data.description,
    parsed.data.status,
    parsed.data.createdBy,
    parsed.data.dueDate,
  );

  const project = await createProject(newProject);
  if (!project) {
    return res
      .status(500)
      .json({ error: 'There was a problem in New Project Creation.' });
  }
  res.status(201).json({
    message: 'Project Created!',
    createdBy: project.createdBy,
    dueDate: project.dueDate.toISOString().split('T')[0],
  });
});
export default router;
