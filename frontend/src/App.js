import { Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Footer from "./components/ui/Footer";
import Header from "./components/ui/Header";
// import Context from "./context";
import { useTranslation } from "react-i18next";
import FullPageLoading from "./pages/FullPageLoading";
import { fetchCurrentUser } from "./store/userSlice";

function App() {
  const dispatch = useDispatch();
  const isLoadingUser = useSelector((state) => state.user.isLoading);
  // const [cartProductCount, setCartProductCount] = useState(0);
  const { i18n } = useTranslation();

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, []);

  // Detects language change and updates HTML lang and dir attributes
  useEffect(() => {
    const currentLanguage = i18n.language;

    // Update the lang and dir attributes on the <html> tag
    document.documentElement.lang = currentLanguage;
    document.documentElement.dir = currentLanguage === "ar" ? "rtl" : "ltr";
  }, [i18n.language]); // Runs on language change

  // const fetchUserDetails = async () => {
  //   try {
  //     const dataResponse = await fetch(SummaryApi.current_user.url, {
  //       method: SummaryApi.current_user.method,
  //       credentials: "include",
  //     });

  //     const dataApi = await dataResponse.json();

  //     if (dataApi.success) {
  //       dispatch(setUserDetails(dataApi.data));
  //     }
  //   } catch (err) {
  //     console.log(err.message);
  //   }
  // };

  // const fetchUserAddToCart = async () => {
  //   try {
  //     const dataResponse = await fetch(SummaryApi.addToCartProductCount.url, {
  //       method: SummaryApi.addToCartProductCount.method,
  //       credentials: "include",
  //     });

  //     const dataApi = await dataResponse.json();

  //     setCartProductCount(dataApi?.data?.count);
  //   } catch (err) {
  //     console.log(err.message);
  //   }
  // };

  if (isLoadingUser) {
    return <FullPageLoading />;
  }

  return (
    <Suspense fallback={<FullPageLoading />}>
      {/* <Context.Provider
        value={{
          fetchUserDetails, // user detail fetch
          cartProductCount, // current user add to cart product count,
          fetchUserAddToCart,
        }}
      > */}
      <ToastContainer position="top-center" />

      <Header />
      <main className="min-h-[calc(100dvh-120px)]">
        <Outlet />
      </main>
      <Footer />
      {/* </Context.Provider> */}
    </Suspense>
  );
}

export default App;
