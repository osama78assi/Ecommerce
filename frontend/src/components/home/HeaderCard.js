import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

// When update something here make sure to reload the page because there is some classes added by side effects
function HeaderCard({ img, description, title, getElement, onRechange }) {
  const [isLoadedImg, setIsLoadedImg] = useState(false);
  const {i18n} = useTranslation();
  const cardRef = useRef(null);
  const cardClass = `flex h-full w-full left-0 absolute transition-position`;

  useEffect(() => {
    getElement?.(cardRef);
  }, []);

  return (
    <div className={cardClass} ref={cardRef}>
      <div className={`relative w-full ${!isLoadedImg ? "hidden" : ""}`}>
        <img
          onLoad={() => setIsLoadedImg(true)}
          alt="details"
          src={img}
          className={`object-cover h-full w-full cursor-pointer bg-gray-700`}
        />
        <div className={`absolute w-full h-full top-0 left-0 ${i18n.language !== "ar" ? "bg-gradient-to-r" : "bg-gradient-to-l"} from-[#000000c6] via-[#000000b5] to-transparent`} />
        {description !== "" || title !== "" ? (
          <>
            <div className={`absolute w-full h-full ${i18n.language ==="ar" ? "right-0" :"left-0"} top-0 flex items-center flex-col justify-center md:w-[50%]`}>
              <h1 className="text-white mr-auto p-2 pl-10 text-xl font-bold md:text-4xl md:p-5 md:pl-10">
                {title}
              </h1>
              <p className="text-white mr-auto font-light p-1 pl-9 w-[90%] md:text-2xl md:p-5 md:pl-9 md:w-full">
                {description}
              </p>
            </div>
          </>
        ) : null}
      </div>
      <div
        className={`absolute left-0 h-full w-full top-0 bg-gray-700 animate-pulse ${
          isLoadedImg ? "hidden" : ""
        }`}
      />
    </div>
  );
}

export default HeaderCard;
