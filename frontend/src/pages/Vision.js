import { useCallback, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { RotatingLines } from "react-loader-spinner";
import { toast } from "react-toastify";
import SummaryApi from "../common";
import EmptyData from "../components/ui/EmptyData";
import ErrorComponent from "../components/ui/ErrorComponent";
import Slider from "../components/vision/Slider";
import VisionSection from "../components/vision/VisionSection";

function VisionPage() {
  const { t, i18n } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);
  const [err, setErr] = useState(false);
  const [data, setData] = useState([]);
  const imgs = data.map((item) => item.image).filter((url) => url !== "");

  const getData = useCallback(async function getData() {
    try {
      setErr(false);
      setIsLoading(true);
      const req = await fetch(SummaryApi.getVisionData.url, {
        method: SummaryApi.getVisionData.method,
      });

      const res = await req.json();
      if (res.success) {
        setData(res.data);
      } else {
        throw new Error(res.message);
      }
    } catch (err) {
      console.log(err.message);
      setErr(true);
      toast.error(t("messages.errGetVision"));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  if (isLoading) {
    return (
      <>
        <Helmet>
          <meta charSet="utf-8" />
          <title>{t("SEO.titles.vision")}</title>
        </Helmet>
        <div className="py-12">
          <div className="flex flex-col items-center gap-8 p-6 max-w-4xl mx-auto">
            <RotatingLines strokeColor="#c89329" />
          </div>
        </div>
      </>
    );
  }

  if (err) {
    return (
      <>
        <Helmet>
          <meta charSet="utf-8" />
          <title>{t("SEO.titles.vision")}</title>
        </Helmet>
        <div className="py-12">
          <ErrorComponent refetchFunction={getData} disable={isLoading} />
        </div>
      </>
    );
  }

  if (!isLoading && !data.length) {
    return (
      <>
        <Helmet>
          <meta charSet="utf-8" />
          <title>{t("SEO.titles.vision")}</title>
        </Helmet>
        <EmptyData />;
      </>
    );
  }

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{t("SEO.titles.vision")}</title>
      </Helmet>
      <div className="py-12">
        <div className="flex flex-col items-center gap-8 p-6 max-w-4xl mx-auto">
          {isLoading ? (
            <RotatingLines strokeColor="#c89329" />
          ) : (
            <>
              <Slider imgs={imgs} />

              <div className="space-y-8 w-full relative before:content-[''] before:absolute before:left-0 before:top-0 before:h-full before:w-[2px] before:bg-slate-600">
                {data.map((ele) => (
                  <VisionSection
                    key={ele._id}
                    title={
                      ele.title?.filter(
                        (item) => item.language === i18n.language
                      )[0].text
                    }
                    description={
                      ele.description?.filter(
                        (item) => item.language === i18n.language
                      )[0].text
                    }
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default VisionPage;
