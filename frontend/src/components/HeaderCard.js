import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import DisplayImage from "./DisplayImage";

function HeaderCard({ imgUrl, content, leftRight = true, getElement }) {
  const cardRef = useRef(null);
  const [show, setShow] = useState(false);
  const cardClass = `flex flex-col rounded-lg h-full bg-slate-200 p-4 border-slate-400 border-2 space-y-7 w-full left-0 ${
    leftRight ? "md:flex-row md:gap-4 " : "md:flex-row-reverse md:gap-4"
  } absolute transition-position`;

  useEffect(() => {
    getElement?.(cardRef);
  }, []);

  return (
    <div className={cardClass} ref={cardRef}>
      {imgUrl && (
        <>
          <img
            onClick={() => setShow(true)}
            alt="details"
            src={imgUrl}
            className={`rounded-t-lg object-cover h-full md:w-[50%] ${
              leftRight
                ? "md:rounded-l-lg md:rounded-r-none"
                : "md:rounded-r-lg md:rounded-l-none"
            } cursor-pointer`}
          />

          {show &&
            createPortal(
              <DisplayImage imgUrl={imgUrl} onClose={() => setShow(false)} />,
              document.body
            )}
        </>
      )}
      <p>{content}</p>
    </div>
  );
}

export default HeaderCard;
