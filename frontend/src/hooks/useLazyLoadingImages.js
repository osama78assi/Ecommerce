import { useEffect, useState } from "react";

export function useLazyloadingImgs(images) {
  const [imgsUrls, setImgsUrls] = useState(
    Array.from({ length: images.length }, (ele) => "")
  ); // To know if the images is loading

  // To load the images async
  useEffect(() => {
    const loadImages = async () => {
      const newImgs = [...imgsUrls]; // Start with an initial array
      for (let index = 0; index < images.length; index++) {
        try {
          const res = await fetch(images[index], { method: "GET" });
          const blob = await res.blob();
          const url = URL.createObjectURL(blob);
          newImgs[index] = url;
        } catch (err) {
          console.error(err);
          newImgs[index] = "error";
        }
      }
      setImgsUrls(newImgs); // Set state once after all images are processed
    };
    if (images && images.length) {
      loadImages();
    }
  }, [images]);
  

  return imgsUrls;
}
