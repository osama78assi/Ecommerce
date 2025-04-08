import { useState } from "react";

function CardImage({ name, imgUrl }) {
  const [isLoadedImg, setIsLoadedImg] = useState(false);
  return (
    <>
      <img
        onLoad={() => setIsLoadedImg(true)}
        src={imgUrl}
        alt={`${name} product`}
        className={`w-full h-56 object-cover ${!isLoadedImg ? "hidden" : ""}`}
      />

      <div className={`w-full h-56 bg-gray-500 animate-pulse ${isLoadedImg ? "hidden" : ""}`} />
    </>
  );
}

export default CardImage;
