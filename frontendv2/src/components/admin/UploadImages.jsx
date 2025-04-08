import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import DisplayImage from "../ui/DisplayImage";

function UploadImages({ modifyImgs, label, error, disabled, multiple = true }) {
  const { t } = useTranslation();
  const [data, setData] = useState([]);
  const [openFullScreenImage, setOpenFullScreenImage] = useState(false);
  const [fullScreenImage, setFullScreenImage] = useState("");
  const [dragableClass, setDragableClass] = useState("");

  function handleSetImages(e, imgs) {
    if (disabled) return;

    if (imgs) {
      imgs.forEach((file) => {
        // Ignore big image
        if (file.size > 5 * 1024 * 1024) {
          toast.error(error);
          return;
        }
        modifyImgs?.(file, "ADD", null);
        const reader = new FileReader();
        reader.onload = function (event) {
          const previewImageUrl = event.target.result;
          if(multiple)
            setData((previousImgs) => [...previousImgs, previewImageUrl]);
          else
            setData([previewImageUrl])
        };
        reader.readAsDataURL(file); // Read file as data URL
      });
    } else if (e) {
      [...e.target.files].forEach((file) => {
        // Ignore big image
        if (file.size > 5 * 1024 * 1024) {
          toast.error(error);
          return;
        }
        modifyImgs?.(file, "ADD", null);

        const reader = new FileReader();
        reader.onload = function (event) {
          const previewImageUrl = event.target.result;
          if(multiple)
            setData((previousImgs) => [...previousImgs, previewImageUrl]);
          else
            setData([previewImageUrl])
        };
        reader.readAsDataURL(file); // Read file as data URL
      });
    }
  }

  function handleDeleteProductImage(index) {
    if (disabled) return;

    if (multiple)
      setData((previouseImgs) => previouseImgs.filter((_, i) => i !== index));
    else
      setData([])
    modifyImgs?.(null, "DELETE", index);
  }

  function handleDragOver(e) {
    if (disabled) return;

    e.stopPropagation();
    e.preventDefault();
    setDragableClass("border-[4px] border-dashed border-stone-700");
  }

  function handleDragLeave(e) {
    if (disabled) return;

    e.stopPropagation();
    e.preventDefault();

    setDragableClass("");
  }

  function handleDropFiles(e) {
    if (disabled) return;

    e.stopPropagation();
    e.preventDefault();
    let files = [];
    // Loop through the files and pick the first image if not multiple
    for (const file of e.dataTransfer.files) {
      if (/^(image)/.test(file.type)) {
        files.push(file);
        if (!multiple) break; // Exit the loop after finding the first image
      }
    }
    // Only images
    // const imgs = files.filter((file) => /^(image)/.test(file.type));
    handleSetImages(null, files);
    setDragableClass("");
  }

  return (
    <>
      <label htmlFor="productImage" className="mt-3">
        {label}
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
            <p className="text-sm">{t("forms.admin.imagesField.label")}</p>
            <input
              disabled={disabled}
              type="file"
              accept="image/*"
              id="uploadImageInput"
              className="hidden"
              onChange={handleSetImages}
              multiple={multiple}
            />
          </div>
        </div>
      </label>
      <div>
        {data[0] ? (
          <div className="flex items-center gap-2 w-full overflow-y-auto max-h-[20rem] flex-wrap">
            {data[0] &&
              data.map((url, index) => {
                if (url)
                  return (
                    <div
                      key={url}
                      className="relative group basis-[calc(50%-0.5rem)]"
                    >
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
                        onClick={() => handleDeleteProductImage?.(index)}
                      >
                        <MdDelete />
                      </div>
                    </div>
                  );
                else
                  return (
                    <div
                      key={index}
                      className="relative group basis-[calc(50%-0.5rem)] h-[10rem] bg-gray-500 animate-pulse"
                    />
                  );
              })}
          </div>
        ) : (
          <p className="text-red-600 text-xs">{error}</p>
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

export default UploadImages;
