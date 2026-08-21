import express from "express";
import cors from "cors";
import authRoutes from "./auth/auth.routes.ts";
import projectRoutes from "./projects/project.routes.ts";

export const app = express();

app.use(express.json());
app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));

app.use("/auth", authRoutes);
app.use("/projects", projectRoutes)

