import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import displayINRCurrency from "../../helpers/displayCurrency";
import { useLazyloadingImgs } from "../../hooks/useLazyLoadingImages";
import CardImage from "./CardImage";

function Card({
  id,
  images,
  name,
  sellingPrice,
  price,
  classes,
  onAddToCart,
  onShowDetails,
}) {
  const [currentImage, setCurrentImage] = useState(0);
  const { i18n } = useTranslation();
  const loadedImages = useLazyloadingImgs(images);
  const nav = useNavigate();

  function nextImage() {
    setCurrentImage((prev) => (prev + 1) % images.length);
  }

  function prevImage() {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  }

  function showDetails() {
    nav(`/product/${id}`);
  }

  return (
    <div
      className={`w-[20rem] basis-[20rem] sm:w-auto sm:basis-[calc(50%-1rem)] md:basis-[calc(33.333333333% - 1rem)] lg:basis-[calc(25%-1rem)] bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 ${
        classes ? classes : ""
      }`}
    >
      <div className="relative">
        {<CardImage imgUrl={loadedImages[currentImage]} name={name} />}
      </div>

      <div>
        <div className="flex justify-between">
          <button
            onClick={() => (i18n.language === "en" ? prevImage() : nextImage())}
            className="bg-primary-900 text-white p-2 hover:bg-primary-700 "
          >
            {i18n.language === "en" ? <FaAngleLeft /> : <FaAngleRight />}
          </button>
          <span>
            {currentImage + 1} / {images.length}
          </span>
          <button
            onClick={() => (i18n.language === "en" ? nextImage() : prevImage())}
            className=" bg-primary-900 text-white p-2 hover:bg-primary-700"
          >
            {i18n.language === "en" ? <FaAngleRight /> : <FaAngleLeft />}
          </button>
        </div>

        <div className="p-4">
          <h2 className="text-2xl font-semibold text-gray-800">{name}</h2>
          <div className="flex items-center justify-between mt-2">
            <span className="text-xl font-bold">
              {displayINRCurrency(sellingPrice)}
            </span>
            {price !== 0 && (
              <span className="text-sm text-gray-500 line-through">
                {displayINRCurrency(price)}
              </span>
            )}
          </div>

          <div className="flex gap-[1.5rem]">
            <button
              onClick={onAddToCart}
              className="mt-4 w-full bg-primary-900 text-white py-2 px-4 basis-[calc(50%-0.75rem)] rounded-lg hover:bg-primary-700 transition-colors"
            >
              Add to Cart
            </button>
            <button
              onClick={showDetails}
              className="mt-4 w-full bg-primary-900 text-white py-2 px-4 basis-[calc(50%-0.75rem)] rounded-lg hover:bg-primary-700 transition-colors"
            >
              Show details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
