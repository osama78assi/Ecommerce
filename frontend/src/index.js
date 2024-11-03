import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import ProtectedRoute from "./components/ui/ProtectedRoute";
import "./index.css";
import AboutUs from "./pages/AboutUs";
import AdminPanel from "./pages/AdminPanel";
import AllCategories from "./components/admin/AllCategories";
import AllProducts from "./components/admin/AllProducts";
import AllUsers from "./components/admin/AllUsers";
import SliderAdmin from "./components/admin/SliderAdmin";
import VisionAdmin from "./components/admin/VisionAdmin";
import Cart from "./pages/Cart";
import CategoryProduct from "./pages/CategoryProduct";
import ForgotPassowrd from "./pages/ForgotPassowrd";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ProductDetails from "./pages/ProductDetails";
import Profile from "./pages/Profile";
import SearchProduct from "./pages/SearchProduct";
import SignUp from "./pages/SignUp";
import Store from "./pages/Store";
import Vision from "./pages/Vision";
import { store } from "./store/store";
import "./i18next";
import AboutUsAdmin from "./components/admin/AboutUsAdmin";
import GoalsAdmin from "./components/admin/GoalsAdmin";

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
          <Route path="store" element={<Store />} />
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
            <Route path="all-categories" element={<AllCategories />} />
            <Route path="slider" element={<SliderAdmin />} />
            <Route path="vision" element={<VisionAdmin />} />
            <Route path="about-us" element={<AboutUsAdmin />} />
            <Route path="goals" element={<GoalsAdmin />} />
          </Route>
          <Route path="about-us" element={<AboutUs />} />
          <Route path="vision" element={<Vision />} />
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
