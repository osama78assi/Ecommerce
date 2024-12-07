import { useCallback, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import SummaryApi from "../common";
import Card from "../components/store/Card";
import LoadingCard from "../components/store/LoadingCard";
import ErrorComponent from "../components/ui/ErrorComponent";
import Pagination from "../components/ui/Pagination";
import { getCartProducts } from "../store/cartSlice";

function Store() {
  const { t, i18n } = useTranslation();
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [categories, setCategories] = useState([]);
  const [err, setErr] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const page =
    searchParams.get("page") !== null ? +searchParams.get("page") : 1;
  const selectedCategory =
    searchParams.get("filterBy") !== null ? searchParams.get("filterBy") : "";

  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const [pagesCount, setPagesCount] = useState(null);
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();

  // Fetch products
  const getProducts = useCallback(
    async function getProducts() {
      try {
        setErr(false);
        setIsLoadingProducts(true);
        const req = await fetch(SummaryApi.getAllProducts.url, {
          method: SummaryApi.getAllProducts.method,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            page,
            category: selectedCategory,
          }),
        });
        const res = await req.json();

        const { success, message } = res;

        if (success) {
          const { totalPages, products } = res.data;
          setProducts(products);
          setPagesCount(totalPages);
        } else {
          console.log(message);
          toast.error(t("messages.errGetProducts"));
          throw new Error("Something went wrong");
        }
      } catch (err) {
        console.log(err.message);
        setErr(true);
      } finally {
        setIsLoadingProducts(false);
      }
    },
    [page, selectedCategory]
  );

  async function getCategories() {
    try {
      setErr(false);
      setIsLoadingCategories(true);
      const req = await fetch(SummaryApi.getAllCategories.url, {
        method: SummaryApi.getAllCategories.method,
      });
      const { data, error, message } = await req.json();

      if (!error) {
        setCategories(data);
      } else {
        toast.error(t("messages.errGetCategories"));
        console.log(message);
        throw new Error("Something went wrong");
      }

      // Check if the selected category is exist in the first palce
      if (
        selectedCategory &&
        !data.filter((category) => category._id === selectedCategory).length
      ) {
        toast.error(t("messages.errCategoryNotFound"));
        searchParams.delete("filterBy");
        setSearchParams(searchParams);
      }
    } catch (err) {
      setErr(true);
      console.log(err.message);
    } finally {
      setIsLoadingCategories(false);
    }
  }

  // Fetch categories
  useEffect(() => {
    getCategories();
  }, []);

  // Fetch products
  useEffect(() => {
    console.log("I will fetch By ", selectedCategory);
    getProducts();
  }, [selectedCategory, page, getProducts]);

  useEffect(() => {
    dispatch(getCartProducts());
  }, []);

  function handleFilter(filterBy) {
    if (filterBy === "") {
      searchParams.delete("filterBy");
      setSearchParams(searchParams);
      return;
    }

    searchParams.set("filterBy", filterBy);
    setSearchParams(searchParams);
  }

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

  if (err) {
    return (
      <ErrorComponent
        disable={isLoadingCategories || isLoadingProducts}
        refetchFunction={() => {
          getCategories();
          getProducts();
        }}
      />
    );
  }

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{t("SEO.titles.store")}</title>
      </Helmet>
      <div className="container mx-auto space-y-3">
        <div className="bg-slate-50 mx-auto items-center pt-2">
          <div className="flex py-4 px-2 gap-4 items-center">
            <h2 className="text-xl">{t("store.filterCategoryTitle")}</h2>
            {isLoadingCategories ? (
              <div className="bg-gray-500 animate-pulse h-10 w-40 rounded-lg" />
            ) : (
              <select
                onChange={(e) => handleFilter(e.target.value)}
                className="p-2 border-2 h-10 border-[var(--primary-color-900)] rounded-lg focus-within:focus:focus-visible:outline-none"
              >
                <option value="">{t("store.categorySelect")}</option>
                {categories.length
                  ? categories.map((category) => (
                      <option
                        key={category._id}
                        value={category._id}
                        selected={category._id === selectedCategory}
                      >
                        {
                          category.categoryName.filter(
                            (val) => val.language === i18n.language
                          )[0].text
                        }
                      </option>
                    ))
                  : null}
              </select>
            )}
          </div>

          <div
            className="store-container container mx-auto py-8 gap-[1rem] md:gap flex flex-wrap"
            style={{ rowGap: "1.5rem" }}
          >
            {isLoadingProducts ? (
              <>
                <LoadingCard />
                <LoadingCard />
                <LoadingCard />
                <LoadingCard />
                <LoadingCard />
                <LoadingCard />
                <LoadingCard />
                <LoadingCard />
                <LoadingCard />
                <LoadingCard />
              </>
            ) : !isLoadingProducts && !products.length ? (
              <p className="bg-slate-300 text-gray-800 p-3 text-xl rounded-lg mx-auto">
                {t("messages.warnNoProducts")}
              </p>
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

          <Pagination
            page={page}
            pagesCount={pagesCount}
            setNextPage={setNextPage}
            setPrevPage={setPrevPage}
            setCustomPage={setCustomPage}
          />
        </div>
      </div>
    </>
  );
}

export default Store;
