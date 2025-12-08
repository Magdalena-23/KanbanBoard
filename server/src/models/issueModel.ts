import { ResultSetHeader } from "mysql2";
import { pool } from "../db/pool.ts";

export async function listIssues() {
  const [rows] = await pool.query("SELECT * FROM issues ORDER BY position");
  return rows as Array<{
    id: number;
    name: string;
    position: number;
    columnId: number;
    description: string;
  }>;
}

export async function createIssue(
  title: string,
  description: string,
  column_id: number,
  position: number
) {
  const [result] = await pool.query<ResultSetHeader>(
    "INSERT INTO issues (title, description, column_id, position) VALUES (?, ?, ?, ?)",
    [title, description, column_id, position]
  );
  return { id: result.insertId, title, description, column_id, position };
}

export async function renameIssue(
  id: number,
  title: string,
  description: string
) {
  const [result] = await pool.query<ResultSetHeader>(
    "UPDATE issues SET title = ?, description = ? WHERE id = ?",
    [title, description, id]
  );
  const [rows]: any = await pool.query("SELECT * FROM issues WHERE id = ?", [
    id,
  ]);
  return rows[0];
}

export async function deleteIssue(id: number) {
  await pool.query("DELETE FROM issues WHERE id = ?", [id]);
}
