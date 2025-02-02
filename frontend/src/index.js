import React, { lazy } from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import ProtectedRoute from "./components/ui/ProtectedRoute";
import "./i18next";
import "./index.css";
import { store } from "./store/store";

const AllCategories = lazy(() => import("./components/admin/AllCategories"));
const AllProducts = lazy(() => import("./components/admin/AllProducts"));
const AllUsers = lazy(() => import("./components/admin/AllUsers"));
const GoalsAdmin = lazy(() => import("./components/admin/GoalsAdmin"));
const SliderAdmin = lazy(() => import("./components/admin/SliderAdmin"));
const VisionAdmin = lazy(() => import("./components/admin/VisionAdmin"));
const AboutUs = lazy(() => import("./pages/AboutUs"));
const AdminPanel = lazy(() => import("./pages/AdminPanel"));
const Cart = lazy(() => import("./pages/Cart"));
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const ProductDetails = lazy(() => import("./pages/ProductDetails"));
const Profile = lazy(() => import("./pages/Profile"));
const SearchProduct = lazy(() => import("./pages/SearchProduct"));
const SignUp = lazy(() => import("./pages/SignUp"));
const Store = lazy(() => import("./pages/Store"));
const Vision = lazy(() => import("./pages/Vision"));
const AboutUsAdmin = lazy(() => import("./components/admin/AboutUsAdmin"));

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter basename="sakhrasyria.github.io/sakhrasyria/">
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="" element={<Home />} />
          <Route
            path="login"
            element={
              <ProtectedRoute>
                <Login />
              </ProtectedRoute>
            }
          />
          <Route
            path="sign-up"
            element={
              <ProtectedRoute>
                <SignUp />
              </ProtectedRoute>
            }
          />
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
