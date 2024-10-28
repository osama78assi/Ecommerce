import { CgClose } from "react-icons/cg";
import { useOutsideClick } from "../../hooks/useOutsideClick";

function ModalWindow({ title, children, onClose, classes }) {
  const ref = useOutsideClick(() => {
    onClose?.();
  });

  return (
    <div className="fixed w-full h-full bg-slate-200 bg-opacity-35 top-0 left-0 right-0 bottom-0 flex z-10 justify-center items-center">
      <div
        ref={ref}
        className={`bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden ${
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
