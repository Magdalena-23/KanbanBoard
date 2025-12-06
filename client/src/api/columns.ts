import api from "./axios";

export const getColumns = async () => {
  const res = await api.get("/columns");
  return res.data;
};

export const createColumn = async (name: string, position: number) => {
  const res = await api.post("/columns", { name, position });
  return res.data;
};

export const renameColumn = async (id: number, name: string) => {
  const res = await api.put(`/columns/${id}`, { name });
  return res.data;
};

export const deleteColumn = async (id: number) => {
  const res = await api.delete(`/columns/${id}`);
  return res.data;
};
