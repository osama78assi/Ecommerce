import { useState } from "react";
import { useTranslation } from "react-i18next";
import LoadingTexts from "./LoadingTexts";

function TextPart({ data, isLoading }) {
  const { t, i18n } = useTranslation();
  const [activeP, setActiveP] = useState(0);

  if (isLoading) {
    return <LoadingTexts />;
  }

  return (
    <div className="basis-full w-full mb-2 p-0 md:p-3 md:px-6 lg:basis-6/12 lg:w-[50%] sm:mb-0">
      <h1 className="text-2xl md:text-4xl py-3 text-primary-700">
        {t("aboutUs.title")}
      </h1>
      <div className="flex justify-between flex-wrap mb-3 border-b-[1px] gap-3 border-b-gray-200">
        {data.map((ele, index) => (
          <h3
            key={`${
              ele.title?.filter((item) => item.language === i18n.language)[0]
                ?.text
            }`}
            className={`text-lg pt-2 pb-4 relative cursor-pointer ${
              index === activeP
                ? "text-primary-700 before:content-none before:w-full before:absolute before:bottom-[-1px] before:left-0 before:h-[1px] before:bg-[var(--primary-color-900)] sm:before:content-['']"
                : ""
            } md:text-xl`}
            onClick={() => setActiveP(index)}
            role="button"
          >
            {
              ele.title?.filter((item) => item.language === i18n.language)[0]
                ?.text
            }
          </h3>
        ))}
      </div>

      <div>
        {data.map((ele, index) => (
          <p
            key={`${
              ele.content?.filter((item) => item.language === i18n.language)[0]
                ?.text
            }`}
            className={`p-1 leading-[1.6rem] text-break ${
              index !== activeP ? "hidden" : ""
            }`}
          >
            {
              ele.content?.filter((item) => item.language === i18n.language)[0]
                ?.text
            }
          </p>
        ))}
      </div>
    </div>
  );
}

export default TextPart;
