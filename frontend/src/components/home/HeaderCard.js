import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import DisplayImage from "../ui/DisplayImage";

function HeaderCard({ imgUrl, content, leftRight = true, getElement }) {
  const cardRef = useRef(null);
  const cardClass = `flex h-full w-full left-0 absolute transition-position`;

  useEffect(() => {
    getElement?.(cardRef);
  }, []);

  return (
    <div className={cardClass} ref={cardRef}>
      {imgUrl && (
        <div>
          <img
            alt="details"
            src={imgUrl}
            className={`object-cover h-full w-full cursor-pointer`}
          />
        </div>
      )}
    </div>
  );
}

export default HeaderCard;
