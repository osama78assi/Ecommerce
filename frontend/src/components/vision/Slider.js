import { useState } from "react";
import { createPortal } from "react-dom";
import { useTranslation } from "react-i18next";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { useLazyloadingImgs } from "../../hooks/useLazyLoadingImages";
import DisplayImage from "../ui/DisplayImage";
import ImageVision from "./ImageVision";

function Slider({ imgs }) {
  const { i18n } = useTranslation();
  const imgsURLs = useLazyloadingImgs(imgs);
  const [activeImage, setActiveImg] = useState(0);
  const [showArrows, setShowArrows] = useState(true);
  const [show, setShow] = useState(false);

  function slideRight() {
    setActiveImg(
      (current) => (current + 1 + imgsURLs.length) % imgsURLs.length
    );
  }

  function slideLeft() {
    setActiveImg(
      (current) => (current - 1 + imgsURLs.length) % imgsURLs.length
    );
  }

  return (
    <div
      className="relative w-full"
      onMouseEnter={() => setShowArrows(true)}
      onMouseLeave={() => setShowArrows(false)}
    >
      <ImageVision imageSrc={imgsURLs[activeImage]} />
      <div
        className={`w-full h-full flex justify-between ${
          showArrows ? "!visible" : ""
        } invisible absolute top-0 cursor-pointer`}
        onClick={(e) => {
          if (!Boolean(e.target.dataset?.arr)) {
            setShow(true);
          }
        }}
      >
        <span
          className="w-[50px] h-full flex justify-center items-center relative z-[3] backdrop-brightness-75 cursor-pointer"
          data-arr={true}
          onClick={i18n.language === "ar" ? slideRight : slideLeft}
        >
          {i18n.language === "ar" ? (
            <FaAngleRight className="arr-slider text-lg !color-white" />
          ) : (
            <FaAngleLeft className="arr-slider text-lg !color-white" />
          )}
        </span>
        <span
          className="w-[50px] h-full flex justify-center items-center relative z-[3] backdrop-brightness-75 cursor-pointer"
          onClick={i18n.language === "ar" ? slideLeft : slideRight}
          data-arr={true}
        >
          {i18n.language === "ar" ? (
            <FaAngleLeft className="arr-slider text-lg !color-white" />
          ) : (
            <FaAngleRight className="arr-slider text-lg !color-white" />
          )}
        </span>
      </div>
      {show &&
        createPortal(
          <DisplayImage
            imgUrl={imgsURLs[activeImage]}
            onClose={() => setShow(false)}
          />,
          document.body
        )}
    </div>
  );
}

export default Slider;
