import { useState } from "react";
import { createPortal } from "react-dom";
import DisplayImage from "../ui/DisplayImage";

function ImageVision({ imageSrc }) {

  return (
    <div className="flex-1 w-full h-full">
      {imageSrc === "" ? (
        <div className=" w-full h-[20rem] bg-gray-500 animate-pulse" />
      ) : (
        <img
          
          src={imageSrc}
          alt="Vision"
          className="rounded-lg shadow-lg w-full object-cover h-[500px] cursor-pointer"
        />
      )}

    </div>
  );
}

export default ImageVision;
