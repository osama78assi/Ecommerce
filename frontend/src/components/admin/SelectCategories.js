import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

function SelectCategories({ activeOption }) {
  const { t } = useTranslation();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [active, setActive] = useState("Select a category");

  useEffect(() => {
    // Fetch data
    setIsLoading(false);
  }, []);

  return isLoading ? (
    <>
      <label htmlFor="category" className="mt-3">
        {t("forms.admin.categoryField.label")}
      </label>
      <div className="mt-3 h-8 bg-gray-400 animate-pulse rounded p-2" />
    </>
  ) : (
    <>
      <label htmlFor="category" className="mt-3">
        {t("forms.admin.categoryField.label")}
      </label>
      <select
        required
        value={active}
        name="category"
        onChange={(e) => setActive(e.target.value)}
        className="p-2 bg-slate-100 border rounded"
      >
        <option value={""}>{t("forms.admin.categoryField.defaultOption")}</option>
        {data?.map((el, index) => {
          return (
            <option
              value={el.categoryName}
              key={el.id}
              selected={el.categoryName === activeOption}
            >
              {el.categoryName}
            </option>
          );
        })}
      </select>
    </>
  );
}

export default SelectCategories;
