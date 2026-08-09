// src/auth/auth.routes.ts
import { Router } from "express";
import { uptime } from "node:process";
import { z } from "zod";

const router = Router();

router.post("/register", (req, res) => {
  res
    .status(201)
    .json({ ok: true, todo: "not implemented", uptime: process.uptime() });
});

export default router;
