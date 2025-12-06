import { useState } from "react";
import type { Column } from "../types/types";

type ColumnModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (name: string) => Promise<void> | void;
  columnData?: Column;
};

const ColumnModal = ({
  isOpen,
  onClose,
  onSubmit,
  columnData,
}: ColumnModalProps) => {
  const [name, setName] = useState(columnData ? columnData.name : "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  console.log("column data", columnData);

  const handleClose = () => {
    if (isSubmitting) return;
    setName("");
    setError(null);
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    if (name.trim() === "") {
      setError("Column name is required");
      return;
    }
    setIsSubmitting(true);
    setError(null);
    await onSubmit(name);
    setIsSubmitting(false);
    setName("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-sm rounded-xl bg-white p-5 shadow-lg">
        <h2 className="mb-2 text-lg font-semibold text-gray-800">
          {columnData ? "Edit Column" : "Add new Column"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-600">
              Column name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-800 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-200"
              placeholder="e.g. Backlog, Todo, In Progress..."
              autoFocus
            />
            {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
          </div>

          <div className="flex justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={handleClose}
              className="cursor-pointer rounded-full px-3 py-1.5 text-xs font-medium text-gray-500 bg-gray-200 hover:bg-gray-300"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="cursor-pointer rounded-full bg-purple-500 px-4 py-1.5 text-xs font-medium text-white shadow-md hover:bg-purple-600 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {columnData ? "Save Column" : "Add Column"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ColumnModal;
