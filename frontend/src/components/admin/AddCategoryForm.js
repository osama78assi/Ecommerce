import { useState } from "react";
import { useTranslation } from "react-i18next";
import AdminInput from "./AdminInput";
import { toast } from "react-toastify";

function AddCategoryForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();
  async function handleSubmit() {
    setIsLoading(true);
    // Make Your request
    try {
    } catch (err) {
      console.log(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form className="pt-6 flex flex-col gap-2" onSubmit={handleSubmit}>
      <AdminInput
        type="text"
        name="categoryName"
        label={t("forms.admin.categoryNameField.label")}
        placeholder={t("forms.admin.categoryNameField.placeholder")}
        classes="p-2 bg-slate-100 border rounded"
        sterilizer={(val) => {
          console.log(val);
          if (/\W+/.test(val)) {
            toast.warn(t("messages.errSpecialNameChars"));
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
        className="bg-primary-900 hover:bg-primary-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6"
      >
        {t("forms.admin.addCategoryBtn")}
      </button>
    </form>
  );
}

export default AddCategoryForm;
