import { useState } from "react";

function ImageVision({ imageSrc }) {
  const [isLoadedImage, setIsLoadedImage] = useState(false);

  return (
    <div className="flex-1 w-full h-full">
      <div
        className={`w-full h-[20rem] bg-gray-500 animate-pulse1 ${
          isLoadedImage ? "hidden" : ""
        }`}
      />
      <img
        onLoad={() => setIsLoadedImage(true)}
        src={imageSrc}
        alt="Vision"
        className={`rounded-lg shadow-lg w-full object-cover h-[500px] cursor-pointer ${
          !isLoadedImage ? "hidden" : ""
        }`}
      />
    </div>
  );
}

export default ImageVision;
