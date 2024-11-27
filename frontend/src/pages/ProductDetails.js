import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SummaryApi from "../common";
// import Context from "../context";
// import addToCart from "../helpers/addToCart";
import { createPortal } from "react-dom";
import { useTranslation } from "react-i18next";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import Confirm from "../components/ui/Confirm";
import DisplayImage from "../components/ui/DisplayImage";
import displayINRCurrency from "../helpers/displayCurrency";
import {
  addToCart,
  deleteCartProduct,
  getCartProducts,
} from "../store/cartSlice";

function ProductDetails() {
  const [showConfirm, setShowConfirm] = useState(false);
  const [show, setShow] = useState(false);
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    sellingPrice: "",
  });
  const user = useSelector((state) => state.user.user);
  const [showArrows, setShowArrows] = useState(true);
  const { i18n } = useTranslation();
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const isLoadingCart = useSelector((state) => state.cart.isLoading);
  const { t } = useTranslation();
  const nav = useNavigate();
  const productId = params?.id;
  const isExist = cart.filter(
    (cartItem) => cartItem.productId._id === productId
  ).length;

  function deleteProduct(id) {
    dispatch(deleteCartProduct(id));
  }

  async function fetchProductDetails() {
    try {
      setLoading(true);
      const response = await fetch(SummaryApi.productDetails.url, {
        method: SummaryApi.productDetails.method,
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          productId: productId,
        }),
      });

      const dataReponse = await response.json();

      setData(dataReponse?.data);
    } catch (err) {
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  }

  console.log("data", data);

  function slideRight() {
    setActiveImage(
      (current) =>
        (current + 1 + data.productImage.length) % data.productImage.length
    );
  }

  function slideLeft() {
    setActiveImage(
      (current) =>
        (current - 1 + data.productImage.length) % data.productImage.length
    );
  }

  async function handleAddToCart(e) {
    try {
      e?.stopPropagation();
      e?.preventDefault();

      if (!user) {
        nav("/login/");
        return;
      }

      if (isExist) {
        setShowConfirm(true);
        return;
      }

      dispatch(addToCart(productId));
    } catch (err) {
      console.log(err.message);
    }
  }

  useEffect(() => {
    fetchProductDetails();
  }, [params]);

  useEffect(() => {
    dispatch(getCartProducts());
  }, []);

  return (
    <div className="container mx-auto p-4 lg:mt-[5rem]">
      <div className="min-h-[200px] flex flex-col lg:flex-row gap-4">
        {/***product Image */}
        <div className="lg:h-96 flex flex-col lg:flex-row-reverse gap-4">
          {loading ? (
            <div className="h-[300px] w-[600px] bg-gray-400 animate-pulse" />
          ) : (
            <div
              className="h-[400px] w-full lg:h-[300px] lg:w-[600px] bg-gray-00 relative"
              onMouseEnter={() => setShowArrows(true)}
              onMouseLeave={() => setShowArrows(false)}
            >
              <div
                className={`w-full h-full flex justify-between ${
                  showArrows ? "!visible" : ""
                } invisible absolute`}
              >
                <span
                  className="w-[50px] h-full flex justify-center items-center relative z-[3] backdrop-brightness-75 cursor-pointer"
                  onClick={i18n.language === "ar" ? slideRight : slideLeft}
                >
                  {i18n.language === "ar" ? (
                    <FaAngleRight className="arr-slider text-lg !color-white" />
                  ) : (
                    <FaAngleLeft className="arr-slider text-lg !color-white" />
                  )}
                </span>
                <span
                  className="w-[50px] h-full flex justify-center items-center relative z-[3] backdrop-brightness-75 cursor-pointer"
                  onClick={i18n.language === "ar" ? slideLeft : slideRight}
                >
                  {i18n.language === "ar" ? (
                    <FaAngleLeft className="arr-slider text-lg !color-white" />
                  ) : (
                    <FaAngleRight className="arr-slider text-lg !color-white" />
                  )}
                </span>
              </div>

              <img
                onClick={() => setShow(true)}
                alt="product"
                src={data.productImage[activeImage]}
                className="h-full w-full object-cover mix-blend-multiply cursor-pointer"
              />
            </div>
          )}
        </div>

        {/***product details */}
        {loading ? (
          <div className="grid gap-1 w-full">
            <p className="bg-gray-400 animate-pulse h-6 lg:h-8 w-full rounded-full inline-block"></p>
            <h2 className="h-6 lg:h-8  bg-gray-400 animate-pulse w-full"></h2>
            <p className="bg-gray-400 min-w-[100px] animate-pulse h-6 lg:h-8 w-full"></p>

            <div className="bg-gray-400 h-6 lg:h-8 animate-pulse flex items-center gap-1 w-full"></div>

            <div className="flex items-center gap-2 text-2xl lg:text-3xl font-medium my-1 h-6 lg:h-8 animate-pulse w-full">
              <p className="bg-gray-400 w-full"></p>
              <p className="bg-gray-400 w-full"></p>
            </div>

            <div className="flex items-center gap-3 my-2 w-full">
              <button className="h-6 lg:h-8 bg-gray-400 rounded animate-pulse w-full"></button>
              <button className="h-6 lg:h-8 bg-gray-400 rounded animate-pulse w-full"></button>
            </div>

            <div className="w-full">
              <p className="my-1 h-6 lg:h-8 bg-gray-400 rounded animate-pulse w-full"></p>
              <p className=" bg-gray-400 rounded animate-pulse h-10 lg:h-12 w-full"></p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-1">
            <p className="bg-primary-200 text-[#e59c07] px-2 rounded-full inline-block w-fit">
              {data?.category?.categoryName}
            </p>
            <h2 className="text-2xl lg:text-4xl font-medium">
              {data?.productName}
            </h2>

            <div className="flex items-center gap-2 text-2xl lg:text-3xl font-medium my-1">
              <p className="text-[#e59c07]">
                {displayINRCurrency(data.sellingPrice)}
              </p>
              <p className="text-slate-400 line-through">
                {displayINRCurrency(data.price)}
              </p>
            </div>

            <div className="flex items-center gap-3 my-2">
              <button
                className="border-2 border-[#e59c07] transition-colors rounded px-3 py-1 min-w-[120px] font-medium text-white bg-[#e59c07] hover:text-[#e59c07] hover:bg-white"
                onClick={(e) => handleAddToCart(e, data?._id)}
                disabled={isLoadingCart}
              >
                {isExist ? t("cart.removeFromBtn") : t("cart.addToBtn")}
              </button>
            </div>

            <div>
              <p className="font-medium my-1 text-[#e59c07]">Description : </p>
              <p>{data?.description}</p>
            </div>
          </div>
        )}
      </div>

      {show &&
        createPortal(
          <DisplayImage
            imgUrl={data?.productImage[activeImage]}
            onClose={() => setShow(false)}
          />,
          document.body
        )}

      {showConfirm && (
        <Confirm
          about={t("messages.confirmRemoveFromCart")}
          onClose={() => setShowConfirm(false)}
          onConfirm={() => {
            deleteProduct(productId);
            setShowConfirm(false);
          }}
        />
      )}
    </div>
  );
}

export default ProductDetails;
