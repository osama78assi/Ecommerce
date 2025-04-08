import { toast } from "react-toastify";

export function isValidEnglishChars(val, t) {
  if (!/^[a-zA-Z\d\s.,'";]+$/.test(val) & (val !== "")) {
    toast.warn(t("messages.errOnlyEnglish"));
    return false;
  }
  return true;
}

export function isValidArabicChars(val, t) {
  // See the not !, match anything except arabic, nubmers and whitespace chars
  // empty string => first is false -> 0 and empty string -> 1 then 0. && willn't work
  if (!/^[\u0600-\u06FF\s\d،.,'";]+$/.test(val) & (val !== "")) {
    toast.warn(t("messages.errOnlyArabic"));
    return false;
  }
  return true;
}

export function isValidFrenchChars(val, t) {
  if (!/^[A-Za-zÀ-ÿ\s\d'.,'";]+$/.test(val) & (val !== "")) {
    toast.warn(t("messages.errOnlyFrench"));
    return false;
  }
  return true;
}