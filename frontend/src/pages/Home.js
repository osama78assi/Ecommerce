import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import Goals from "../components/home/Goals";
import HeaderSlider from "../components/home/HeaderSlider";
import Store from "../components/home/Store";
import VideoSection from "../components/home/VideoSection";
import ErrorComponent from "../components/ui/ErrorComponent";

function Home() {
  const [err, setErr] = useState();
  const { t } = useTranslation();

  function reloadPage() {
    window.location.reload();
  }

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content="Al-s" />
        <title>{t("SEO.titles.home")}</title>
      </Helmet>

      <div>
        {err ? (
          <ErrorComponent refetchFunction={reloadPage} />
        ) : (
          <>
            <HeaderSlider setErr={setErr} />
            <VideoSection />
            <Goals setErr={setErr} />
            <Store />
          </>
        )}
      </div>
    </>
  );
}

export default Home;
