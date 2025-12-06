import { useMemo } from "react";
import Column from "./Column";
import type { Column as ColumnType, Issue } from "../types/types";

const mockColumns: ColumnType[] = [
  { id: 1, name: "Backlog", position: 1 },
  { id: 2, name: "In Progress", position: 2 },
  { id: 3, name: "Review", position: 3 },
  { id: 4, name: "Done", position: 4 },
];

const mockIssues: Issue[] = [
  {
    id: 1,
    title: "Set up project",
    description: "Initialize repo, backend and client folder.",
    columnId: 1,
    position: 1,
  },
  {
    id: 2,
    title: "Design cute lilac palette",
    description: "Pick soft lilac, mint, and blush tones.",
    columnId: 2,
    position: 1,
  },
  {
    id: 3,
    title: "Implement columns API",
    description: "Create list & create endpoints.",
    columnId: 2,
    position: 2,
  },
  {
    id: 4,
    title: "Connect React to backend",
    description: "Fetch columns & issues in client.",
    columnId: 3,
    position: 1,
  },
  {
    id: 5,
    title: "Celebrate 🎉",
    description: "Take a break and enjoy your Kanban board.",
    columnId: 4,
    position: 1,
  },
];

export default function KanbanBoard() {
  const issuesByColumn = useMemo(() => {
    const map: Record<number, Issue[]> = {};
    for (const issue of mockIssues) {
      if (!map[issue.columnId]) map[issue.columnId] = [];
      map[issue.columnId].push(issue);
    }
    Object.values(map).forEach((list) =>
      list.sort((a, b) => a.position - b.position)
    );
    return map;
  }, []);

  const sortedColumns = [...mockColumns].sort(
    (a, b) => a.position - b.position
  );

  return (
    <div className="min-h-screen bg-purple-50 text-gray-700 flex flex-col">
      <header className="px-6 py-4 border-b border-purple-200 bg-purple-100/80 backdrop-blur sticky top-0 z-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-xl bg-purple-500 flex items-center justify-center shadow-lilacStrong">
            <span className="text-white text-lg font-semibold">K</span>
          </div>

          <h1 className="text-xl font-semibold">Kanban Board</h1>
        </div>

        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-full bg-purple-500 px-4 py-1.5 text-sm font-medium text-white shadow-lilacStrong hover:bg-purple-600 transition-colors cursor-pointer"
        >
          + New Board
        </button>
      </header>

      <main className="flex-1 px-4 py-4 overflow-x-auto">
        <div className="flex gap-4 min-w-max">
          {sortedColumns.map((column) => (
            <Column
              key={column.id}
              column={column}
              issues={issuesByColumn[column.id] || []}
            />
          ))}

          <button
            type="button"
            className="flex w-64 flex-col items-center justify-center rounded-xl border border-dashed border-purple-300 bg-purple-50 p-4 text-sm font-medium text-purple-700 hover:bg-purple-100 hover:border-purple-400 transition-colors cursor-pointer"
          >
            + Add a new column
          </button>
        </div>
      </main>
    </div>
  );
}
