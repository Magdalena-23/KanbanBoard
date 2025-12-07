import { useEffect, useState } from "react";
import type { Column } from "../types/types";
import ModalWrapper from "./ModalWrapper";

type ColumnModalProps = {
  isOpen: boolean;
  onClose: () => void;
  columnData?: Column;
  onSubmit?: (name: string) => Promise<void> | void;
  onUpdateColumn?: (updatedColumn: Column) => void;
};

const ColumnModal = ({
  isOpen,
  onClose,
  onSubmit,
  columnData,
  onUpdateColumn,
}: ColumnModalProps) => {
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && columnData) {
      setName(columnData.name);
    } else if (isOpen && !columnData) {
      setName("");
    }
  }, [isOpen, columnData]);

  const handleClose = () => {
    setError(null);
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() === "") {
      setError("Column name is required");
      return;
    }

    if (columnData) {
      onUpdateColumn && onUpdateColumn({ ...columnData, name });
    } else {
      onSubmit && (await onSubmit(name));
    }

    setError(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <ModalWrapper>
      <h2 className="mb-2 text-lg font-semibold text-gray-800">
        {columnData ? "Edit Column" : "Add new Column"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <label className="mb-1 block text-sm font-medium text-gray-600">
            Column name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (error) setError(null);
            }}
            className={`w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-800 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-200${
              error ? " border-red-500 ring-2 ring-red-200" : ""
            }`}
            placeholder="e.g. Backlog, Todo, In Progress..."
            autoFocus
          />
          {error && (
            <p className="mt-1 text-xs text-red-500 absolute bottom-[-18px] left-0">
              {error}
            </p>
          )}
        </div>

        <div className="flex justify-end gap-2 pt-1">
          <button
            type="button"
            onClick={handleClose}
            className="cursor-pointer rounded-full px-3 py-1.5 text-xs font-medium text-gray-500 bg-gray-200 hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="cursor-pointer rounded-full bg-purple-500 px-4 py-1.5 text-xs font-medium text-white shadow-md hover:bg-purple-600 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {columnData ? "Save Column" : "Add Column"}
          </button>
        </div>
      </form>
    </ModalWrapper>
  );
};

export default ColumnModal;
