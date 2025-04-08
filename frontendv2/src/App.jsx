import { Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Footer from "./components/ui/Footer";
import Header from "./components/ui/Header";
// import Context from "./context";
import { useTranslation } from "react-i18next";
import useScrollToTop from "./hooks/useScrollToTop";
import FullPageLoading from "./pages/FullPageLoading";
import { fetchCurrentUser } from "./store/userSlice";

function App() {
  const loc = useLocation();
  const dispatch = useDispatch();
  useScrollToTop();
  const isLoadingUser = useSelector((state) => state.user.isLoading);
  const { i18n } = useTranslation();
  const [renderFooter, setRenderFooter] = useState(false);
  const [bgImage, setBgImage] = useState(false);
  const [paddingTop, setPaddingTop] = useState(false);

  useEffect(() => {
    dispatch(fetchCurrentUser());
    if (i18n.language === "en-US") {
      i18n.changeLanguage("en");
    }
  }, []);

  // Detects language change and updates HTML lang and dir attributes
  useEffect(() => {
    const currentLanguage = i18n.language;

    // Update the lang and dir attributes on the <html> tag
    document.documentElement.lang = currentLanguage;
    document.documentElement.dir = currentLanguage === "ar" ? "rtl" : "ltr";
  }, [i18n.language]); // Runs on language change

  useEffect(() => {
    if (
      loc &&
      loc.pathname.search(/(admin-panel|profile|store|search)/) !== -1
    ) {
      setRenderFooter(false);
    } else {
      setRenderFooter(true);
    }

    // Exclude the pages where we don't want the background iamge
    if (
      loc &&
      loc.pathname.search(/(profile|store|admin-panel|cart|product|search)/) ===
        -1
    ) {
      setBgImage(true);
      if (loc.pathname.search(/(about-us|vision)/) !== -1) {
        setPaddingTop(true);
      } else {
        setPaddingTop(false);
      }
    } else {
      setBgImage(false);
    }
  }, [loc]);

  if (isLoadingUser) {
    return <FullPageLoading />;
  }

  return (
    <Suspense fallback={<FullPageLoading />}>
      <ToastContainer position="top-center" />

      <Header />
      <main
        className={`${
          renderFooter ? "main-with-footer" : "main-without-footer"
        } ${bgImage ? "main-section" : ""}`}
        {...(bgImage
          ? {
              style: {
                paddingBottom: "1rem",
                paddingTop: `${paddingTop ? "1rem" : ""}`,
              },
            }
          : {})}
      >
        <Outlet />
      </main>
      {renderFooter && <Footer />}
    </Suspense>
  );
}

export default App;
