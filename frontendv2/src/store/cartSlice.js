import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import SummaryApi from "../common";
import i18react from "../i18next";

const { t } = i18react;
const initialState = {
  count: 0,
  cart: [],
  isLoading: true,
  err: false
};

// This reducers must run when there is a logged in user
export const getCartCount = createAsyncThunk(
  "cart/getCount",
  async function () {
    try {
      const dataResponse = await fetch(SummaryApi.addToCartProductCount.url, {
        method: SummaryApi.addToCartProductCount.method,
        credentials: "include",
      });

      const dataApi = await dataResponse.json();

      if (dataApi.success) return dataApi?.data?.count;
      else throw new Error("something went wrong");
    } catch (err) {
      console.log(err.message);
    }
  }
);

export const deleteCartProduct = createAsyncThunk(
  "cart/deleteProduct",
  async function (id, thunkAPI) {
    try {
      const response = await fetch(SummaryApi.deleteCartProduct.url, {
        method: SummaryApi.deleteCartProduct.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          _id: id,
        }),
      });
      const responseData = await response.json();
      if (responseData.success) {
        // Get the products and the count of its items
        thunkAPI.dispatch(getCartProducts());
        thunkAPI.dispatch(getCartCount());
      } else {
        throw new Error("something went wrong");
      }
    } catch (err) {
      console.log(err.message);
    }
  }
);

export const getCartProducts = createAsyncThunk(
  "cart/getCardsProducts",
  async function () {
    try {
      const response = await fetch(SummaryApi.addToCartProductView.url, {
        method: SummaryApi.addToCartProductView.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
      });

      const responseData = await response.json();

      if (responseData.success) {
        return responseData.data;
      } else {
        throw new Error("Something went wrong");
      }
    } catch (err) {
      console.log(err.message);
    }
  }
);

export const increastQty = createAsyncThunk(
  "cart/increaseQty",
  async function ({ id, qty }, thunkAPI) {
    try {
      const response = await fetch(SummaryApi.updateCartProduct.url, {
        method: SummaryApi.updateCartProduct.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          _id: id,
          quantity: qty + 1,
        }),
      });

      const responseData = await response.json();

      if (responseData.success) {
        thunkAPI.dispatch(getCartProducts());
      } else {
        throw new Error("Something went wrong");
      }
    } catch (err) {
      console.log(err.message);
    }
  }
);

export const decreaseQty = createAsyncThunk(
  "cart/decreaseQty",
  async function ({ id, qty }, thunkAPI) {
    try {
      if (qty >= 2) {
        const response = await fetch(SummaryApi.updateCartProduct.url, {
          method: SummaryApi.updateCartProduct.method,
          credentials: "include",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            _id: id,
            quantity: qty - 1,
          }),
        });

        const responseData = await response.json();

        if (responseData.success) {
          thunkAPI.dispatch(getCartProducts());
        } else {
          throw new Error("Something went wrong");
        }
      }
    } catch (err) {
      console.log(err.message);
    }
  }
);

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async function (id, thunkAPI) {
    try {
      const response = await fetch(SummaryApi.addToCartProduct.url, {
        method: SummaryApi.addToCartProduct.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ productId: id }),
      });

      const responseData = await response.json();

      if (responseData.success) {
        thunkAPI.dispatch(getCartProducts());
        thunkAPI.dispatch(getCartCount());
        toast.success(t("messages.successAddToCart"));
      }

      if (responseData.error) {
        throw new Error("Somethin went wrong");
      }

      return responseData;
    } catch (err) {
      throw new Error("Couldn't add the item to the cart");
    }
  }
);

const slice = createSlice({
  initialState,
  name: "cart",
  extraReducers(builder) {
    // Get Count
    builder.addCase(getCartCount.pending, function (state) {
      state.isLoading = true;
    });
    builder.addCase(getCartCount.fulfilled, function (state, action) {
      state.count = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getCartCount.rejected, function (state) {
      toast.error(t("messages.errCartCount"));
      state.isLoading = false;
    });

    // Get Products
    builder.addCase(getCartProducts.pending, function (state) {
      state.err = false;
      state.isLoading = true;
    });
    builder.addCase(getCartProducts.fulfilled, function (state, action) {
      state.cart = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getCartProducts.rejected, function (state) {
      toast.error(t("messages.errGetCartProducts"));
      state.err = true;
      state.isLoading = false;
    });

    // Add To Cart
    builder.addCase(addToCart.pending, function (state) {
      state.isLoading = false;
    });
    builder.addCase(addToCart.fulfilled, function (state) {
      state.isLoading = false;
    });
    builder.addCase(addToCart.rejected, function (state, action) {
      state.isLoading = false;
      console.log(action.error.message);
      toast.error(t("messages.errAddItemToCart"));
    });

    // Delete product
    builder.addCase(deleteCartProduct.pending, function (state) {
      state.isLoading = true;
    });
    builder.addCase(deleteCartProduct.fulfilled, function (state) {
      state.isLoading = false;
      // The cart will be dynamically update by calling another reducer above
      toast.success(t("messages.successRemoveFromCart"));
    });
    builder.addCase(deleteCartProduct.rejected, function (state) {
      state.isLoading = false;
      toast.error(t("messages.errDeleteCartItem"));
      toast.success(t("messages.errDeleteCartItem"));
    });

    // Increase quantity
    builder.addCase(increastQty.pending, function (state) {
      state.isLoading = true;
    });
    builder.addCase(increastQty.fulfilled, function (state) {
      state.isLoading = false;
    });
    builder.addCase(increastQty.rejected, function (state) {
      state.isLoading = false;
      toast.error(t("messages.errUpdateQuantity"));
    });

    // Decrease quantity
    builder.addCase(decreaseQty.pending, function (state) {
      state.isLoading = true;
    });
    builder.addCase(decreaseQty.fulfilled, function (state) {
      state.isLoading = false;
    });
    builder.addCase(decreaseQty.rejected, function (state) {
      state.isLoading = false;
      toast.error(t("messages.errUpdateQuantity"));
    });
  },
});

export default slice.reducer;
