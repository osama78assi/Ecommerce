import { useTranslation } from "react-i18next";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

function Pagination({
  pagesCount,
  setNextPage,
  setPrevPage,
  setCustomPage,
}) {
  const { t, i18n } = useTranslation();

  return (
    <div className="flex px-3 flex-col justify-center items-center mx-auto max-w-[535px] flex-wrap gap-2 py-2 s550:flex-row s550:justify-between">
      {pagesCount === null ? (
        <div className="flex items-center rounded-lg bg-gray-400 h-10 w-[8rem] animate-pulse text-white p-2" />
      ) : pagesCount === 0 ? null : (
        <button
          onClick={() => setPrevPage()}
          className="flex items-center rounded-lg bg-primary-900 text-white p-2 hover:bg-primary-700"
        >
          {i18n.language === "ar" ? <FaAngleRight /> : <FaAngleLeft />}
          <span>{t("store.prev")}</span>
        </button>
      )}

      <div className="flex justify-between gap-2">
        {pagesCount === null ? (
          <>
            <span className="bg-gray-400 animate-pulse text-white p-2 border-gray-400 rounded-lg border-2 cursor-pointer h-10 w-10" />
            <span className="bg-gray-400 animate-pulse text-white p-2 border-gray-400 rounded-lg border-2 cursor-pointer h-10 w-10" />
            <span className="bg-gray-400 animate-pulse text-white p-2 border-gray-400 rounded-lg border-2 cursor-pointer h-10 w-10" />
          </>
        ) : pagesCount === 0 ? null : (
          <>
            <span
              className="bg-primary-900 text-white p-2 border-gray-400 rounded-lg border-2 cursor-pointer"
              onClick={() => setCustomPage(1)}
            >
              {1}
            </span>
            {pagesCount > 2 && (
              <span
                className="bg-primary-900 text-white p-2 border-gray-400 rounded-lg border-2 cursor-pointer"
                onClick={() => setCustomPage(2)}
              >
                {2}
              </span>
            )}
            {pagesCount > 3 && (
              <span
                className="bg-primary-900 text-white p-2 border-gray-400 rounded-lg border-2 cursor-pointer"
                onClick={() => setCustomPage(3)}
              >
                {3}
              </span>
            )}

            {pagesCount > 4 && <span>...</span>}

            {pagesCount - 2 > 4 && (
              <span
                className="bg-primary-900 text-white p-2 border-gray-400 rounded-lg border-2 cursor-pointer"
                onClick={() => setCustomPage(pagesCount - 2)}
              >
                {pagesCount - 2}
              </span>
            )}
            {pagesCount - 1 > 5 && (
              <span
                className="bg-primary-900 text-white p-2 border-gray-400 rounded-lg border-2 cursor-pointer"
                onClick={() => setCustomPage(pagesCount - 1)}
              >
                {pagesCount - 1}
              </span>
            )}
            {pagesCount >= 4 && (
              <span
                className="bg-primary-900 text-white p-2 border-gray-400 rounded-lg border-2 cursor-pointer"
                onClick={() => setCustomPage(pagesCount)}
              >
                {pagesCount}
              </span>
            )}
          </>
        )}
      </div>

      {pagesCount === null ? (
        <div className="flex items-center rounded-lg bg-gray-400 h-10 w-[8rem] animate-pulse text-white p-2" />
      ) : pagesCount === 0 ? null : (
        <button
          onClick={() => setNextPage()}
          className="flex items-center rounded-lg bg-primary-900 text-white p-2 hover:bg-primary-700"
        >
          <span>{t("store.next")}</span>
          {i18n.language === "ar" ? <FaAngleLeft /> : <FaAngleRight />}
        </button>
      )}
    </div>
  );
}

export default Pagination;
