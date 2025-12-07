import { Request, Response, NextFunction } from "express";
import * as columnModel from "../models/columnModel.ts";

export async function listColumns(req: Request, res: Response) {
  const columns = await columnModel.listColumns();
  res.status(200).json(columns);
}
export async function createColumn(req: Request, res: Response) {
  const { name, position } = req.body;
  const column = await columnModel.createColumn(name, position);
  res.status(201).json(column);
}

export async function renameColumn(req: Request, res: Response) {
  const { id } = req.params;
  const { name } = req.body;
  const updatedColumn = await columnModel.renameColumn(Number(id), name);
  res.status(200).json(updatedColumn);
}

export async function deleteColumn(req: Request, res: Response) {
  const { id } = req.params;
  await columnModel.deleteColumn(Number(id));
  res.status(204).send();
}
