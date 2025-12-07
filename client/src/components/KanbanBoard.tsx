import { useEffect, useState } from "react";
import Column from "./Column";
import type {
  ColumnReqBody,
  Column as ColumnType,
  Issue,
} from "../types/types";
import { getColumns, createColumn, renameColumn } from "../api/columns";
import { getIssues } from "../api/issues";
import ColumnModal from "./ColumnModal";

export default function KanbanBoard() {
  const [columns, setColumns] = useState<ColumnType[]>([]);
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [addColumnModalOpen, setAddColumnModalOpen] = useState<boolean>(false);
  const [editColumnId, setEditColumnId] = useState<number | null>(null);

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

  const handleUpdateColumn = async (updatedColumn: ColumnType) => {
    const updatedColumnResponse = await renameColumn(
      updatedColumn.id,
      updatedColumn.name
    );

    setColumns((prev) =>
      prev.map((col) =>
        col.id === updatedColumnResponse.id ? updatedColumnResponse : col
      )
    );
  };

  const handleDeleteColumn = (id: number) => {
    setColumns((prev) => prev.filter((col) => col.id !== id));
  };

  const handleAddIssue = (newIssue: Issue) => {
    setIssues((prev) => [...prev, newIssue]);
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
        onUpdateColumn={handleUpdateColumn}
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
              <div key={column.id}>
                <Column
                  key={column.id}
                  column={column}
                  issues={issues.filter(
                    (issue) => issue.column_id === column.id
                  )}
                  setEditColumnId={setEditColumnId}
                  onDeleteColumn={handleDeleteColumn}
                  onAddIssue={handleAddIssue}
                />
                <ColumnModal
                  isOpen={editColumnId === column.id}
                  onClose={() => setEditColumnId(null)}
                  columnData={column}
                  onUpdateColumn={handleUpdateColumn}
                />
              </div>
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
