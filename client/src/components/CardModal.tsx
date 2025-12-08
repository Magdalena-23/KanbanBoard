import { useEffect, useState } from "react";
import type { Issue } from "../types/types";
import { createIssue, updateIssue } from "../api/issues";
import ModalWrapper from "./ModalWrapper";
import { toast } from "react-toastify";

type CardModalProps = {
  isOpen: boolean;
  cardData?: Issue;
  onClose: () => void;
  columnId: number;
  onAddIssue?: (newIssue: Issue) => void;
  onUpdateIssue?: (updatedIssue: Issue) => void;
};

const CardModal = ({
  isOpen,
  onClose,
  columnId,
  cardData,
  onAddIssue,
  onUpdateIssue,
}: CardModalProps) => {
  const [title, setTitle] = useState(cardData ? cardData.title : "");
  const [description, setDescription] = useState(
    cardData ? cardData.description : ""
  );
  const [error, setError] = useState<{ title: string; description: string }>({
    title: "",
    description: "",
  });

  useEffect(() => {
    if (isOpen && cardData) {
      setTitle(cardData.title);
      setDescription(cardData.description);
    } else if (isOpen && !cardData) {
      setTitle("");
      setDescription("");
    }
  }, [isOpen, cardData]);
  const handleClose = () => {
    setError({ title: "", description: "" });
    onClose();
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() === "") {
      setError({ title: "Title is required", description: "" });
      return;
    }

    if (description.trim() === "") {
      setError({ title: "", description: "Description is required" });
      return;
    }

    try {
      const issue = cardData
        ? await updateIssue(cardData.id, { title, description })
        : await createIssue(title, description, columnId, 0);

      if (cardData && onUpdateIssue) onUpdateIssue(issue as Issue);
      if (!cardData && onAddIssue) onAddIssue(issue as Issue);

      toast.success(
        cardData ? "Task updated successfully" : "Task created successfully"
      );
      handleClose();
    } catch (error) {
      toast.error(cardData ? "Failed to update task" : "Failed to create task");
    }
  };

  if (!isOpen) return null;

  return (
    <ModalWrapper>
      <h2 className="mb-2 text-lg font-semibold text-gray-800">
        {cardData ? "Edit Task" : "Add new Task"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <label className="mb-1 block text-sm font-medium text-gray-600">
            Task name
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (error.title) setError((prev) => ({ ...prev, title: "" }));
            }}
            className={`w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-800 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-200 ${
              error.title ? " border-red-500 ring-2 ring-red-200" : ""
            }`}
            autoFocus
          />
          {error.title && (
            <p className="text-xs text-red-500 absolute bottom-[-18px] left-0">
              {error.title}
            </p>
          )}
        </div>

        <div className="relative">
          <label className="mb-1 block text-sm font-medium text-gray-600">
            Task description
          </label>
          <textarea
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              if (error.description)
                setError((prev) => ({ ...prev, description: "" }));
            }}
            className={`w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-800 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-200 ${
              error.description ? " border-red-500 ring-2 ring-red-200" : ""
            }`}
            placeholder="Describe the task..."
            rows={4}
          />
          {error.description && (
            <p className="text-xs text-red-500 absolute bottom-[-13px] left-0">
              {error.description}
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
            {cardData ? "Save Task" : "Add Task"}
          </button>
        </div>
      </form>
    </ModalWrapper>
  );
};

export default CardModal;
