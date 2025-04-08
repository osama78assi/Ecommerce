import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import SummaryApi from "../../common";

function SelectCategories({ activeOption, disabled }) {
  const { t, i18n } = useTranslation();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [active, setActive] = useState("Select a category");
  const [err, setErr] = useState(false);

  const getCategories = useCallback(async function getCategories() {
    try {
      setErr(false);
      setIsLoading(true);
      const req = await fetch(SummaryApi.getAllCategories.url, {
        method: SummaryApi.getAllCategories.method,
      });
      const { data, error } = await req.json();

      if (!error) {
        setData(data);
      } else {
        toast.error(t("messages.errGetCategories"));
        throw new Error("Something went wrong");
      }
    } catch (err) {
      console.log(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  if (err) {
    return (
      <p className="underline text-blue-600 text-xl" onClick={getCategories}>
        {t("messages.genericErr.btnTitle")}
      </p>
    );
  }

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
        disabled={disabled}
      >
        <option value={""}>
          {t("forms.admin.categoryField.defaultOption")}
        </option>
        {data?.map((el) => {
          return (
            <option
              value={el._id}
              key={el._id}
              selected={el._id === activeOption}
            >
              {
                el.categoryName.filter(
                  (item) => item.language === i18n.language
                )[0].text
              }
            </option>
          );
        })}
      </select>
    </>
  );
}

export default SelectCategories;
