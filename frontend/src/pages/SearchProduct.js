import React, { useCallback, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { RotatingLines } from "react-loader-spinner";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import SummaryApi from "../common";
import Card from "../components/store/Card";
import ErrorComponent from "../components/ui/ErrorComponent";
import { getCartProducts } from "../store/cartSlice";

function SearchProduct() {
  const { t } = useTranslation();
  const query = useLocation();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState(false);
  const dispatch = useDispatch();

  const fetchProducts = useCallback(async () => {
    try {
      setErr(false);
      setIsLoading(true);
      const response = await fetch(SummaryApi.searchProduct.url + query.search);
      const dataResponse = await response.json();
      setIsLoading(false);

      setData(dataResponse.data);
    } catch (err) {
      console.log(err.message);
      setErr(true);
    }
  }, [query.search]);

  useEffect(() => {
    fetchProducts();
  }, [query, fetchProducts]);

  useEffect(() => {
    dispatch(getCartProducts());
  }, []);

  if (isLoading) {
    return (
      <>
        <Helmet>
          <meta charSet="utf-8" />
          <title>{t("SEO.titles.search")}</title>
        </Helmet>
        <div className="w-fit mx-auto p-[3rem]">
          {isLoading && <RotatingLines strokeColor="#c89329" />}
        </div>
      </>
    );
  }

  if (err) {
    return (
      <>
        <Helmet>
          <meta charSet="utf-8" />
          <title>{t("SEO.titles.search")}</title>
        </Helmet>

        <div className="container mx-auto p-4">
          <ErrorComponent
            refetchFunction={() => fetchProducts()}
            disable={isLoading}
          />
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{t("SEO.titles.search")}</title>
      </Helmet>

      <div className="container mx-auto p-4">
        <p className="text-lg font-semibold my-3">
          {`${t("search.results")} ${data?.length}`}
        </p>

        {data.length === 0 && (
          <p className="bg-white text-lg text-center p-4">
            {t("search.noData")}
          </p>
        )}
      </div>

      <div className="store-container container mx-auto py-8 gap-[1rem] md:gap flex flex-wrap px-3">
        {data.map((product) => (
          <Card
            id={product._id}
            key={product._id}
            images={product.productImage}
            name={product.name}
            price={product.price}
          />
        ))}
      </div>
    </>
  );
}

export default SearchProduct;
