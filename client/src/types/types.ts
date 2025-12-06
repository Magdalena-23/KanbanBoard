export type Column = {
  id: number;
  name: string;
  position: number;
};

export type Issue = {
  id: number;
  title: string;
  description?: string;
  columnId: number;
  position: number;
};
