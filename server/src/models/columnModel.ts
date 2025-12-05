import { ResultSetHeader } from "mysql2";
import { pool } from "../db/pool.ts";

export async function listColumns() {
  const [rows] = await pool.query("SELECT * FROM columns ORDER BY position");
  return rows as Array<{ id: number; name: string; position: number }>;
}

export async function createColumn(name: string, position: number) {
  const [result] = await pool.query<ResultSetHeader>(
    "INSERT INTO columns (name, position) VALUES (?, ?)",
    [name, position]
  );
  return { id: result.insertId, name, position };
}
