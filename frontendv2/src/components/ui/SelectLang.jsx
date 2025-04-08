import { useTranslation } from "react-i18next";

function SelectLang() {
  const { i18n } = useTranslation();

  function handleChangeLang(e) {
    i18n.changeLanguage(e.target.value);
  }

  const langs = [
    {
      label: "العربية",
      value: "ar",
    },
    {
      label: "English",
      value: "en",
    },
    {
      label: "French",
      value: "fr",
    },
  ];

  return (
    <select onChange={handleChangeLang} className="w-full py-2 hover:bg-slate-100 transition-colors bg-transparent lg:w-[5rem] h-[95%] cursor-pointer focus-within:focus:focus-visible:outline-none">
      {langs.map((ele) => (
        <option key={ele.label} value={ele.value} selected={ele.value === i18n.language}>
          {ele.label}
        </option>
      ))}
    </select>
  );
}

export default SelectLang;
