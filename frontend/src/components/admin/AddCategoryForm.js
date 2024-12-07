import { useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import SummaryApi from "../../common";
import {
  isValidArabicChars,
  isValidEnglishChars,
  isValidFrenchChars,
} from "../../helpers/checkLanguages";
import AdminInput from "./AdminInput";

function AddCategoryForm({ onSuccess, data }) {
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();

  async function addCategory(e) {
    try {
      e.preventDefault();
      setIsLoading(true);
      const formData = new FormData(e.target);
      const categoryName = [];
      formData.entries().forEach((element) => {
        categoryName.push({
          language: element[0].slice(12).toLowerCase(),
          text: element[1],
        });
      });

      const req = await fetch(SummaryApi.uploadCategory.url, {
        method: SummaryApi.uploadCategory.method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ categoryName }),
      });

      const res = await req.json();

      if (res.success) {
        toast.success(t("messages.successUploadCategory"));
      } else {
        if (res.message === "Category already exists")
          throw new Error("Category already exists");
        throw new Error("Something went wrong");
      }
    } catch (err) {
      console.log(err.message);
      if (err.message === "Category already exists") {
        toast.error(t("messages.errExistCategory"));
      } else {
        toast.error(t("messages.errUploadCategory"));
      }
    } finally {
      setIsLoading(false);
    }
  }

  async function updateCategory(e) {
    try {
      e.preventDefault();
      setIsLoading(true);
      const formData = new FormData(e.target);
      const categoryName = [];
      formData.entries().forEach((element) => {
        categoryName.push({
          language: element[0].slice(12).toLowerCase(),
          text: element[1].trim(),
        });
      });

      const req = await fetch(SummaryApi.updateCategory.url, {
        method: SummaryApi.updateCategory.method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ categoryId: data._id, categoryName }),
      });

      const res = await req.json();

      if (res.success) {
        toast.success(t("messages.successUploadCategory"));
      } else {
        throw new Error("Something went wrong");
      }
    } catch (err) {
      console.log(err.message);
      toast.error(t("messages.errUploadCategory"));
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSubmit(e) {
    try {
      if (!data) {
        await addCategory(e);
      } else {
        await updateCategory(e);
      }

      onSuccess();
    } catch (err) {
      console.log(err.message);
    }
  }

  return (
    <form className="pt-6 flex flex-col gap-2" onSubmit={handleSubmit}>
      <AdminInput
        type="text"
        name="categoryNameEN"
        id="categoryNameEN"
        label={t("forms.admin.categoryNameField.label")}
        placeholder={t("forms.admin.categoryNameField.placeholder")}
        classes="p-2 bg-slate-100 border rounded disabled:cursor-not-allowed"
        disabled={isLoading}
        defaultValue={
          data?.categoryName?.filter((item) => item.language === "en")[0].text
        }
        sterilizer={(val) => {
          if (!isValidEnglishChars(val, t)) {
            return false;
          }
          if (val.length >= 100) {
            toast.warn(t("messages.errCategoryNameLong"));
            return false;
          }
          return true;
        }}
      />

      <AdminInput
        type="text"
        name="categoryNameAR"
        id="categoryNameAR"
        label={t("forms.admin.categoryNameFieldAR.label")}
        placeholder={t("forms.admin.categoryNameFieldAR.placeholder")}
        classes="p-2 bg-slate-100 border rounded disabled:cursor-not-allowed"
        disabled={isLoading}
        required={true}
        defaultValue={
          data?.categoryName?.filter((item) => item.language === "ar")[0].text
        }
        sterilizer={(val) => {
          if (!isValidArabicChars(val, t)) {
            return false;
          }
          if (val.length >= 100) {
            toast.warn(t("messages.errCategoryNameLong"));
            return false;
          }
          return true;
        }}
      />

      <AdminInput
        type="text"
        name="categoryNameFR"
        id="categoryNameFR"
        label={t("forms.admin.categoryNameFieldFR.label")}
        placeholder={t("forms.admin.categoryNameFieldFR.placeholder")}
        classes="p-2 bg-slate-100 border rounded  disabled:cursor-not-allowed"
        disabled={isLoading}
        required={true}
        defaultValue={
          data?.categoryName?.filter((item) => item.language === "fr")[0].text
        }
        sterilizer={(val) => {
          if (!isValidFrenchChars(val, t)) {
            return false;
          }
          if (val.length >= 100) {
            toast.warn(t("messages.errCategoryNameLong"));
            return false;
          }
          return true;
        }}
      />

      <button
        disabled={isLoading}
        className="bg-primary-900 hover:bg-primary-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6 disabled:cursor-not-allowed"
      >
        {data
          ? t("forms.admin.updateCategory")
          : t("forms.admin.addCategoryBtn")}
      </button>
    </form>
  );
}

export default AddCategoryForm;
