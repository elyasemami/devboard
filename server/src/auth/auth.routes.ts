// src/auth/auth.routes.ts
import { Router } from "express";
import { uptime } from "node:process";
import { z } from "zod";
import { login, register } from "./auth.service.ts";

const masterSchema = z.object({
  email: z.email(),
  password: z.string().min(8).max(256),
  fullName: z.string().min(1).max(200),
});

const router = Router();

router.post("/register", async (req, res) => {
  const parsed = masterSchema.safeParse(req.body);
  if (!parsed.success)
    return res.status(400).json({ error: parsed.error.flatten() });
  const session = await register(
    parsed.data.email,
    parsed.data.password,
    parsed.data.fullName,
  );
  res.status(201).json({ message: "Registered" });
});

router.post("/login", async (req, res) => {
  const loginSchema = masterSchema.pick({
    email: true,
    password: true,
  });
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success)
    return res.status(400).json({ error: parsed.error.flatten() });
  const { email, password } = parsed.data;
  const session = await login(email, password);
  if (!session) throw new Error("There was a problem!");
  res.status(201).json({ message: "Login Successfull!" });
});

export default router;
