import { randomBytes } from "node:crypto";
import * as argon2 from "argon2";
import { insertUser, findUserByEmail } from "../users/users.repository.ts";
import { insertSession, deleteSession } from "./auth.repository.ts";
import type { Session } from "./auth.repository.ts";

const SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 7;

export async function register(
  email: string,
  password: string,
): Promise<Session> {
  const passwordHash = await argon2.hash(password);
  const user = await insertUser(email, passwordHash);
  return startSession(user.id);
}

export async function login(email: string, password: string): Promise<Session> {
  const user = await findUserByEmail(email);
  if (!user) {
    await argon2.hash(password);
    throw new Error("INVALID_CREDENTIALS");
  }
  const valid = await argon2.verify(user.passwordHash, password);
  if (!valid) {
    throw new Error("USER DOES NOT EXIST");
  }
  return startSession(user.id);
}

export async function logout(sessionId: string): Promise<void> {
  await deleteSession(sessionId);
}

export async function startSession(userId: string): Promise<Session> {
  const sessionId = randomBytes(32).toString("hex"); //this will provide enough entropy
  const currTime: Date = new Date();
  const expirationDate: Date = new Date(Date.now() + SESSION_TTL_MS);
  return insertSession(sessionId, userId, currTime, expirationDate);
}
