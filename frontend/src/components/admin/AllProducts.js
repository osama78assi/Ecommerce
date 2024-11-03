import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import SummaryApi from "../../common";
import AdminProductCard from "./AdminProductCard";
import Upload from "./Upload";
import UploadProduct from "./UploadProduct";

const AllProducts = () => {
  const { t } = useTranslation();
  const [openUploadProduct, setOpenUploadProduct] = useState(false);
  const [allProduct, setAllProduct] = useState([]);

  const fetchAllProduct = async () => {
    try {
      const response = await fetch(SummaryApi.allProduct.url);
      const dataResponse = await response.json();

      console.log("product data", dataResponse);

      setAllProduct(dataResponse?.data || []);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchAllProduct();
  }, []);

  return (
    <div>
      <Upload
        title={t("forms.admin.uploadProductTitle")}
        buttonTitle={t("forms.admin.uploadBtnProductOpen")}
        hanldeClick={() => setOpenUploadProduct(true)}
      />
      {/**all product */}
      <div className="flex items-center flex-wrap gap-5 py-4 h-[calc(100vh-190px)] overflow-y-auto">
        {allProduct.map((product, index) => {
          return (
            <AdminProductCard
              data={product}
              key={index + "allProduct"}
              fetchdata={fetchAllProduct}
            />
          );
        })}
      </div>

      {/**upload prouct component */}
      {openUploadProduct && (
        <UploadProduct
          onClose={() => setOpenUploadProduct(false)}
          fetchData={fetchAllProduct}
        />
      )}
    </div>
  );
};

export default AllProducts;
