import { pool } from "../db/pool.ts";

export async function findUserById(id: string) {
  const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
  return result.rows[0];
}

const res = await pool.query("SELECT NOW()");
console.log(res.rows[0]);
