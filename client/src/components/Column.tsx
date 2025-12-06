import IssueCard from "./IssueCard";
import type { Column as ColumnType, Issue } from "../types/types";

type ColumnProps = {
  column: ColumnType;
  issues: Issue[];
};

const Column = ({ column, issues }: ColumnProps) => {
  return (
    <div className="flex flex-col w-72 bg-white/90 backdrop-blur rounded-xl shadow-md border border-purple-200 p-4 cursor-grab">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h2 className="text-sm font-semibold text-gray-700">{column.name}</h2>
          <p className="text-xs text-gray-500">
            {issues.length} task{issues.length !== 1 && "s"}
          </p>
        </div>

        <button
          type="button"
          className="h-7 w-7 rounded-full bg-purple-200 flex items-center justify-center text-purple-700 text-lg hover:bg-purple-300 transition-colors cursor-pointer"
        >
          ···
        </button>
      </div>

      <div className="flex-1 flex flex-col gap-3 overflow-y-auto pr-1">
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
        type="button"
        className="mt-3 inline-flex items-center justify-center gap-1 rounded-lg border border-dashed border-purple-300 bg-purple-50 px-3 py-2 text-xs font-medium text-purple-700 hover:bg-purple-100 transition-colors cursor-pointer"
      >
        + Add card
      </button>
    </div>
  );
};

export default Column;
