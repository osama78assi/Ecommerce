import React, { useState } from "react";

function Card({ images, brand, price, originalPrice, onAddToCart }) {
  const [currentImage, setCurrentImage] = useState(0);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="max-w-xs bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        <img
          src={images[currentImage]}
          alt={`${brand} product`}
          className="w-full h-56 object-cover bg-red-400"
        />
        <button
          onClick={prevImage}
          className="absolute top-1/2 left-2 -translate-y-1/2 bg-gray-800/50 text-white p-1 rounded-full hover:bg-gray-800"
        >
          ◀
        </button>
        <button
          onClick={nextImage}
          className="absolute top-1/2 right-2 -translate-y-1/2 bg-gray-800/50 text-white p-1 rounded-full hover:bg-gray-800"
        >
          ▶
        </button>
      </div>

      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800">{brand}</h2>
        <div className="flex items-center justify-between mt-2">
          <span className="text-xl font-bold text-blue-600">${price}</span>
          <span className="text-sm text-gray-500 line-through">
            ${originalPrice}
          </span>
        </div>
        <button
          onClick={onAddToCart}
          className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-500 transition-colors"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default Card;
