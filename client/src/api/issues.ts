import type { IssueReqBody } from "../types/types";
import api from "./axios";

export const getIssues = async () => {
  const res = await api.get("/issues");
  return res.data;
};

export const createIssue = async (
  title: string,
  description: string,
  columnId: number,
  position: number
): Promise<IssueReqBody> => {
  const res = await api.post("/issues", {
    title,
    description,
    column_id: columnId,
    position,
  });
  return res.data;
};

export const updateIssue = async (id: number, data: any) => {
  const res = await api.put(`/issues/${id}`, data);
  return res.data;
};

export const deleteIssue = async (id: number) => {
  const res = await api.delete(`/issues/${id}`);
  return res.data;
};
