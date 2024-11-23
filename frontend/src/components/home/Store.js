import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import SummaryApi from "../../common";
import Card from "../store/Card";
import LoadingCard from "../store/LoadingCard";
import ErrorComponent from "../ui/ErrorComponent";
import HeaderTag from "../ui/HeaderTag";

function Store() {
  const { t } = useTranslation();
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const [err, setErr] = useState("");
  const [products, setProducts] = useState([]);

  async function getProducts() {
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

      const { success, message } = res;
      const { products = [] } = res.data;

      if (success) {
        setProducts(products);
      } else {
        console.log(message);
        toast.error(t("messages.errGetProducts"));
        setErr("something went wrong");
      }
    } catch (err) {
      console.log(err.message);
      setErr("Something went wrong");
    } finally {
      setIsLoadingProducts(false);
    }
  }

  const handleAddToCart = () => {
    alert("Product added to cart!");
  };

  useEffect(() => {
    getProducts();
  }, []);

  if (err) {
    return <ErrorComponent refetchFunction={getProducts} disable={isLoadingProducts} />;
  }

  return (
    <>
      <HeaderTag title={t("headers.store")} />
      <div className="store-container container mx-auto p-8 gap-5 flex flex-wrap" style={{rowGap: "1.5rem"}}>
        {isLoadingProducts ? (
          <LoadingCard />
        ) : !isLoadingProducts && !products.length ? (
          <p>{t("messages.warnNoProducts")}</p>
        ) : (
          products.map((product) => (
            <Card
              key={product._id}
              images={product.productImage}
              name={product.productName}
              price={product.price}
              sellingPrice={product.sellingPrice}
            />
          ))
        )}
      </div>
    </>
  );
}

export default Store;
