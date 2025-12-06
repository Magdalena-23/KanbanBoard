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
