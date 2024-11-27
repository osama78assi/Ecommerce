import { CgClose } from "react-icons/cg";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import { useState } from "react";

function ModalWindow({ title, children, onClose, classes }) {
  const ref = useOutsideClick(() => {
    onClose?.();
  });

  const [state, setState] = useState(true);

  return (
    <div className="fixed w-full h-full bg-slate-200 bg-opacity-35 top-0 left-0 right-0 bottom-0 flex z-10 justify-center items-center">
      <div
        ref={ref}
        className={`bg-white p-4 rounded w-full max-w-2xl overflow-auto h-fit max-h-[80%] ${
          classes ? classes : ""
        }`}
      >
        <h2 className="font-bold text-lg">{title}</h2>
        <div
          className="w-fit ml-auto mb-2 text-2xl hover:text-red-600 cursor-pointer"
          onClick={() => onClose?.()}
        >
          <CgClose />
        </div>
        {children}
      </div>
    </div>
  );
}

export default ModalWindow;
