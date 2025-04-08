import { useRef, useState } from "react";
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
import UploadImages from "./UploadImages";

function AddSliderForm({ onSuccess }) {
  const { t } = useTranslation();
  const [isUploading, setIsUploading] = useState(false);
  const imgRef = useRef(null);

  async function uploadSliderImage() {
    toast.warn(t("messages.warnUploadSliderImage"));
    try {
      setIsUploading(true);
      const formData = new FormData();
      formData.append("sliderImg", imgRef.current);

      const req = await fetch(SummaryApi.uploadSliderImage.url, {
        method: SummaryApi.uploadSliderImage.method,
        body: formData,
        credentials: "include",
      });

      const res = await req.json();
      if (res.success) {
        return res.imgPath;
      } else {
        throw new Error("Something went wrong");
      }
    } catch (err) {
      console.log(err.message);
      toast.error(t("messages.errUploadSliderImage"));
    }
  }

  async function uploadSliderData(data) {
    try {
      const imgPath = await uploadSliderImage();
      data.imgPath = imgPath;

      const req = await fetch(SummaryApi.uploadSliderData.url, {
        method: SummaryApi.uploadSliderData.method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const res = await req.json();

      if (res.success) {
        toast.success(t("messages.successUploadSliderData"));
        onSuccess();
      } else {
        throw new Error("Something went wrong");
      }
    } catch (err) {
      console.log(err.message);
      toast.error(t("messages.errUploadSliderData"));
    } finally {
      setIsUploading(false);
    }
  }

  function modifyImgs(file, operation) {
    switch (operation) {
      case "ADD":
        imgRef.current = file;
        break;

      case "DELETE":
        imgRef.current = null;
        break;

      default:
        return;
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const finallData = {
      title: [],
      description: [],
      imgPath: "",
    };

    let allTitleTranslation = 0;
    let allDescTranslation = 0;

    formData.entries().forEach((element) => {
      if (element[0].startsWith("sliderTitle")) {
        // it must be 3 or -3 otherwise there is something different
        allTitleTranslation += element[1].length !== 0 ? 1 : -1;
        finallData.title.push({
          language: element[0].slice(11).toLowerCase(),
          text: element[1],
        });
      }
      if (element[0].startsWith("description")) {
        allDescTranslation += element[1].length !== 0 ? 1 : -1;
        finallData.description.push({
          language: element[0].slice(11).toLowerCase(),
          text: element[1],
        });
      }
    });

    if (Math.abs(allTitleTranslation) !== 3) {
      toast.error(t("messages.errAddAllTranslationTitle"));
      return;
    }

    if (Math.abs(allDescTranslation) !== 3) {
      toast.error(t("messages.errAddAllTranslationDesc"));
      return;
    }

    if (!imgRef.current) {
      toast.error(t("messages.errSliderImage"));
      return;
    }

    uploadSliderData(finallData);
  }

  return (
    <form className="pt-6 flex flex-col gap-2" onSubmit={handleSubmit}>
      <AdminInput
        type="text"
        name="sliderTitleEN"
        id="sliderTitleEN"
        label={t("forms.admin.interpolationFields.title.label", {
          section: t("forms.admin.interpolationKeyword.slider"),
          lang: t("forms.admin.interpolationKeyword.en"),
        })}
        placeholder={t("forms.admin.interpolationFields.title.placeholder", {
          section: t("forms.admin.interpolationKeyword.slider"),
          lang: t("forms.admin.interpolationKeyword.en"),
        })}
        classes="p-2 bg-slate-100 border rounded disabled:cursor-not-allowed"
        disabled={isUploading}
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
        name="sliderTitleAR"
        id="sliderTitleAR"
        label={t("forms.admin.interpolationFields.title.label", {
          section: t("forms.admin.interpolationKeyword.slider"),
          lang: t("forms.admin.interpolationKeyword.ar"),
        })}
        placeholder={t("forms.admin.interpolationFields.title.placeholder", {
          section: t("forms.admin.interpolationKeyword.slider"),
          lang: t("forms.admin.interpolationKeyword.ar"),
        })}
        classes="p-2 bg-slate-100 border rounded disabled:cursor-not-allowed"
        disabled={isUploading}
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
        name="sliderTitleFR"
        id="sliderTitleFR"
        label={t("forms.admin.interpolationFields.title.label", {
          section: t("forms.admin.interpolationKeyword.slider"),
          lang: t("forms.admin.interpolationKeyword.fr"),
        })}
        placeholder={t("forms.admin.interpolationFields.title.placeholder", {
          section: t("forms.admin.interpolationKeyword.slider"),
          lang: t("forms.admin.interpolationKeyword.fr"),
        })}
        classes="p-2 bg-slate-100 border rounded disabled:cursor-not-allowed"
        disabled={isUploading}
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
          section: t("forms.admin.interpolationKeyword.slider"),
          lang: t("forms.admin.interpolationKeyword.en"),
        })}
        placeholder={t(
          "forms.admin.interpolationFields.description.placeholder",
          {
            section: t("forms.admin.interpolationKeyword.slider"),
            lang: t("forms.admin.interpolationKeyword.en"),
          }
        )}
        name="descriptionEN"
        classes="h-28 bg-slate-100 border resize-none p-1 disabled:cursor-not-allowed"
        rows={3}
        disabled={isUploading}
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
          section: t("forms.admin.interpolationKeyword.slider"),
          lang: t("forms.admin.interpolationKeyword.ar"),
        })}
        placeholder={t(
          "forms.admin.interpolationFields.description.placeholder",
          {
            section: t("forms.admin.interpolationKeyword.slider"),
            lang: t("forms.admin.interpolationKeyword.ar"),
          }
        )}
        name="descriptionAR"
        classes="h-28 bg-slate-100 border resize-none p-1 disabled:cursor-not-allowed"
        rows={3}
        disabled={isUploading}
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
          section: t("forms.admin.interpolationKeyword.slider"),
          lang: t("forms.admin.interpolationKeyword.fr"),
        })}
        placeholder={t(
          "forms.admin.interpolationFields.description.placeholder",
          {
            section: t("forms.admin.interpolationKeyword.slider"),
            lang: t("forms.admin.interpolationKeyword.fr"),
          }
        )}
        name="descriptionFR"
        classes="h-28 bg-slate-100 border resize-none p-1 disabled:cursor-not-allowed"
        rows={3}
        disabled={isUploading}
        sterilizer={(val) => {
          if (!isValidFrenchChars(val, t)) {
            return false;
          }
          return val.length <= 500;
        }}
      />

      <UploadImages
        disabled={isUploading}
        error={t("messages.errSliderImage")}
        label={t("forms.admin.imgsSliderField.label")}
        modifyImgs={modifyImgs}
        multiple={false}
      />

      <SubmitBtn
        title={t("forms.admin.uploadSliderBtn")}
        type="primary"
        classes="px-3 pt-2"
        dis={isUploading}
      />
    </form>
  );
}

export default AddSliderForm;
