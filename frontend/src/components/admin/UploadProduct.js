import React from "react";
// import { toast } from "react-toastify";
// import SummaryApi from "../../common";
import { useTranslation } from "react-i18next";
import SubmitBtn from "../ui/SubmitBtn";
import AdminInput from "./AdminInput";
import ModalWindow from "./ModalWindow";
import SelectCategories from "./SelectCategories";
import UploadProductImages from "./UploadProductImages";
import { toast } from "react-toastify";

function UploadProduct({ onClose, fetchData }) {
  const { t } = useTranslation();
  /**upload product */
  async function handleSubmit(e) {
    e.preventDefault();
    console.log(e);
    // try {
    //   const response = await fetch(SummaryApi.uploadProduct.url, {
    //     method: SummaryApi.uploadProduct.method,
    //     credentials: "include",
    //     headers: {
    //       "content-type": "application/json",
    //     },
    //     body: JSON.stringify(data),
    //   });

    //   const responseData = await response.json();

    //   if (responseData.success) {
    //     toast.success(responseData?.message);
    //     onClose();
    //     fetchData();
    //   }

    //   if (responseData.error) {
    //     toast.error(responseData?.message);
    //   }
    // } catch (err) {
    //   console.log(err.message);
    // }
  }

  return (
    <ModalWindow onClose={onClose}>
      <form
        className="grid p-4 gap-2 overflow-y-scroll pb-5 h-[90%]"
        onSubmit={handleSubmit}
      >
        <AdminInput
          id="productName"
          placeholder={t("forms.admin.productNameField.placeholder")}
          name="productName"
          type="text"
          classes="p-2 bg-slate-100 border rounded"
          required={true}
          label={t("forms.admin.productNameField.label")}
          sterilizer={(val) => {
            console.log(val);
            if (/\W+/.test(val)) {
              toast.warn(t("messages.errSpecialNameChars"));
              return false;
            }
            if (val.length >= 150) {
              toast.warn(t("messages.errProductNameLong"));
              return false;
            }
            return true;
          }}
        />
        
        <SelectCategories />

        <UploadProductImages />

        <AdminInput
          type="text"
          id="price"
          placeholder={t("forms.admin.priceField.placeholder")}
          name="price"
          classes="p-2 bg-slate-100 border rounded"
          label={t("forms.admin.priceField.label")}
          required={true}
          sterilizer={(val) => {
            return (
              (/\d/.test(val[val.length - 1]) && Number.isSafeInteger(+val)) ||
              val === ""
            );
          }}
        />

        <AdminInput
          type="text"
          id="sellingPrice"
          placeholder={t("forms.admin.sellingPriceField.placeholder")}
          name="sellingPrice"
          classes="p-2 bg-slate-100 border rounded"
          label={t("forms.admin.sellingPriceField.label")}
          required={true}
          sterilizer={(val) => {
            return (
              (/\d/.test(val[val.length - 1]) && Number.isSafeInteger(+val)) ||
              val === ""
            );
          }}
        />

        <AdminInput
          type="textarea"
          id="description"
          placeholder={t("forms.admin.descriptionField.placeholder")}
          name="description"
          classes="h-28 bg-slate-100 border resize-none p-1"
          label={t("forms.admin.descriptionField.label")}
          rows={3}
          required={true}
          sterilizer={(val) => {
            return val.length <= 500;
          }}
        />

        <SubmitBtn title={t("forms.admin.uploadProductBtn")} type="primary" classes="px-3 pt-2" />
        {/* 
        <button className="px-3 py-2 bg-red-600 text-white mb-10 hover:bg-red-700">
          Upload Product
        </button> */}
      </form>
    </ModalWindow>
  );
}

export default UploadProduct;
