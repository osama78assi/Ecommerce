import { useTranslation } from "react-i18next";
import { FaTriangleExclamation } from "react-icons/fa6";

function ErrorComponent({ refetchFunction, disable }) {
  const { t } = useTranslation();
  return (
    <div className="bg-red-200 rounded-lg p-3">
      <div className="bg-gradient-to-bl mb-3 flex items-center flex-wrap gap-4">
        <p className="text-2xl text-red-500 ">
          {t("messages.genericErr.title")}
        </p>
        <FaTriangleExclamation className="text-4xl text-red-500" />
      </div>

      {refetchFunction ? (
        <p
          className={`text-red-500 underline transition-colors cursor-pointer hover:text-red-800 ${
            disable ? "pointer-events-none cursor-not-allowed" : ""
          }`}
          onClick={() => refetchFunction?.()}
        >
          {t("messages.genericErr.btnTitle")}
        </p>
      ) : null}
    </div>
  );
}

export default ErrorComponent;
