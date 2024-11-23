import { useState } from "react";
import { MdDelete } from "react-icons/md";
import { useDispatch } from "react-redux";
import {
  decreaseQty,
  deleteCartProduct,
  increastQty,
} from "../../store/cartSlice";
import displayINRCurrency from "../../helpers/displayCurrency";

function CartItem({ data, quantity }) {
  const dispatch = useDispatch();
  
  function increaseQuantity(id, quantity) {
    dispatch(increastQty({ id, qty: quantity }));
  }

  function decraseQuantity(id, quantity) {
    dispatch(decreaseQty({ id, qty: quantity }));
  }

  function deleteProduct(id) {
    dispatch(deleteCartProduct(id));
  }

  return (
    <div
      key={data + "Add To Cart Loading"}
      className="w-full bg-white h-32 my-2 border border-slate-300  rounded grid grid-cols-[128px,1fr]"
    >
      <div className="w-32 h-32 bg-slate-200">
        <img
          alt="product"
          src={data?.productImage[0]}
          className="w-full h-full mix-blend-multiply object-cover"
        />
      </div>
      <div className="px-4 py-2 relative">
        <div
          className="absolute right-0 text-red-600 rounded-full p-2 hover:bg-red-600 hover:text-white cursor-pointer"
          onClick={() => deleteProduct(data?._id)}
        >
          <MdDelete />
        </div>

        <h2 className="text-lg lg:text-xl text-ellipsis line-clamp-1">
          {data?.productName}
        </h2>
        <p className="capitalize text-slate-500">
          {data?.category?.categoryName}
        </p>
        <div className="flex items-center justify-between">
          <p className="text-red-600 font-medium text-lg">
            {displayINRCurrency(data?.sellingPrice)}
          </p>
          <p className="text-slate-600 font-semibold text-lg">
            {displayINRCurrency(
              data?.sellingPrice * quantity
            )}
          </p>
        </div>
        <div className="flex items-center gap-3 mt-1">
          <button
            className="border border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-6 h-6 flex justify-center items-center rounded "
            onClick={() => decraseQuantity(data._id, quantity)}
          >
            -
          </button>
          <span>{quantity}</span>
          <button
            className="border border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-6 h-6 flex justify-center items-center rounded "
            onClick={() => increaseQuantity(data?._id, quantity)}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartItem;