import api from "./axios";

export const getIssues = async () => {
  const res = await api.get("/issues");
  return res.data;
};

export const createIssue = async (
  title: string,
  description: string,
  columnId: number
) => {
  const res = await api.post("/issues", { title, description, columnId });
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
