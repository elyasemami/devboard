// src/db/migrate.ts
import { readdir, readFile } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { pool } from "./pool.ts";

const migrationsDir = join(
  dirname(fileURLToPath(import.meta.url)),
  "server/db/migrations",
);

export async function migrate(): Promise<void> {
  const client = await pool.connect();
  try {
    // Advisory lock: if two processes boot at once, only one migrates.
    await client.query("SELECT pg_advisory_lock($1)", [727_001]);

    await client.query(`
      CREATE TABLE IF NOT EXISTS schema_migrations (
        filename   text PRIMARY KEY,
        applied_at timestamptz NOT NULL DEFAULT now()
      )
    `);

    const applied = new Set(
      (
        await client.query<{ filename: string }>(
          "SELECT filename FROM schema_migrations",
        )
      ).rows.map((r) => r.filename),
    );

    const files = (await readdir(migrationsDir))
      .filter((f) => f.endsWith(".sql"))
      .sort();

    for (const file of files) {
      if (applied.has(file)) continue;
      const sql = await readFile(join(migrationsDir, file), "utf8");

      await client.query("BEGIN");
      try {
        await client.query(sql);
        await client.query(
          "INSERT INTO schema_migrations (filename) VALUES ($1)",
          [file],
        );
        await client.query("COMMIT");
        console.log(`migrated: ${file}`);
      } catch (err) {
        await client.query("ROLLBACK");
        throw new Error(`Migration failed: ${file}`, { cause: err });
      }
    }
  } finally {
    await client.query("SELECT pg_advisory_unlock($1)", [727_001]);
    client.release();
  }
}
