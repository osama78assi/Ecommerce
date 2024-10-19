import { useEffect, useState } from "react";

export function useLazyloadingImg(profilePic) {
  const [imgUrl, setImgUrl] = useState(""); // To load the image async

  // To load the image async
  useEffect(() => {
    if (profilePic) {
      // If the image loaded before then fine.
      if (!imgUrl) {
        fetch(profilePic, { method: "GET" })
          .then((res) => res.blob())
          .then((blob) => {
            const url = URL.createObjectURL(blob);
            setImgUrl(url);
          });
      }
    }
  }, [profilePic]);

  return imgUrl;
}
