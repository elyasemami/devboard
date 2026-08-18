import "dotenv/config";
import { randomBytes } from "node:crypto";
import * as argon2 from "argon2";
import { insertUser, findUserByEmail } from "../users/users.repository.ts";
import { insertSession, deleteSession } from "./auth.repository.ts";
import type { Session } from "./auth.repository.ts";

const ttl = Number(process.env.SESSION_TTL_MS);
if (!Number(ttl)) {
  throw new Error(
    `SESSION_TTL_MS must be a positive number of milliseconds, got: ${ttl}`,
  );
}

export async function register(
  email: string,
  password: string,
  fullName: string,
): Promise<Session> {
  const passwordHash = await argon2.hash(password);
  const duplicateUser = await findUserByEmail(email);
  if (duplicateUser) throw new Error("Email Already Exist!");
  const user = await insertUser(fullName, email, passwordHash);

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
  const expirationDate: Date = new Date(Date.now() + ttl);
  return insertSession(sessionId, userId, currTime, expirationDate);
}
