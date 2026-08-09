import { pool } from "../db/pool.ts";

//shape of the user coming from the database
interface UserRow {
  id: string;
  full_name: string;
  email: string;
  password_hash: string;
  created_at: Date;
  updated_at: Date;
}
//shape of the user-object
export interface User {
  id: string;
  fullName: string;
  email: string;
  passwordHash: string;
  created_at: Date;
  updated_at: Date;
}
//return the user shape
function toUser(row: UserRow): User {
  return {
    id: row.id,
    fullName: row.full_name,
    email: row.email,
    passwordHash: row.password_hash,
    created_at: row.created_at,
    updated_at: row.updated_at,
  };
}
function isUniqueViolation(err: unknown): boolean {
  return (
    typeof err === "object" &&
    err !== null &&
    "code" in err &&
    (err as { code: string }).code === "23505"
  );
}

export async function insertUser(
  fullName: string,
  email: string,
  passwordHash: string,
): Promise<User> {
  try {
    const result = await pool.query<UserRow>(
      `INSERT INTO users(full_name, email, password_hash) VALUES ($1, $2, $3) RETURNING id, full_name, email, created_at`,
      [fullName, email, passwordHash],
    );
    const row = result.rows[0];
    if (!row)
      throw new Error("InsertUser: INSERT ... RETURNING produced no row");
    return toUser(row);
  } catch (err) {
    if (isUniqueViolation(err)) throw new Error("EMAIL_TAKEN");
    throw err;
  }
}

export async function findUserByEmail(email: string): Promise<User | null> {
  const result = await pool.query<UserRow>(
    `SELECT id, full_name, email, password_hash, created_at FROM users WHERE email =$1`,
    [email],
  );
  return result.rows[0] ? toUser(result.rows[0]) : null;
}

// check this after tests because the unknown can create problems
export async function deleteUser(id: string): Promise<void | unknown> {
  return await pool.query(`DELETE FROM users WHERE id = $1`, [id]);
}
