import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import SummaryApi from "./common";
import Footer from "./components/ui/Footer";
import Header from "./components/ui/Header";
import Context from "./context";
import FullPageLoading from "./pages/FullPageLoading";
import { fetchCurrentUser, setUserDetails } from "./store/userSlice";

function App() {
  const dispatch = useDispatch();
  const isLoadingUser = useSelector((state) => state.user.isLoading);
  const [cartProductCount, setCartProductCount] = useState(0);

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, []);

  const fetchUserDetails = async () => {
    try {
      const dataResponse = await fetch(SummaryApi.current_user.url, {
        method: SummaryApi.current_user.method,
        credentials: "include",
      });

      const dataApi = await dataResponse.json();

      if (dataApi.success) {
        dispatch(setUserDetails(dataApi.data));
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const fetchUserAddToCart = async () => {
    try {
      const dataResponse = await fetch(SummaryApi.addToCartProductCount.url, {
        method: SummaryApi.addToCartProductCount.method,
        credentials: "include",
      });

      const dataApi = await dataResponse.json();

      setCartProductCount(dataApi?.data?.count);
    } catch (err) {
      console.log(err.message);
    }
  };

  if (isLoadingUser) {
    return <FullPageLoading />;
  }

  return (
    <>
      {/* <Context.Provider
        value={{
          fetchUserDetails, // user detail fetch
          cartProductCount, // current user add to cart product count,
          fetchUserAddToCart,
        }}
      > */}
        <ToastContainer position="top-center" />

        <Header />
        <main className="h-[calc(100dvh-120px)] py-6 px-4 overflow-auto">
          <Outlet />
        </main>
        <Footer />
      {/* </Context.Provider> */}
    </>
  );
}

export default App;
