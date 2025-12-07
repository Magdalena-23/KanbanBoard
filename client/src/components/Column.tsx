import IssueCard from "./IssueCard";
import type { Column, Column as ColumnType, Issue } from "../types/types";
import CardModal from "./CardModal";
import { useState } from "react";
import { deleteColumn } from "../api/columns";
import ActionsMenu from "./ActionsMenu";

type ColumnProps = {
  column: ColumnType;
  issues: Issue[];
  setEditColumnId: (id: number | null) => void;
  onDeleteColumn: (id: number) => void;
  onAddIssue: (newIssue: Issue) => void;
};

const Column = ({
  column,
  issues,
  setEditColumnId,
  onDeleteColumn,
  onAddIssue,
}: ColumnProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this column?")) return;
    await deleteColumn(column.id);
    onDeleteColumn(column.id);
  };

  return (
    <>
      <CardModal
        columnId={column.id}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddIssue={onAddIssue}
      />
      <div className="flex flex-col w-72 bg-white/90 backdrop-blur rounded-xl shadow-md border border-purple-200 p-4 cursor-grab">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-sm font-semibold text-gray-700">
              {column.name}
            </h2>
            <p className="text-xs text-gray-500">
              {issues.length} task{issues.length !== 1 && "s"}
            </p>
          </div>

          <ActionsMenu
            onDelete={handleDelete}
            onEdit={() => setEditColumnId(column.id)}
            isMenuOpen={isOpenMenu}
            setIsOpenMenu={setIsOpenMenu}
            columnId={column.id}
          />
        </div>

        <div className="flex-1 flex flex-col gap-3 overflow-y-auto pr-1 pt-1 pb-3">
          {issues.map((issue) => (
            <IssueCard key={issue.id} issue={issue} />
          ))}

          {issues.length === 0 && (
            <p className="text-xs text-gray-500 italic">
              No tasks in this column.
            </p>
          )}
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="mt-3 inline-flex items-center justify-center gap-1 rounded-lg border border-dashed border-purple-300 bg-purple-50 px-3 py-2 text-xs font-medium text-purple-700 hover:bg-purple-100 transition-colors cursor-pointer"
        >
          + Add task
        </button>
      </div>
    </>
  );
};

export default Column;
