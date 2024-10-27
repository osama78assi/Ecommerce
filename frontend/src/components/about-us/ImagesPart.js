import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { useLazyloadingImgs } from "../../hooks/useLazyLoadingImages";
import DisplayImage from "../ui/DisplayImage";

function ImagesPart({ images }) {
  const [activeImg, setActiveImg] = useState(0);
  const [showImg, setShowImg] = useState(false);
  const saved = useMemo(() => {
    return images.map((obj) => obj.imgUrl);
  }, [images]);
  const loadedImgs = useLazyloadingImgs(saved);

  useEffect(() => {
    let timer = setInterval(() => {
      setActiveImg((act) => (act + 1) % images.length);
    }, 4000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="w-full basis-full lg:basis-6/12 lg:w-[50%]">
      {showImg && loadedImgs[activeImg] !== ""
        ? createPortal(
            <DisplayImage
              imgUrl={loadedImgs[activeImg]}
              onClose={() => setShowImg(false)}
            />,
            document.body
          )
        : null}
      <div className="mb-3">
        {loadedImgs[activeImg] !== "" ? (
          <img
            src={loadedImgs[activeImg]}
            alt="about-us"
            className="w-full object-cover h-full sm:h-[420px] cursor-pointer"
            onClick={() => {
              if (loadedImgs[activeImg] !== "") {
                setShowImg(true);
              }
            }}
          />
        ) : (
          <div className="w-full h-[20rem] md:h-[25rem] bg-slate-500 animate-pulse sm:h-[420px]" />
        )}
      </div>

      <div className="flex justify-between gap-1 overflow-x-auto w-full">
        {loadedImgs.map((ele, index) =>
          ele ? (
            <img
              key={ele + `${Math.random() * 1e9}`}
              src={ele}
              alt={ele}
              className={`cursor-pointer w-[144px] h-[144px] object-cover ${
                index === activeImg
                  ? "border-4 border-[var(--primary-color-700)]"
                  : ""
              }`}
              onClick={() => setActiveImg(index)}
              role="button"
            />
          ) : (
            <div
              key={index + `${Math.random() * 1e9}`}
              className="w-[144px] h-[144px] bg-slate-500 animate-pulse shrink-0"
            />
          )
        )}
      </div>
    </div>
  );
}

export default ImagesPart;
