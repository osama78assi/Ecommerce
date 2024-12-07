import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { RotatingLines } from "react-loader-spinner";
import { useLocation } from "react-router-dom";
import SummaryApi from "../common";
import { Helmet } from "react-helmet";

function SearchProduct() {
  const { t } = useTranslation();
  const query = useLocation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  console.log("query", query.search);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await fetch(SummaryApi.searchProduct.url + query.search);
      const dataResponse = await response.json();
      console.log(dataResponse);
      setLoading(false);

      setData(dataResponse.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [query]);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{t("SEO.titles.search")}</title>
      </Helmet>

      <div className="container mx-auto p-4">
        {loading && <RotatingLines strokeColor="#c89329" />}

        <p className="text-lg font-semibold my-3">
          {`${t("search.results")} ${data?.length}`}
        </p>

        {data?.length === 0 && !loading && (
          <p className="bg-white text-lg text-center p-4">
            {t("search.noData")}
          </p>
        )}
      </div>
    </>
  );
}

export default SearchProduct;
