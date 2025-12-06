export type Column = {
  id: number;
  name: string;
  position: number;
};

export type Issue = {
  id: number;
  title: string;
  description: string;
  column_id: number;
  position: number;
};
export type ColumnReqBody = {
  name: string;
  position: number;
};

export type IssueReqBody = {
  title: string;
  description: string;
  column_id: number;
  position: number;
};
