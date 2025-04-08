import { useTranslation } from "react-i18next";

function EmptyData() {
  const { t } = useTranslation();
  return (
    <p className="w-[80%] mx-auto my-2 rounded-lg p-4 text-xl bg-[var(--primary-color-200)] text-[var(--primary-color-1100)]">
      {t("messages.warnNoData")}
    </p>
  );
}

export default EmptyData;
