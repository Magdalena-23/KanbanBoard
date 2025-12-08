import { Request, Response } from "express";
import * as issueModel from "../models/issueModel";

export async function listIssues(req: Request, res: Response) {
  const issues = await issueModel.listIssues();
  res.status(200).json(issues);
}

export async function createIssue(req: Request, res: Response) {
  const { title, description, column_id, position } = req.body;
  const issue = await issueModel.createIssue(
    title,
    description,
    column_id,
    position
  );
  res.status(201).json(issue);
}

export async function renameIssue(req: Request, res: Response) {
  const { id } = req.params;
  const { title, description } = req.body;
  const issue = await issueModel.renameIssue(Number(id), title, description);
  res.status(200).json(issue);
}

export async function deleteIssue(req: Request, res: Response) {
  const { id } = req.params;
  await issueModel.deleteIssue(Number(id));
  res.status(204).send();
}
