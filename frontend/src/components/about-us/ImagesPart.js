import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import DisplayImage from "../ui/DisplayImage";

function ImagesPart({ data }) {
  const [activeImg, setActiveImg] = useState(0);
  const [showImg, setShowImg] = useState(false);
  const [isLoadedImages, setIsLoadedImages] = useState(
    Array.from({ length: data.length }, () => false)
  );

  useEffect(() => {
    let timer = setInterval(() => {
      setActiveImg((act) => (act + 1) % data.length);
    }, 4000);

    return () => {
      clearInterval(timer);
    };
  }, []);
  // The idea is simple if the image doesn't load yet then don't display it

  if (!data.length) {
    return;
  }

  return (
    <div className="w-full basis-full lg:basis-6/12 lg:w-[50%]">
      {showImg
        ? createPortal(
            <DisplayImage
              imgUrl={data[activeImg]?.image}
              onClose={() => setShowImg(false)}
            />,
            document.body
          )
        : null}
      <div className="mb-3">
        <img
          src={data[activeImg]?.image}
          alt="about-us"
          className={`w-full object-cover h-full sm:h-[420px] cursor-pointer ${
            !isLoadedImages[activeImg] ? " hidden" : ""
          }`}
          onClick={() => {
            if (isLoadedImages[activeImg]) {
              setShowImg(true);
            }
          }}
        />

        {!isLoadedImages[activeImg] ? (
          <div
            className={`w-full h-[20rem] md:h-[25rem] bg-slate-500 animate-pulse sm:h-[420px]`}
          />
        ) : null}
      </div>

      <div
        className="grid overflow-x-auto w-full relative"
        style={{
          gridTemplateColumns: `repeat(${data.length}, 144px)`,
          columnGap: "1rem",
        }}
      >
        {data.map((ele, index) => (
          <div key={ele.image}>
            <img
              onLoad={() => {
                if (!isLoadedImages[index])
                  setIsLoadedImages((imgs) =>
                    imgs.map((val, i) => (i === index ? true : val))
                  );
              }}
              src={ele?.image}
              alt={`abou-us-${index}`}
              className={`cursor-pointer w-[144px] h-[144px] object-cover ${
                index === activeImg
                  ? "border-4 border-[var(--primary-color-700)]"
                  : ""
              } ${!isLoadedImages[index] ? "hidden" : ""}`}
              onClick={() => setActiveImg(index)}
              role="button"
            />

            {!isLoadedImages[index] ? (
              <div className="w-[144px] h-[144px] bg-slate-500 animate-pulse shrink-0" />
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ImagesPart;
