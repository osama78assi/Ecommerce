import { createPortal } from "react-dom";
import { CgClose } from "react-icons/cg";
import { useOutsideClick } from "../hooks/useOutsideClick";
import SubmitBtn from "./SubmitBtn";

function Confirm({ about, onConfirm, onClose, moreDetails = true, children }) {
  const eleRef = useOutsideClick(() => {
    onClose?.();
  });

  return createPortal(
    <div className="fixed inset-0 flex justify-center items-center z-50 backdrop-brightness-75">
      <div
        className="bg-white shadow-lg rounded max-w-5xl mx-auto p-4 overflow-auto"
        ref={eleRef}
      >
        <div
          className="w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer"
          onClick={() => onClose?.()}
        >
          <CgClose />
        </div>

        <div className="flex justify-center gap-5 flex-col p-4 max-w-[80dvh] max-h-[80dvh] object-cover">
          <h3 className="text-lg font-semibold">
            Are you sure you want to {about}{" "}
            {moreDetails ? "This action can't be undo" : ""}
          </h3>

          {children ? children : null}

          <div className="flex items-center justify-between p-1">
            <SubmitBtn
              title="Yes"
              handleClick={() => onConfirm?.()}
              classes="w-[49%] font-semibold text-lg"
            />
            <SubmitBtn
              title="No"
              type="danger"
              handleClick={() => onClose?.()}
              classes="w-[49%] font-semibold text-lg"
            />
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default Confirm;
