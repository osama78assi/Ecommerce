import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import SubmitBtn from "../ui/SubmitBtn";
import AdminInput from "./AdminInput";
import ModalWindow from "./ModalWindow";
import SelectCategories from "./SelectCategories";
import UploadProductImages from "./UploadProductImages";

const AdminEditProduct = ({ onClose, productData, fetchdata }) => {
  const { t } = useTranslation();
  const [data, setData] = useState({
    ...productData,
    productName: productData?.productName,
    brandName: productData?.brandName,
    category: productData?.category,
    productImage: productData?.productImage || [],
    description: productData?.description,
    price: productData?.price,
    sellingPrice: productData?.sellingPrice,
  });
  /**upload product */
  async function handleSubmit(e) {
    e.preventDefault();
    console.log(e);
    console.log(data);
    // Send request

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
    <ModalWindow onClose={onClose} title="Upload Product">
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
          defaultValue={data.productName}
          sterilizer={(val) => val.length <= 100}
        />

        <AdminInput
          type="text"
          id="brandName"
          placeholder={t("forms.admin.brandNameField.placeholder")}
          name="brandName"
          classes="p-2 bg-slate-100 border rounded"
          label={t("forms.admin.brandNameField.label")}
          defaultValue={productData?.brandName}
          required={true}
          sterilizer={(val) => val.length <= 100}
        />

        <SelectCategories activeOption={data.category} />

        <UploadProductImages
          preImages={data.productImage || []}
          delImages={(index) =>
            setData((prevData) => {
              return {
                ...prevData,
                productImage: prevData.productImage.filter(
                  (url) => url !== prevData[index]
                ),
              };
            })
          }
        />

        <AdminInput
          type="text"
          id="price"
          placeholder={t("forms.admin.priceField.placeholder")}
          name="price"
          classes="p-2 bg-slate-100 border rounded"
          label={t("forms.admin.priceField.label")}
          defaultValue={data.price}
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
          defaultValue={data.sellingPrice}
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
          defaultValue={data.description}
          rows={3}
          required={true}
          sterilizer={(val) => {
            return val.length <= 500;
          }}
        />

        <SubmitBtn title={t("fomrs.admin.editProductBtn")} type="primary" classes="px-3 pt-2" />
      </form>
    </ModalWindow>
  );
};

export default AdminEditProduct;
