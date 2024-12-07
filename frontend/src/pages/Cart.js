import React, { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "../components/cart/CartItem";
import LoadingCart from "../components/cart/LoadingCart";
import ErrorComponent from "../components/ui/ErrorComponent";
import displayINRCurrency from "../helpers/displayCurrency";
import { getCartProducts } from "../store/cartSlice";

function Cart() {
  const data = useSelector((state) => state.cart.cart);
  const isLoadingCart = useSelector((state) => state.cart.isLoading);
  const err = useSelector((state) => state.cart.err);
  const [isLoading, setIsLoading] = useState(isLoadingCart);
  const firstLoading = useRef(1);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(getCartProducts());
  }, []);

  // To make the interface stable with loading appear in the top
  useEffect(() => {
    // useEffect runs on the initial render -> firstLaoding = 2 then when the isLoadingCart change firstLoading = 3 and that's it
    if (++firstLoading.current === 3) {
      setIsLoading(false);
    }
  }, [isLoadingCart]);

  const totalQty = data?.reduce(
    (previousValue, currentValue) => previousValue + currentValue.quantity,
    0
  );
  const totalPrice = data?.reduce(
    (preve, curr) => preve + curr.quantity * curr?.productId?.price,
    0
  );

  if (err) {
    return (
      <>
        <Helmet>
          <meta charSet="utf-8" />
          <title>{t("SEO.titles.cart")}</title>
        </Helmet>
        <div className="p-2">
          <ErrorComponent
            refetchFunction={() => dispatch(getCartProducts())}
            disable={isLoadingCart}
          />
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{t("SEO.titles.cart")}</title>
      </Helmet>
      <div className="container mx-auto p-6">
        <div className="text-center text-lg my-3">
          {data?.length === 0 && !isLoading && (
            <p className="bg-white py-5">{t("cart.noData")}</p>
          )}
        </div>

        <div className="flex flex-col lg:flex-row gap-10 lg:justify-between p-4">
          {/***view product */}
          <div className="w-full max-w-3xl">
            {!isLoading &&
              data.map((data) => {
                return (
                  <CartItem data={data.productId} quantity={data.quantity} />
                );
              })}
          </div>

          {/***summary  */}
          <div className="mt-5 lg:mt-0 w-full lg:max-w-sm">
            {!isLoading && (
              <div className="h-36 bg-white sticky top-[5rem]">
                <h2 className="text-white bg-primary-900 px-4 py-1">
                  {t("cart.summary")}
                </h2>
                <div className="flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600">
                  <p>{t("cart.quantity")}</p>
                  <p>{totalQty}</p>
                </div>

                <div className="flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600">
                  <p>{t("cart.totalPrice")}</p>
                  <p>{displayINRCurrency(totalPrice)}</p>
                </div>
              </div>
            )}
          </div>
        </div>
        {isLoadingCart && <LoadingCart />}
      </div>
    </>
  );
}

export default Cart;
