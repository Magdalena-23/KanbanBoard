import { useEffect, useState } from "react";
import Column from "./Column";
import type {
  ColumnReqBody,
  Column as ColumnType,
  Issue,
} from "../types/types";
import { getColumns, createColumn } from "../api/columns";
import { getIssues } from "../api/issues";
import ColumnModal from "./ColumnModal";

export default function KanbanBoard() {
  const [columns, setColumns] = useState<ColumnType[]>([]);
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [addColumnModalOpen, setAddColumnModalOpen] = useState<boolean>(false);

  useEffect(() => {
    async function loadData() {
      try {
        const [colRes, issueRes] = await Promise.all([
          getColumns(),
          getIssues(),
        ]);

        setColumns(colRes);
        setIssues(issueRes);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  console.log(addColumnModalOpen);

  const handleAddNewColumn = async (name: string) => {
    const newColumn: ColumnReqBody = {
      name,
      position: columns.length + 1,
    };
    const createdColumn = await createColumn(
      newColumn.name,
      newColumn.position
    );
    setColumns((prev) => [...prev, createdColumn]);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <ColumnModal
        isOpen={addColumnModalOpen}
        onClose={() => setAddColumnModalOpen(false)}
        onSubmit={handleAddNewColumn}
      />
      <div className="min-h-screen bg-purple-50 text-gray-700 flex flex-col">
        <header className="px-6 py-4 border-b border-purple-200 bg-purple-100/80 backdrop-blur sticky top-0 z-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-xl bg-purple-500 flex items-center justify-center">
              <span className="text-white text-lg font-semibold">K</span>
            </div>

            <h1 className="text-xl font-semibold">Kanban Board</h1>
          </div>
        </header>

        <main className="flex-1 px-4 py-4 overflow-x-auto">
          <div className="flex gap-4 min-w-max">
            {columns.map((column) => (
              <Column
                key={column.id}
                column={column}
                issues={issues.filter((issue) => issue.columnId === column.id)}
              />
            ))}

            <button
              onClick={() => setAddColumnModalOpen(true)}
              className="flex w-64 flex-col items-center justify-center rounded-xl border border-dashed border-purple-300 bg-purple-50 p-4 text-sm font-medium text-purple-700 hover:bg-purple-100 hover:border-purple-400 transition-colors cursor-pointer"
            >
              {columns.length < 1
                ? "+ Add your first column"
                : "+ Add a new column"}
            </button>
          </div>
        </main>
      </div>
    </>
  );
}
