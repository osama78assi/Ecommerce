import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import { useLazyloadingImgs } from "../../hooks/useLazyLoadingImages";
import DisplayImage from "../ui/DisplayImage";

function UploadProductImages({ preImages, delImages }) {
  const { t } = useTranslation();
  const [data, setData] = useState([]);
  const [openFullScreenImage, setOpenFullScreenImage] = useState(false);
  const [fullScreenImage, setFullScreenImage] = useState("");
  const [dragableClass, setDragableClass] = useState("");
  const images = useLazyloadingImgs(preImages || []);

  function handleSetImages(e, imgs) {
    if (imgs) {
      imgs.forEach((file) => {
        // Ignore big image
        if (file.size > 5 * 1024 * 1024) {
          toast.error(t("messages.errProductImg"));
          return;
        }

        const reader = new FileReader();
        reader.onload = function (event) {
          const previewImageUrl = event.target.result;
          setData((previousImgs) => [...previousImgs, previewImageUrl]);
        };
        reader.readAsDataURL(file); // Read file as data URL
      });
    } else if (e) {
      [...e.target.files].forEach((file) => {
        // Ignore big image
        if (file.size > 5 * 1024 * 1024) {
          toast.error(t("messages.errProductImg"));
          return;
        }

        const reader = new FileReader();
        reader.onload = function (event) {
          const previewImageUrl = event.target.result;
          setData((previousImgs) => [...previousImgs, previewImageUrl]);
        };
        reader.readAsDataURL(file); // Read file as data URL
      });
    }
  }

  function handleDeleteProductImage(index) {
    setData((previouseImgs) => previouseImgs.filter((_, i) => i !== index));
  }

  function handleDragOver(e) {
    e.stopPropagation();
    e.preventDefault();
    setDragableClass("border-[4px] border-dashed border-stone-700");
  }

  function handleDragLeave(e) {
    e.stopPropagation();
    e.preventDefault();

    setDragableClass("");
  }

  function handleDropFiles(e) {
    e.stopPropagation();
    e.preventDefault();
    const files = [...e.dataTransfer.files];
    // Only images
    const imgs = files.filter((file) => /^(image)/.test(file.type));
    handleSetImages(null, imgs);
    setDragableClass("");
  }

  return (
    <>
      <label htmlFor="productImage" className="mt-3">
        {t("forms.admin.imagesField.outerLabel")}
      </label>
      <label
        htmlFor="uploadImageInput"
        className={dragableClass}
        onDragOverCapture={handleDragOver}
        onDragLeaveCapture={handleDragLeave}
        onDragEnterCapture={handleDragOver}
        onDropCapture={handleDropFiles}
      >
        <div className="p-2 bg-slate-100 border rounded h-32 w-full flex justify-center items-center cursor-pointer">
          <div className="text-slate-500 flex justify-center items-center flex-col gap-2">
            <span className="text-4xl">
              <FaCloudUploadAlt />
            </span>
            <p className="text-sm">
              {t("forms.admin.imagesField.innerLabel")}
            </p>
            <input
              type="file"
              accept="image/*"
              id="uploadImageInput"
              className="hidden"
              onChange={handleSetImages}
              multiple={true}
            />
          </div>
        </div>
      </label>
      <div>
        {data[0] ? (
          <div className="flex items-center gap-2 w-full overflow-y-auto max-h-[20rem] flex-wrap">
            {data.map((el, index) => {
              return (
                <div className="relative group basis-[calc(50%-0.5rem)]">
                  <img
                    src={el}
                    alt="product"
                    className="bg-slate-100 object-cover border-[3px] border-stone-500 cursor-pointer"
                    onClick={() => {
                      setOpenFullScreenImage(true);
                      setFullScreenImage(el);
                    }}
                  />

                  <div
                    className="absolute bottom-0 right-0 p-1 text-white bg-red-600 rounded-full hidden group-hover:block cursor-pointer"
                    onClick={() => handleDeleteProductImage(index)}
                  >
                    <MdDelete />
                  </div>
                </div>
              );
            })}
            {images[0] &&
              images.map((url, index) => {
                if (url)
                  return (
                    <div className="relative group basis-[calc(50%-0.5rem)]">
                      <img
                        src={url}
                        alt="product"
                        className="bg-slate-100 object-cover border-[3px] border-stone-500 cursor-pointer"
                        onClick={() => {
                          setOpenFullScreenImage(true);
                          setFullScreenImage(url);
                        }}
                      />

                      <div
                        className="absolute bottom-0 right-0 p-1 text-white bg-red-600 rounded-full hidden group-hover:block cursor-pointer"
                        onClick={() => delImages?.(index)}
                      >
                        <MdDelete />
                      </div>
                    </div>
                  );
                else
                  return (
                    <div className="relative group basis-[calc(50%-0.5rem)] h-[10rem] bg-gray-500 animate-pulse" />
                  );
              })}
          </div>
        ) : (
          <p className="text-red-600 text-xs">{t("messages.errProductImg")}</p>
        )}
      </div>

      {/***display image full screen */}
      {openFullScreenImage && (
        <DisplayImage
          onClose={() => setOpenFullScreenImage(false)}
          imgUrl={fullScreenImage}
          classes="mt-[3rem]"
        />
      )}
    </>
  );
}

export default UploadProductImages;
