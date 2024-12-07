import React, { useRef, useState } from "react";
// import { toast } from "react-toastify";
// import SummaryApi from "../../common";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import SummaryApi from "../../common";
import {
  isValidArabicChars,
  isValidEnglishChars,
  isValidFrenchChars,
} from "../../helpers/checkLanguages";
import SubmitBtn from "../ui/SubmitBtn";
import AdminInput from "./AdminInput";
import ModalWindow from "./ModalWindow";
import SelectCategories from "./SelectCategories";
import UploadImages from "./UploadImages";

function UploadProduct({ onClose, fetchData }) {
  const { t } = useTranslation();
  const imgsRef = useRef(() => new FileList());
  const [isUploading, setIsUploading] = useState(false);

  // Uploading images
  async function uploadImages(images) {
    try {
      toast.warn(t("messages.warnUploadProduct"));
      setIsUploading(true);
      const formData = new FormData();
      for (let i = 0; i < images.length; ++i) {
        formData.append("productImage", images[i]);
      }

      const req = await fetch(SummaryApi.uploadProductImages.url, {
        method: SummaryApi.uploadProductImages.method,
        body: formData,
        credentials: "include",
      });

      const res = await req.json();
      if (res.success) {
        return res.imagePaths;
      } else {
        throw new Error("Something went wrong");
      }
    } catch (err) {
      console.log(err.message);
      toast.error(t("messages.errUploadProductImgs"));
    }
  }

  // Uploading product data
  async function uploadProductData(data) {
    try {
      const req = await fetch(SummaryApi.uploadProduct.url, {
        method: SummaryApi.uploadProduct.method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const res = await req.json();
      if (res.success) {
        toast.success(t("messages.successUploadProductData"));
      } else {
        throw new Error("Something went wrong");
      }
    } catch (err) {
      console.log(err.message);
      toast.error(t("messages.errUploadProductData"));
    }
  }

  // Upload entire product
  async function handleSubmit(e) {
    e.preventDefault();
    if (!imgsRef.current.length) {
      toast.error(t("messages.errProductImg"));
      return;
    }

    try {
      const data = new FormData(e.target);

      // imgs
      const imgsUrls = await uploadImages(imgsRef.current);

      // The complement of data
      const finallData = {
        name: [],
        category: "",
        productImage: imgsUrls,
        description: [],
        price: 0,
      };
      data.entries().forEach((item) => {
        // Product name
        if (
          item.find(
            (val) =>
              val === "productNameAR" ||
              val === "productNameEN" ||
              val === "productNameFR"
          ) !== undefined
        ) {
          finallData.name.push({
            language: item[0].slice(11).toLowerCase(),
            text: item[1].trim(),
          });
        }

        // Product details
        else if (
          item.find(
            (val) =>
              val === "descriptionEN" ||
              val === "descriptionAR" ||
              val === "descriptionFR"
          ) !== undefined
        ) {
          finallData.description.push({
            language: item[0].slice(11).toLowerCase(),
            text: item[1].trim(),
          });
        } else if (item[0] === "price") {
          finallData[item[0]] = +item[1];
        }

        // Rest of the data (description lol)
        else {
          finallData[item[0]] =
            item[0] === "productImage" ? item[1] : item[1].trim();
        }
      });

      await uploadProductData(finallData);

      // Refetch Products
      fetchData?.();
      onClose();
    } catch (err) {
      console.log(err.message);
    } finally {
      setIsUploading(false);
    }
  }

  function modifyImgs(file, operation, index) {
    switch (operation) {
      case "ADD":
        const transfer1 = new DataTransfer();
        for (let i = 0; i < imgsRef.current?.length; ++i) {
          transfer1.items.add(imgsRef.current[i]);
        }

        transfer1.items.add(file);
        imgsRef.current = transfer1.files;
        break;

      case "DELETE":
        const transfer2 = new DataTransfer();
        for (let i = 0; i < imgsRef.current?.length; ++i) {
          if (i !== index) {
            transfer2.items.add(imgsRef.current[i]);
          }
        }

        imgsRef.current = transfer2.files;
        break;

      default:
        return;
    }
  }

  return (
    <ModalWindow onClose={onClose}>
      <form
        className="grid p-4 gap-2 overflow-y-auto pb-5"
        onSubmit={handleSubmit}
      >
        <AdminInput
          id="productNameEN"
          placeholder={t("forms.admin.productNameField.placeholder")}
          name="productNameEN"
          type="text"
          classes="p-2 bg-slate-100 border rounded disabled:cursor-not-allowed"
          required={true}
          disabled={isUploading}
          label={t("forms.admin.productNameField.label")}
          sterilizer={(val) => {
            if (!isValidEnglishChars(val, t)) {
              return false;
            }
            if (val.length >= 150) {
              toast.warn(t("messages.errProductNameLong"));
              return false;
            }
            return true;
          }}
        />

        <AdminInput
          id="productNameAR"
          placeholder={t("forms.admin.productNameFieldAR.placeholder")}
          name="productNameAR"
          type="text"
          classes="p-2 bg-slate-100 border rounded disabled:cursor-not-allowed"
          required={true}
          disabled={isUploading}
          label={t("forms.admin.productNameFieldAR.label")}
          sterilizer={(val) => {
            if (!isValidArabicChars(val, t)) {
              return false;
            }
            if (val.length >= 150) {
              toast.warn(t("messages.errProductNameLong"));
              return false;
            }
            return true;
          }}
        />

        <AdminInput
          id="productNameFR"
          placeholder={t("forms.admin.productNameFieldFR.placeholder")}
          name="productNameFR"
          type="text"
          classes="p-2 bg-slate-100 border rounded disabled:cursor-not-allowed"
          required={true}
          disabled={isUploading}
          label={t("forms.admin.productNameFieldFR.label")}
          sterilizer={(val) => {
            if (!isValidFrenchChars(val, t)) {
              return false;
            }
            if (val.length >= 150) {
              toast.warn(t("messages.errProductNameLong"));
              return false;
            }
            return true;
          }}
        />

        <SelectCategories disabled={isUploading} />

        <UploadImages
          disabled={isUploading}
          error={t("messages.errProductImg")}
          label={t("forms.admin.imagesProductField.label")}
          modifyImgs={modifyImgs}
        />

        <AdminInput
          type="text"
          id="price"
          placeholder={t("forms.admin.priceField.placeholder")}
          name="price"
          classes="p-2 bg-slate-100 border rounded disabled:cursor-not-allowed"
          label={t("forms.admin.priceField.label")}
          required={true}
          disabled={isUploading}
          sterilizer={(val) => {
            return (
              (/\d/.test(val[val.length - 1]) && Number.isSafeInteger(+val)) ||
              val === ""
            );
          }}
        />

        <AdminInput
          type="textarea"
          id="descriptionEN"
          placeholder={t("forms.admin.descriptionField.placeholder")}
          name="descriptionEN"
          classes="h-28 bg-slate-100 border resize-none p-1 disabled:cursor-not-allowed"
          label={t("forms.admin.descriptionField.label")}
          rows={3}
          required={true}
          disabled={isUploading}
          sterilizer={(val) => {
            if (!isValidEnglishChars(val, t)) {
              return false;
            }
            return val.length <= 500;
          }}
        />

        <AdminInput
          type="textarea"
          id="descriptionAR"
          placeholder={t("forms.admin.descriptionFieldAR.placeholder")}
          name="descriptionAR"
          classes="h-28 bg-slate-100 border resize-none p-1 disabled:cursor-not-allowed"
          label={t("forms.admin.descriptionFieldAR.label")}
          rows={3}
          required={true}
          disabled={isUploading}
          sterilizer={(val) => {
            if (!isValidArabicChars(val, t)) {
              return false;
            }
            return val.length <= 500;
          }}
        />

        <AdminInput
          type="textarea"
          id="descriptionFR"
          placeholder={t("forms.admin.descriptionFieldFR.placeholder")}
          name="descriptionFR"
          classes="h-28 bg-slate-100 border resize-none p-1 disabled:cursor-not-allowed"
          label={t("forms.admin.descriptionFieldFR.label")}
          rows={3}
          required={true}
          disabled={isUploading}
          sterilizer={(val) => {
            if (!isValidFrenchChars(val, t)) {
              return false;
            }
            return val.length <= 500;
          }}
        />

        <SubmitBtn
          title={t("forms.admin.uploadProductBtn")}
          type="primary"
          classes="px-3 pt-2"
          dis={isUploading}
        />
        {/* 
        <button className="px-3 py-2 bg-red-600 text-white mb-10 hover:bg-red-700">
          Upload Product
        </button> */}
      </form>
    </ModalWindow>
  );
}

export default UploadProduct;
