import { useState } from "react";

function ImageVision({ imageSrc }) {
  const [isLoadedImage, setIsLoadedImage] = useState(false);

  return (
    <div className="flex-1 w-full h-full rounded-lg">
      <div
        className={`w-full h-[20rem] bg-gray-500 animate-pulse1 rounded-lg ${
          isLoadedImage ? "hidden" : ""
        }`}
      />
      <img
        onLoad={() => setIsLoadedImage(true)}
        src={imageSrc}
        alt="Vision"
        className={`w-full object-cover h-[500px] cursor-pointer rounded-lg ${
          !isLoadedImage ? "hidden" : ""
        }`}
      />
    </div>
  );
}

export default ImageVision;
