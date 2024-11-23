import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import SummaryApi from "../common";
import Card from "../components/store/Card";
import LoadingCard from "../components/store/LoadingCard";
import ErrorComponent from "../components/ui/ErrorComponent";

function Store() {
  const { t, i18n } = useTranslation();

  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [categories, setCategories] = useState([]);
  const [err, setErr] = useState("");

  const [searchParams, setSearchParams] = useSearchParams();
  const page =
    searchParams.get("page") !== null ? +searchParams.get("page") : 1;
  const selectedCategory =
    searchParams.get("filterBy") !== null ? searchParams.get("filterBy") : "";

  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const [pagesCount, setPagesCount] = useState(null);
  const [products, setProducts] = useState([]);

  // Fetch products
  const getProducts = useCallback(
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
            page,
            category: categories.filter(
              (category) => category.categoryName === selectedCategory
            )._id,
          }),
        });
        const res = await req.json();

        const { success, message } = res;

        if (success) {
          const { totalPages, products } = res.data;
          setProducts(products);
          setPagesCount(totalPages === 0 ? 1 : totalPages);
        } else {
          console.log(message);
          toast.error(t("messages.errGetProducts"));
          setErr("Something went wrong");
        }
      } catch (err) {
        console.log(err.message);
        setErr("Something went wrong");
      } finally {
        setIsLoadingProducts(false);
      }
    },
    [page, selectedCategory]
  );

  async function getCategories() {
    try {
      setErr("");
      setIsLoadingCategories(true);
      const req = await fetch(SummaryApi.getAllCategories.url, {
        method: SummaryApi.getAllCategories.method,
      });
      const { data, error, message } = await req.json();

      if (!error) {
        setCategories(data);
      } else {
        toast.error(t("message.errGetCategories"));
        console.log(message);
        setErr("Something went wrong");
      }

      // Check if the selected category is exist in the first palce
      if (
        selectedCategory &&
        !data.filter((category) => category.categoryName === selectedCategory)
          .length
      ) {
        toast.error(
          t("messages.errCategoryNotFound", {
            category: selectedCategory,
          })
        );
        searchParams.delete("filterBy");
        setSearchParams(searchParams);
      }

      console.log(data);
    } catch (err) {
      setErr("Something went wrong");
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
                      value={category.categoryName}
                      selected={category.categoryName === selectedCategory}
                    >
                      {category.categoryName}
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
          ) : (
            products.map((product) => (
              <Card
                id={product._id}
                key={product._id}
                images={product.productImage}
                name={product.productName}
                price={product.price}
                sellingPrice={product.sellingPrice}
              />
            ))
          )}
        </div>

        <div className="flex justify-between items-center mx-auto max-w-[450px] flex-wrap gap-2 py-2">
          {pagesCount === null ? (
            <div className="flex items-center rounded-lg bg-gray-400 h-10 w-[8rem] animate-pulse text-white p-2" />
          ) : (
            <button
              onClick={() =>
                i18n.language === "en" ? setPrevPage() : setNextPage()
              }
              className="flex items-center rounded-lg bg-primary-900 text-white p-2 hover:bg-primary-700"
            >
              {i18n.language === "en" ? <FaAngleLeft /> : <FaAngleRight />}
              <span>{t("store.prev")}</span>
            </button>
          )}

          <div className="flex justify-between gap-2">
            {pagesCount === null ? (
              <>
                <span className="bg-gray-400 animate-pulse text-white p-2 border-gray-400 rounded-lg border-2 cursor-pointer h-10 w-10" />
                <span className="bg-gray-400 animate-pulse text-white p-2 border-gray-400 rounded-lg border-2 cursor-pointer h-10 w-10" />
                <span className="bg-gray-400 animate-pulse text-white p-2 border-gray-400 rounded-lg border-2 cursor-pointer h-10 w-10" />
              </>
            ) : (
              <>
                <span
                  className="bg-primary-900 text-white p-2 border-gray-400 rounded-lg border-2 cursor-pointer"
                  onClick={() => setCustomPage(1)}
                >
                  {1}
                </span>
                {page + 1 < pagesCount && (
                  <span
                    className="bg-primary-900 text-white p-2 border-gray-400 rounded-lg border-2 cursor-pointer"
                    onClick={() => setCustomPage(page + 1)}
                  >
                    {page + 1}
                  </span>
                )}
                {page + 2 < pagesCount && (
                  <span
                    className="bg-primary-900 text-white p-2 border-gray-400 rounded-lg border-2 cursor-pointer"
                    onClick={() => setCustomPage(page + 1)}
                  >
                    {page + 2}
                  </span>
                )}
                <span>...</span>
                <span
                  className="bg-primary-900 text-white p-2 border-gray-400 rounded-lg border-2 cursor-pointer"
                  onClick={() => setCustomPage(pagesCount)}
                >
                  {pagesCount}
                </span>
              </>
            )}
          </div>

          {pagesCount === null ? (
            <div className="flex items-center rounded-lg bg-gray-400 h-10 w-[8rem] animate-pulse text-white p-2" />
          ) : (
            <button
              onClick={() =>
                i18n.language === "en" ? setNextPage() : setPrevPage()
              }
              className="flex items-center rounded-lg bg-primary-900 text-white p-2 hover:bg-primary-700"
            >
              <span>{t("store.next")}</span>
              {i18n.language === "en" ? <FaAngleRight /> : <FaAngleLeft />}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Store;
