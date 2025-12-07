import { useRef } from "react";
import { useOnClickOutside } from "../hooks/useOnClickOutside";

type ActionsMenuProps = {
  onEdit: (id: number) => void;
  onDelete: () => void;
  isMenuOpen: boolean;
  setIsOpenMenu: (isOpen: boolean) => void;
  columnId: number;
  className?: string;
};
const ActionsMenu = ({
  setIsOpenMenu,
  isMenuOpen,
  onDelete,
  onEdit,
  columnId,
  className,
}: ActionsMenuProps) => {
  const ref = useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, () => setIsOpenMenu(false));

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setIsOpenMenu(true)}
        className={`font-semibold h-7 w-7 rounded-full bg-purple-200 flex items-center justify-center text-purple-700 text-lg hover:bg-purple-300 transition-colors cursor-pointer ${className}`}
      >
        ···
      </button>
      {isMenuOpen && (
        <div className="z-50 absolute top-0 right-0 mt-5 mr-2 bg-white border border-gray-200 rounded-md shadow-md ">
          <button
            onClick={() => {
              setIsOpenMenu(false);
              onEdit(columnId);
            }}
            className="w-full px-4 py-1 text-xs text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
          >
            Edit
          </button>
          <button
            onClick={() => {
              setIsOpenMenu(false);
              onDelete();
            }}
            className=" w-full px-4 py-1 text-xs text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default ActionsMenu;
