import React, { useState } from "react";
import { createPortal } from "react-dom";
import DisplayImage from "./DisplayImage";

function AboutUsCard({ imgUrl, content, leftRight = true }) {
  const [show, setShow] = useState(false);
  const cardClass = `flex flex-col rounded-lg bg-slate-200 p-4 border-slate-400 border-2 space-y-7 w-full sm:w-[75%] md:w-[90%] lg:w-[75%] ${
    leftRight ? "md:flex-row md:gap-4 " : "md:flex-row-reverse md:gap-4"
  } max-h-[40rem]`;

  // Loading
  if (imgUrl === "") {
    return (
      <div className={`${cardClass} animate-pulse space-y-0 h-[30rem]`}>
        <div className="rounded-t-lg  bg-slate-300 sm:w-[50%] sm:flex sm:items-center"></div>
        <div className="grid grid-cols-3 gap-2 sm:w-[50%]">
          <span className="h-[1rem] bg-slate-300"></span>
          <span className="h-[1rem] bg-slate-300"></span>
          <span className="h-[1rem] bg-slate-300"></span>
          <span className="h-[1rem] bg-slate-300 col-span-2"></span>
          <span className="h-[1rem] bg-slate-300"></span>
          <span className="h-[1rem] bg-slate-300 col-span-3"></span>
          <span className="h-[1rem] bg-slate-300"></span>
          <span className="h-[1rem] bg-slate-300"></span>
          <span className="h-[1rem] bg-slate-300"></span>
          <span className="h-[1rem] bg-slate-300 col-span-2"></span>
          <span className="h-[1rem] bg-slate-300"></span>
          <span className="h-[1rem] bg-slate-300 col-span-3"></span>
          <span className="h-[1rem] bg-slate-300"></span>
          <span className="h-[1rem] bg-slate-300"></span>
          <span className="h-[1rem] bg-slate-300"></span>
          <span className="h-[1rem] bg-slate-300 col-span-2"></span>
          <span className="h-[1rem] bg-slate-300"></span>
          <span className="h-[1rem] bg-slate-300 col-span-3"></span>
          <span className="h-[1rem] bg-slate-300"></span>
          <span className="h-[1rem] bg-slate-300"></span>
          <span className="h-[1rem] bg-slate-300"></span>
          <span className="h-[1rem] bg-slate-300 col-span-2"></span>
          <span className="h-[1rem] bg-slate-300"></span>
          <span className="h-[1rem] bg-slate-300 col-span-3"></span>
        </div>
      </div>
    );
  }

  return (
    <div className={cardClass}>
      {imgUrl && (
        <>
          <img
            onClick={() => setShow(true)}
            alt="details"
            src={imgUrl}
            className={`rounded-t-lg object-cover md:w-[50%] ${
              leftRight
                ? "md:rounded-l-lg md:rounded-r-none"
                : "md:rounded-r-lg md:rounded-l-none"
            } lg:!h-[30rem] cursor-pointer`}
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

export default AboutUsCard;
