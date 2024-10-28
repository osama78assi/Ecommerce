import React from "react";
// import { toast } from "react-toastify";
// import SummaryApi from "../../common";
import SubmitBtn from "../ui/SubmitBtn";
import AdminInput from "./AdminInput";
import ModalWindow from "./ModalWindow";
import SelectCategories from "./SelectCategories";
import UploadProductImages from "./UploadProductImages";

const UploadProduct = ({ onClose, fetchData }) => {
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
    <ModalWindow onClose={onClose} title="Upload Product">
      <form
        className="grid p-4 gap-2 overflow-y-scroll pb-5 h-[90%]"
        onSubmit={handleSubmit}
      >
        <AdminInput
          id="productName"
          placeholder="enter product name"
          name="productName"
          type="text"
          classes="p-2 bg-slate-100 border rounded"
          required={true}
          label="Product Name :"
          sterilizer={(val) => val.length <= 100}
        />

        <AdminInput
          type="text"
          id="brandName"
          placeholder="enter brand name"
          name="brandName"
          classes="p-2 bg-slate-100 border rounded"
          label="Brand Name :"
          required={true}
          sterilizer={(val) => val.length <= 100}
        />

        <SelectCategories />

        <UploadProductImages />

        <AdminInput
          type="text"
          id="price"
          placeholder="enter price"
          name="price"
          classes="p-2 bg-slate-100 border rounded"
          label="Price :"
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
          placeholder="enter selling price"
          name="sellingPrice"
          classes="p-2 bg-slate-100 border rounded"
          label="Selling Price :"
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
          placeholder="enter product description"
          name="description"
          classes="h-28 bg-slate-100 border resize-none p-1"
          label="Description :"
          rows={3}
          required={true}
          sterilizer={(val) => {
            return val.length <= 500;
          }}
        />

        <SubmitBtn title="Upload product" type="primary" classes="px-3 pt-2" />
        {/* 
        <button className="px-3 py-2 bg-red-600 text-white mb-10 hover:bg-red-700">
          Upload Product
        </button> */}
      </form>
    </ModalWindow>
  );
};

export default UploadProduct;
