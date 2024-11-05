import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import displayINRCurrency from "../../helpers/displayCurrency";
import { useLazyloadingImgs } from "../../hooks/useLazyLoadingImages";

function Card({
  images,
  name,
  price,
  originalPrice,
  classes,
  onAddToCart,
  onShowDetails,
}) {
  const [currentImage, setCurrentImage] = useState(0);
  const { i18n } = useTranslation();
  const loadedImages = useLazyloadingImgs(images);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div
      className={`max-w-xs bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 ${
        classes ? classes : ""
      }`}
    >
      <div className="relative">
        {loadedImages[currentImage] !== "" ? (
          <img
            src={loadedImages[currentImage]}
            alt={`${name} product`}
            className="w-full h-56 object-cover"
          />
        ) : (
          <div className="w-full h-56 bg-gray-500 animate-pulse" />
        )}
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
              {displayINRCurrency(price)}
            </span>
            {originalPrice !== 0 && (
              <span className="text-sm text-gray-500 line-through">
                {displayINRCurrency(originalPrice)}
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
              onClick={onAddToCart}
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
