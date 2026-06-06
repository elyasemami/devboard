const { DatabaseSync } = require("node:sqlite");
const database = new DatabaseSync("../data/data.db");

database.exec(`
        CREATE TABLE data(
        key INTEGER PRIMARY KEY,
        value TEXT
        )STRICT
    `);

const insertUser = database.prepare(
  "INSERT INTO users (name, email, pass) VALUES (?, ?, ?)",
);
const selectStatement = database.prepare("SELECT * FROM products");

export function addUser(name, email, pass) {
  const result = insertStatement.run(name, email, pass);
  return { id: result.lastInsertRowid, name, email, pass };
}
export function getAllUsers() {
  return selectStatement.all();
}
