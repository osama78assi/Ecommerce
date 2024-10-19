import React from "react";
import { CgClose } from "react-icons/cg";
import { useOutsideClick } from "../../hooks/useOutsideClick";

const DisplayImage = ({ imgUrl, onClose }) => {
  const eleRef = useOutsideClick((e) => {
    onClose?.();
  });
  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 backdrop-brightness-75 ">
      <div
        className="bg-white shadow-lg rounded max-w-5xl mx-auto p-4 overflow-auto"
        ref={eleRef}
      >
        <div
          className="w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer"
          onClick={onClose}
        >
          <CgClose />
        </div>

        <div className="flex justify-center p-4 max-w-[80dvh] max-h-[80dvh] object-cover">
          <img src={imgUrl} alt="img" />
        </div>
      </div>
    </div>
  );
};

export default DisplayImage;
