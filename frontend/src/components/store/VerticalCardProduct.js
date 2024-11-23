import React, { useEffect, useRef, useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
// import Context from "../../context";
// import addToCart from "../../helpers/addToCart";
import { useDispatch, useSelector } from "react-redux";
import displayINRCurrency from "../../helpers/displayCurrency";
import fetchCategoryWiseProduct from "../../helpers/fetchCategoryWiseProduct";
import { addToCart } from "../../store/cartSlice";
import VerticalCartProductLoading from "./VerticalCartProductLoading";

const VerticalCardProduct = ({ category, heading }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const isLoadingCart = useSelector((state) => state.cart.isLoading);

  const [scroll, setScroll] = useState(0);
  const scrollElement = useRef();

  // const { fetchUserAddToCart } = useContext(Context);

  const handleAddToCart = async (e, id) => {
    try {
      // await addToCart(e, id);
      // fetchUserAddToCart();
      e?.stopPropagation();
      e?.preventDefault();
      dispatch(addToCart(id));
    } catch (err) {
      console.log(err.message);
    }
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const categoryProduct = await fetchCategoryWiseProduct(category);

      console.log("horizontal data", categoryProduct.data);
      setData(categoryProduct?.data);
    } catch (err) {
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const scrollRight = () => {
    scrollElement.current.scrollLeft += 300;
  };
  const scrollLeft = () => {
    scrollElement.current.scrollLeft -= 300;
  };

  return (
    <div className="container mx-auto px-4 my-6 relative">
      <h2 className="text-2xl font-semibold py-4">{heading}</h2>

      <div
        className="flex items-center gap-4 md:gap-6 overflow-x-scroll scrollbar-none transition-all"
        ref={scrollElement}
      >
        <button
          className="bg-white shadow-md rounded-full p-1 absolute left-0 text-lg hidden md:block"
          onClick={scrollLeft}
        >
          <FaAngleLeft />
        </button>
        <button
          className="bg-white shadow-md rounded-full p-1 absolute right-0 text-lg hidden md:block"
          onClick={scrollRight}
        >
          <FaAngleRight />
        </button>

        {loading ? (
          <VerticalCartProductLoading />
        ) : (
          data?.map((product, index) => {
            return (
              <Link
                to={"product/" + product?._id}
                className="w-full min-w-[280px]  md:min-w-[320px] max-w-[280px] md:max-w-[320px]  bg-white rounded-sm shadow "
              >
                <div className="bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center">
                  <img
                    alt={`product-${product?._id}`}
                    src={product.productImage[0]}
                    className="object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply"
                  />
                </div>
                <div className="p-4 grid gap-3">
                  <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black">
                    {product?.productName}
                  </h2>
                  <p className="capitalize text-slate-500">
                    {product?.category}
                  </p>
                  <div className="flex gap-3">
                    <p className="text-red-600 font-medium">
                      {displayINRCurrency(product?.sellingPrice)}
                    </p>
                    <p className="text-slate-500 line-through">
                      {displayINRCurrency(product?.price)}
                    </p>
                  </div>
                  <button
                    className="text-sm bg-red-600 hover:bg-red-700 text-white px-3 py-0.5 rounded-full"
                    onClick={(e) => handleAddToCart(e, product?._id)}
                    disabled={isLoadingCart}
                  >
                    Add to Cart
                  </button>
                </div>
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
};

export default VerticalCardProduct;