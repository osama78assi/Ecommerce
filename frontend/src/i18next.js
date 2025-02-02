import i18next from "i18next";
import languageDetector from "i18next-browser-languagedetector";
import backend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";

i18next
  .use(backend)
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLang: "en",
    lang: "en",
    backend: { loadPath: "./locales/{{lng}}/{{ns}}.json" },
  });

export default i18next;
