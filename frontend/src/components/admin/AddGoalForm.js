import { useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import SummaryApi from "../../common";
import {
  isValidArabicChars,
  isValidEnglishChars,
  isValidFrenchChars,
} from "../../helpers/checkLanguages";
import SubmitBtn from "../ui/SubmitBtn";
import AdminInput from "./AdminInput";

function AddGoalForm({ onSuccess, allowed }) {
  const { t } = useTranslation();
  const [isUploading, setIsUploading] = useState(false);

  async function uploadGoalData(data) {
    try {
      const req = await fetch(SummaryApi.uploadGoal.url, {
        method: SummaryApi.uploadGoal.method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const res = await req.json();

      if (res.success) {
        toast.success(t("messages.successAddGoal"));
        onSuccess();
      } else {
        throw new Error("Something went wrong");
      }
    } catch (err) {
      console.log(err.message);
      toast.error(t("messages.errAddGoal"));
    } finally {
      setIsUploading(false);
    }
  }

  function handleSubmit(e) {
    if (!allowed) {
      toast.warning(t("message.warnLimitGoals"));
      return;
    }
    e.preventDefault();
    const formData = new FormData(e.target);
    const finallData = {
      title: [],
      description: [],
    };

    formData.entries().forEach((element) => {
      if (element[0].startsWith("goalTitle")) {
        finallData.title.push({
          language: element[0].slice(9).toLowerCase(),
          text: element[1],
        });
      }
      if (element[0].startsWith("description")) {
        finallData.description.push({
          language: element[0].slice(11).toLowerCase(),
          text: element[1],
        });
      }
    });

    uploadGoalData(finallData);
  }

  return (
    <form className="pt-6 flex flex-col gap-2" onSubmit={handleSubmit}>
      <AdminInput
        type="text"
        name="goalTitleEN"
        id="goalTitleEN"
        label={t("forms.admin.interpolationFields.description.label", {
          section: t("forms.admin.interpolationKeyword.goal"),
          lang: t("forms.admin.interpolationKeyword.en"),
        })}
        placeholder={t(
          "forms.admin.interpolationFields.description.placeholder",
          {
            section: t("forms.admin.interpolationKeyword.goal"),
            lang: t("forms.admin.interpolationKeyword.en"),
          }
        )}
        classes="p-2 bg-slate-100 border rounded disabled:cursor-not-allowed"
        disabled={isUploading}
        required={true}
        sterilizer={(val) => {
          if (!isValidEnglishChars(val, t)) {
            return false;
          }
          if (val.length >= 100) {
            toast.warn(t("messages.errTitleLong"));
            return false;
          }
          return true;
        }}
      />

      <AdminInput
        type="text"
        name="goalTitleAR"
        id="goalTitleAR"
        label={t("forms.admin.interpolationFields.description.label", {
          section: t("forms.admin.interpolationKeyword.goal"),
          lang: t("forms.admin.interpolationKeyword.ar"),
        })}
        placeholder={t(
          "forms.admin.interpolationFields.description.placeholder",
          {
            section: t("forms.admin.interpolationKeyword.goal"),
            lang: t("forms.admin.interpolationKeyword.ar"),
          }
        )}
        classes="p-2 bg-slate-100 border rounded disabled:cursor-not-allowed"
        disabled={isUploading}
        required={true}
        sterilizer={(val) => {
          if (!isValidArabicChars(val, t)) {
            return false;
          }
          if (val.length >= 100) {
            toast.warn(t("messages.errTitleLong"));
            return false;
          }
          return true;
        }}
      />

      <AdminInput
        type="text"
        name="goalTitleFR"
        id="goalTitleFR"
        label={t("forms.admin.interpolationFields.description.label", {
          section: t("forms.admin.interpolationKeyword.goal"),
          lang: t("forms.admin.interpolationKeyword.fr"),
        })}
        placeholder={t(
          "forms.admin.interpolationFields.description.placeholder",
          {
            section: t("forms.admin.interpolationKeyword.goal"),
            lang: t("forms.admin.interpolationKeyword.fr"),
          }
        )}
        classes="p-2 bg-slate-100 border rounded disabled:cursor-not-allowed"
        disabled={isUploading}
        required={true}
        sterilizer={(val) => {
          if (!isValidFrenchChars(val, t)) {
            return false;
          }
          if (val.length >= 100) {
            toast.warn(t("messages.errTitleLong"));
            return false;
          }
          return true;
        }}
      />

      <AdminInput
        type="textarea"
        id="descriptionEN"
        label={t("forms.admin.interpolationFields.description.label", {
          section: t("forms.admin.interpolationKeyword.goal"),
          lang: t("forms.admin.interpolationKeyword.en"),
        })}
        placeholder={t(
          "forms.admin.interpolationFields.description.placeholder",
          {
            section: t("forms.admin.interpolationKeyword.goal"),
            lang: t("forms.admin.interpolationKeyword.en"),
          }
        )}
        name="descriptionEN"
        classes="h-28 bg-slate-100 border resize-none p-1 disabled:cursor-not-allowed"
        rows={3}
        disabled={isUploading}
        required={true}
        sterilizer={(val) => {
          if (!isValidEnglishChars(val, t)) {
            return false;
          }
          return val.length <= 500;
        }}
      />

      <AdminInput
        type="textarea"
        id="descriptionAR"
        label={t("forms.admin.interpolationFields.description.label", {
          section: t("forms.admin.interpolationKeyword.goal"),
          lang: t("forms.admin.interpolationKeyword.ar"),
        })}
        placeholder={t(
          "forms.admin.interpolationFields.description.placeholder",
          {
            section: t("forms.admin.interpolationKeyword.goal"),
            lang: t("forms.admin.interpolationKeyword.ar"),
          }
        )}
        name="descriptionAR"
        classes="h-28 bg-slate-100 border resize-none p-1 disabled:cursor-not-allowed"
        rows={3}
        disabled={isUploading}
        required={true}
        sterilizer={(val) => {
          if (!isValidArabicChars(val, t)) {
            return false;
          }
          return val.length <= 500;
        }}
      />

      <AdminInput
        type="textarea"
        id="descriptionFR"
        label={t("forms.admin.interpolationFields.description.label", {
          section: t("forms.admin.interpolationKeyword.goal"),
          lang: t("forms.admin.interpolationKeyword.fr"),
        })}
        placeholder={t(
          "forms.admin.interpolationFields.description.placeholder",
          {
            section: t("forms.admin.interpolationKeyword.goal"),
            lang: t("forms.admin.interpolationKeyword.fr"),
          }
        )}
        name="descriptionFR"
        classes="h-28 bg-slate-100 border resize-none p-1 disabled:cursor-not-allowed"
        rows={3}
        disabled={isUploading}
        required={true}
        sterilizer={(val) => {
          if (!isValidFrenchChars(val, t)) {
            return false;
          }
          return val.length <= 500;
        }}
      />

      <SubmitBtn
        title={t("forms.admin.uploadGoalBtn")}
        type="primary"
        classes="px-3 pt-2"
        dis={isUploading}
      />
    </form>
  );
}

export default AddGoalForm;
