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

/*
errUploadAboutusSection

*/

function AddAboutusForm({ onSuccess }) {
  const { t } = useTranslation();
  const [isUploading, setIsUploading] = useState(false);
  const imgRef = useRef(null);

  async function uploadAboutusImage() {
    toast.warn(t("messages.warnUploadVisionImage"));
    try {
      setIsUploading(true);
      const formData = new FormData();
      formData.append("aboutUsImg", imgRef.current);

      const req = await fetch(SummaryApi.uploadAboutusImage.url, {
        method: SummaryApi.uploadAboutusImage.method,
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
      toast.error(t("messages.errUploadAboutusImage"));
    }
  }

  async function uploadAboutUsData(data) {
    try {
      const imgPath = await uploadAboutusImage();
      data.image = imgPath;

      const req = await fetch(SummaryApi.uploadAboutus.url, {
        method: SummaryApi.uploadAboutus.method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const res = await req.json();

      if (res.success) {
        toast.success(t("messages.successAddAboutusSection"));
        onSuccess();
      } else {
        throw new Error("Something went wrong");
      }
    } catch (err) {
      console.log(err.message);
      toast.error(t("messages.errUploadAboutusSection"));
    } finally {
      setIsUploading(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const finallData = {
      title: [],
      content: [],
      image: "",
    };

    formData.entries().forEach((element) => {
      if (element[0].startsWith("visionTitle")) {
        finallData.title.push({
          language: element[0].slice(11).toLowerCase(),
          text: element[1],
        });
      }
      if (element[0].startsWith("description")) {
        finallData.content.push({
          language: element[0].slice(11).toLowerCase(),
          text: element[1],
        });
      }
    });

    if (!imgRef.current) {
      toast.error(t("messages.errAboutusImage"));
      return;
    }
    uploadAboutUsData(finallData);
  }

  function modifyImgs(file, operation, index) {
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

  return (
    <form className="pt-6 flex flex-col gap-2" onSubmit={handleSubmit}>
      <AdminInput
        type="text"
        name="visionTitleEN"
        id="visionTitleEN"
        label={t("forms.admin.interpolationFields.title.label", {
          section: t("forms.admin.interpolationKeyword.aboutus"),
          lang: t("forms.admin.interpolationKeyword.en"),
        })}
        placeholder={t("forms.admin.interpolationFields.title.placeholder", {
          section: t("forms.admin.interpolationKeyword.aboutus"),
          lang: t("forms.admin.interpolationKeyword.en"),
        })}
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
        name="visionTitleAR"
        id="visionTitleAR"
        label={t("forms.admin.interpolationFields.title.label", {
          section: t("forms.admin.interpolationKeyword.aboutus"),
          lang: t("forms.admin.interpolationKeyword.ar"),
        })}
        placeholder={t("forms.admin.interpolationFields.title.placeholder", {
          section: t("forms.admin.interpolationKeyword.aboutus"),
          lang: t("forms.admin.interpolationKeyword.ar"),
        })}
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
        name="visionTitleFR"
        id="visionTitleFR"
        label={t("forms.admin.interpolationFields.title.label", {
          section: t("forms.admin.interpolationKeyword.aboutus"),
          lang: t("forms.admin.interpolationKeyword.fr"),
        })}
        placeholder={t("forms.admin.interpolationFields.title.placeholder", {
          section: t("forms.admin.interpolationKeyword.aboutus"),
          lang: t("forms.admin.interpolationKeyword.fr"),
        })}
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
          section: t("forms.admin.interpolationKeyword.aboutus"),
          lang: t("forms.admin.interpolationKeyword.en"),
        })}
        placeholder={t(
          "forms.admin.interpolationFields.description.placeholder",
          {
            section: t("forms.admin.interpolationKeyword.aboutus"),
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
          section: t("forms.admin.interpolationKeyword.aboutus"),
          lang: t("forms.admin.interpolationKeyword.ar"),
        })}
        placeholder={t(
          "forms.admin.interpolationFields.description.placeholder",
          {
            section: t("forms.admin.interpolationKeyword.aboutus"),
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
          section: t("forms.admin.interpolationKeyword.aboutus"),
          lang: t("forms.admin.interpolationKeyword.fr"),
        })}
        placeholder={t(
          "forms.admin.interpolationFields.description.placeholder",
          {
            section: t("forms.admin.interpolationKeyword.aboutus"),
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

      <UploadImages
        disabled={isUploading}
        error={t("messages.errAboutusImage")}
        label={t("forms.admin.imgsAboutusField.label")}
        modifyImgs={modifyImgs}
        multiple={false}
      />

      <SubmitBtn
        title={t("forms.admin.uploadAboutUsBtn")}
        type="primary"
        classes="px-3 pt-2"
        dis={isUploading}
      />
    </form>
  );
}

export default AddAboutusForm;
