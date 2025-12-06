import { Request, Response } from "express";
import * as issueModel from "../models/issueModel";

export async function listIssues(req: Request, res: Response) {
  const issues = await issueModel.listIssues();
  res.status(200).json(issues);
}
