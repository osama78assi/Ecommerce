import { useCallback, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import SummaryApi from "../common";
import ImagesPart from "../components/about-us/ImagesPart";
import TextPart from "../components/about-us/TextPart";
import EmptyData from "../components/ui/EmptyData";
import ErrorComponent from "../components/ui/ErrorComponent";

function AboutUs() {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);
  const [err, setErr] = useState(false);
  const [data, setData] = useState([]);

  const getData = useCallback(async function getData() {
    try {
      setErr(false);
      setIsLoading(true);
      const req = await fetch(SummaryApi.getAboutUsData.url, {
        method: SummaryApi.getAboutUsData.method,
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
      toast.error(t("messages.errGetAboustUs"));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  if (err) {
    return (
      <>
        <Helmet>
          <meta charSet="utf-8" />
          <title>{t("SEO.titles.aboutus")}</title>
        </Helmet>
        <div className="container mx-auto bg-slate-100 p-6">
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
          <title>{t("SEO.titles.aboutus")}</title>
        </Helmet>
        <EmptyData />;
      </>
    );
  }

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{t("SEO.titles.aboutus")}</title>
      </Helmet>
      <div className="container w-[90%] mx-auto bg-white p-6 section-box-shadow rounded-lg">
        <div className="flex flex-wrap columns-12">
          <TextPart data={data} isLoading={isLoading} />
          {isLoading ? (
            <div className="w-full basis-full lg:basis-6/12 lg:w-[50%]">
              <div className="mb-3">
                <div
                  className={`w-full h-[20rem] md:h-[25rem] bg-slate-500 animate-pulse sm:h-[420px]`}
                />
              </div>

              <div className="flex justify-between gap-1 overflow-x-auto w-full relative">
                <div className="w-[144px] h-[144px] bg-slate-500 animate-pulse shrink-0" />
                <div className="w-[144px] h-[144px] bg-slate-500 animate-pulse shrink-0" />
                <div className="w-[144px] h-[144px] bg-slate-500 animate-pulse shrink-0" />
              </div>
            </div>
          ) : (
            <ImagesPart data={data} isLoading={isLoading} />
          )}
        </div>
        {/* <ErrorComponent refetchFunction={() => {}} /> */}
      </div>
    </>
  );
}

export default AboutUs;
