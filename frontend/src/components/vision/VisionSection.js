import React from "react";

function VisionSection({ description, title }) {
  const squareClasses =
    "absolute left-[-12.5px] rotate-45 w-[25px] h-[25px] bg-lsate-100 border-[1px] border-slate-600 bg-slate-100";

  return (
    <div className="flex-1 space-y-4 pl-[20px] relative">
      <div>
        <span
          className={`${squareClasses} top-[50%] translate-y-[-50%] z-[1]`}
        />
        <span
          className={`${squareClasses} top-[calc(50%+12.5px)] translate-y-[-50%] z-[2]`}
        />
        <span
          className={`${squareClasses} top-[calc(50%+25px)] translate-y-[-50%] z-[1]`}
        />
      </div>
      {title && (
        <h2 className="text-2xl font-semibold text-slate-800 mb-4">{title}</h2>
      )}

      <p className="text-slate-600 text-lg leading-relaxed text-break">{description}</p>
    </div>
  );
}

export default VisionSection;
