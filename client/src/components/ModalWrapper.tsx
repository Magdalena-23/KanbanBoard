import { createPortal } from "react-dom";

const ModalWrapper = ({ children }: { children: React.ReactNode }) => {
  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-sm rounded-xl bg-white p-5 shadow-lg">
        {children}
      </div>
    </div>,
    document.body
  );
};

export default ModalWrapper;
