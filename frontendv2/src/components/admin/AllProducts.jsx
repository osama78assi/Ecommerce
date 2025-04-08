import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { RotatingLines } from "react-loader-spinner";
import { useSearchParams } from "react-router-dom";
import SummaryApi from "../../common";
import EmptyData from "../ui/EmptyData";
import ErrorComponent from "../ui/ErrorComponent";
import Pagination from "../ui/Pagination";
import AdminProductCard from "./AdminProductCard";
import Upload from "./Upload";
import UploadProduct from "./UploadProduct";

const AllProducts = () => {
  const { t } = useTranslation();
  const [pagesCount, setPagesCount] = useState(null);
  const [openUploadProduct, setOpenUploadProduct] = useState(false);
  const [allProduct, setAllProduct] = useState([]);
  const [err, setErr] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const page =
    searchParams.get("page") !== null ? +searchParams.get("page") : 1;

  const fetchAllProducts = useCallback(async () => {
    try {
      setIsLoading(true);
      setErr(false);
      const req = await fetch(SummaryApi.getAllProducts.url, {
        method: SummaryApi.getAllProducts.method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ page }),
      });
      const res = await req.json();

      if (res.success) {
        const { totalPages, products } = res.data;
        setAllProduct(products || []);
        setPagesCount(totalPages);
      } else {
        throw new Error("Something went wrong");
      }
    } catch (err) {
      setErr(true);
      console.log(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchAllProducts();
  }, [fetchAllProducts]);

  useEffect(() => {
    fetchAllProducts();
  }, [page, fetchAllProducts]);

  function setNextPage() {
    if (page === pagesCount) {
      return;
    }
    searchParams.set("page", page + 1);
    setSearchParams(searchParams);
  }

  function setPrevPage() {
    if (page === 1) {
      return;
    }

    searchParams.set("page", page - 1);
    setSearchParams(searchParams);
  }

  function setCustomPage(page) {
    searchParams.set("page", page);
    setSearchParams(searchParams);
  }

  if (isLoading) {
    return (
      <div className="w-full mt-5 p-2 flex justify-center items-center">
        <RotatingLines strokeColor="#c89329" />
      </div>
    );
  }

  if (err) {
    return (
      <ErrorComponent refetchFunction={fetchAllProducts} disable={isLoading} />
    );
  }

  return (
    <div>
      <Upload
        title={t("forms.admin.uploadProductTitle")}
        buttonTitle={t("forms.admin.uploadBtnProductOpen")}
        hanldeClick={() => setOpenUploadProduct(true)}
      />

      {allProduct.length ? (
        <div className="h-[calc(100vh-190px)] overflow-y-auto">
          <div className="grid grid-cols-3 gap-5 py-4 ">
            {allProduct.map((product, index) => {
              return (
                <AdminProductCard
                  data={product}
                  key={index + "allProduct"}
                  fetchData={fetchAllProducts}
                />
              );
            })}
          </div>

          <Pagination
            page={page}
            pagesCount={pagesCount}
            setNextPage={setNextPage}
            setPrevPage={setPrevPage}
            setCustomPage={setCustomPage}
          />
        </div>
      ) : (
        <EmptyData />
      )}

      {/**upload prouct component */}
      {openUploadProduct && (
        <UploadProduct
          onClose={() => setOpenUploadProduct(false)}
          fetchData={fetchAllProducts}
        />
      )}
    </div>
  );
};

export default AllProducts;
