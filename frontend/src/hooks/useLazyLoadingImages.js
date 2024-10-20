import { useEffect, useState } from "react";

export function useLazyloadingImgs(images) {
  const [imgsUrls, setImgsUrls] = useState(
    Array.from({ length: images.length }, (ele) => "")
  ); // To know if the images is loading

  // To load the images async
  useEffect(() => {
    (async function () {
      if (images) {
        images.map(async function (image, index) {
          try {
            const res = await fetch(image, { method: "GET" });
            const blob = await res.blob();
            const url = URL.createObjectURL(blob);
            setImgsUrls((imgs) => {
              imgs[index] = url;
              return imgs;
            });
            return url;
          } catch (err) {
            console.log(err);
            // To know if the there is an error to handle in user interface
            setImgsUrls((imgs) => {
              imgs[index] = "error";
              return imgs;
            });
            return "";
          }
        });
      }
    })();
  }, [images]);

  return imgsUrls;
}
