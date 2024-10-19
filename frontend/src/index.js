import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import ProtectedRoute from "./components/ui/ProtectedRoute";
import "./index.css";
import AboutUs from "./pages/AboutUs";
import AdminPanel from "./pages/AdminPanel";
import AllProducts from "./pages/AllProducts";
import AllUsers from "./pages/AllUsers";
import Cart from "./pages/Cart";
import CategoryProduct from "./pages/CategoryProduct";
import ForgotPassowrd from "./pages/ForgotPassowrd";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ProductDetails from "./pages/ProductDetails";
import Profile from "./pages/Profile";
import SearchProduct from "./pages/SearchProduct";
import SignUp from "./pages/SignUp";
import { store } from "./store/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="forgot-password" element={<ForgotPassowrd />} />
          <Route path="sign-up" element={<SignUp />} />
          <Route path="product-category" element={<CategoryProduct />} />
          <Route path="product/:id" element={<ProductDetails />} />
          <Route
            path="cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />
          <Route path="search" element={<SearchProduct />} />
          <Route
            path="admin-panel"
            element={
              <ProtectedRoute forAdmin={true}>
                <AdminPanel />
              </ProtectedRoute>
            }
          >
            <Route path="all-users" element={<AllUsers />} />
            <Route path="all-products" element={<AllProducts />} />
          </Route>
          <Route path="about-us" element={<AboutUs />} />
          <Route
            path="profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>
);
