import { useState } from "react";
import type { Issue } from "../types/types";
import ActionsMenu from "./ActionsMenu";

type IssueCardProps = {
  issue: Issue;
};

const IssueCard = ({ issue }: IssueCardProps) => {
  const [isMenuOpen, setIsOpenMenu] = useState(false);

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this issue?")) return;
    await deleteIssue(issue.id);
    onDeleteIssue(issue.id);
  };

  return (
    <div className="rounded-lg border border-purple-200 bg-white p-3 text-sm shadow-sm hover:shadow-lg hover:-translate-y-[1px] transition-all z-10 cursor-grab">
      <div className=" mb-1.5">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-gray-700">{issue.title}</h3>
          <ActionsMenu
            columnId={issue.column_id}
            onDelete={handleDelete}
            onEdit={() => {}}
            isMenuOpen={isMenuOpen}
            setIsOpenMenu={setIsOpenMenu}
            className="bg-white"
          />
        </div>
        <span className="inline-flex items-center rounded-full bg-purple-200 px-2 py-[2px] text-[10px] font-medium text-purple-700">
          #{issue.id}
        </span>
      </div>

      {issue.description && (
        <p className="text-xs text-gray-500 line-clamp-2 leading-snug">
          {issue.description}
        </p>
      )}

      <div className="mt-2 flex flex-wrap gap-1.5">
        <span className="inline-flex items-center rounded-full bg-teal-100 px-2 py-[2px] text-[10px] font-medium text-teal-600">
          development
        </span>
        <span className="inline-flex items-center rounded-full bg-pink-100 px-2 py-[2px] text-[10px] font-medium text-pink-600">
          issue
        </span>
      </div>
    </div>
  );
};

export default IssueCard;
