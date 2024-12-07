import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { MdDelete } from "react-icons/md";
import displayINRCurrency from "../../helpers/displayCurrency";
import Confirm from "../ui/Confirm";
import SummaryApi from "../../common";
import { toast } from "react-toastify";

function AdminProductCard({ data, fetchData }) {
  // const [editProduct, setEditProduct] = useState(false);
  const { t } = useTranslation();
  const { i18n } = useTranslation();
  const [confirmDelete, setconfirmDelete] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  async function deleteProduct() {
    try {
      setIsDeleting(true);
      const req = await fetch(`${SummaryApi.deleteProduct.url}${data._id}`, {
        method: SummaryApi.deleteProduct.method,
        credentials: "include",
      });

      const res = await req.json();
      if(res.success) {
        toast.success(t("messages.successDeleteProduct"))
        fetchData?.();
      } else {
        throw new Error("Something went wrong");
      }
    } catch (err) {
      console.log(err.message);
      toast.error(t("messages.errDeleteProduct"))
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <div className="bg-white p-4 rounded ">
      <div className="w-full h-[10rem] flex justify-center items-center">
        <img
          src={data?.productImage?.[0]}
          alt="product"
          className="w-full object-cover h-full"
        />
      </div>
      <h1 className="text-ellipsis line-clamp-2">
        {data.name?.filter((item) => item.language === i18n.language)[0].text}
      </h1>

      <div>
        <p className="font-semibold">{displayINRCurrency(data.price)}</p>

        <button
          className="w-fit block ml-auto p-2 bg-red-300 hover:bg-red-600 rounded-full transition-colors hover:text-white cursor-pointer"
          onClick={() => setconfirmDelete(true)}
          disabled={isDeleting}
        >
          <MdDelete />
        </button>
      </div>

      {/* {editProduct && (
        <AdminEditProduct
          productData={data}
          onClose={() => setEditProduct(false)}
          fetchdata={fetchdata}
        />
      )} */}

      {confirmDelete && (
        <Confirm
          about={t("messages.confirmDeleteProduct")}
          onClose={() => setconfirmDelete(false)}
          onConfirm={() => deleteProduct()}
        />
      )}
    </div>
  );
}

export default AdminProductCard;
