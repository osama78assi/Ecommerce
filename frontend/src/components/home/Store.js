import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import SummaryApi from "../../common";
import { getCartProducts } from "../../store/cartSlice";
import Card from "../store/Card";
import LoadingCard from "../store/LoadingCard";
import ErrorComponent from "../ui/ErrorComponent";
import HeaderTag from "../ui/HeaderTag";

function Store() {
  const { t } = useTranslation();
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const [err, setErr] = useState("");
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);

  const getProducts = useCallback(async function getProducts() {
    try {
      setErr("");
      setIsLoadingProducts(true);
      const req = await fetch(SummaryApi.getAllProducts.url, {
        method: SummaryApi.getAllProducts.method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          page: 1,
          limit: 5,
        }),
      });
      const res = await req.json();

      const { success } = res;
      const { products = [] } = res.data;

      if (success) {
        setProducts(products);
      } else {
        toast.error(t("messages.errGetProducts"));
        setErr("something went wrong");
        throw new Error("Something went wrong")
      }
    } catch (err) {
      console.log(err.message);
      setErr("Something went wrong");
    } finally {
      setIsLoadingProducts(false);
    }
  }, [])

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  useEffect(() => {
    dispatch(getCartProducts());
  }, []);

  if (err) {
    return (
      <ErrorComponent
        refetchFunction={getProducts}
        disable={isLoadingProducts}
      />
    );
  }

  return (
    <>
      <HeaderTag title={t("headers.store")} />
      <div
        className="store-container container w-[95%] mx-auto py-8 px-3 gap-5 flex flex-wrap bg-white rounded-lg section-box-shadow"
        style={{ rowGap: "1.5rem" }}
      >
        {isLoadingProducts ? (
          <LoadingCard />
        ) : !isLoadingProducts && !products.length ? (
          <p className="bg-slate-300 text-gray-800 p-3 text-xl rounded-lg mx-auto">{t("messages.warnNoProducts")}</p>
        ) : (
          products.map((product) => (
            <Card
              id={product._id}
              key={product._id}
              images={product.productImage}
              name={product.name}
              price={product.price}
            />
          ))
        )}
      </div>
    </>
  );
}

export default Store;
