import IssueCard from "./IssueCard";
import type { Column as ColumnType, Issue } from "../types/types";
import CardModal from "./CardModal";
import { useState } from "react";
import ColumnModal from "./ColumnModal";

type ColumnProps = {
  column: ColumnType;
  issues: Issue[];
};

const Column = ({ column, issues }: ColumnProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [editColumnId, setEditColumnId] = useState<number | null>(null);

  console.log(editColumnId, column);

  return (
    <>
      <ColumnModal
        isOpen={editColumnId === column.id}
        onClose={() => setEditColumnId(null)}
        onSubmit={() => {}}
        columnData={column.id === editColumnId ? column : undefined}
      />
      <CardModal
        columnId={column.id}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={() => {}}
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

          <div className="relative">
            <button
              onClick={() => setIsOpenMenu(true)}
              className="h-7 w-7 rounded-full bg-purple-200 flex items-center justify-center text-purple-700 text-lg hover:bg-purple-300 transition-colors cursor-pointer"
            >
              ···
            </button>
            {isOpenMenu && (
              <div className="z-50 absolute top-0 right-0 mt-5 mr-2 bg-white border border-gray-200 rounded-md shadow-md ">
                <button
                  onClick={() => {
                    setIsOpenMenu(false);
                    setEditColumnId(column.id);
                  }}
                  className="w-full px-4 py-1 text-xs text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  Edit
                </button>
                <button
                  onClick={() => setIsOpenMenu(false)}
                  className=" w-full px-4 py-1 text-xs text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="flex-1 flex flex-col gap-3 overflow-y-auto pr-1 pt-1 pb-3">
          {issues.map((issue) => (
            <IssueCard key={issue.id} issue={issue} />
          ))}

          {issues.length === 0 && (
            <p className="text-xs text-gray-500 italic">
              No issues in this column.
            </p>
          )}
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="mt-3 inline-flex items-center justify-center gap-1 rounded-lg border border-dashed border-purple-300 bg-purple-50 px-3 py-2 text-xs font-medium text-purple-700 hover:bg-purple-100 transition-colors cursor-pointer"
        >
          + Add card
        </button>
      </div>
    </>
  );
};

export default Column;
