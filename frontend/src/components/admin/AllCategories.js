import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { RotatingLines } from "react-loader-spinner";
import AddCategoryForm from "./AddCategoryForm";
import ModalWindow from "./ModalWindow";
import Upload from "./Upload";

function AllCategories() {
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [data, setData] = useState([
    {
      _id: 1,
      categoryName: {
        en: "shoes",
        ar: "احذية",
        fr: "IDK",
      },
    },
    {
      _id: 2,
      categoryName: {
        en: "shoes",
        ar: "احذية",
        fr: "IDK",
      },
    },
    {
      _id: 3,
      categoryName: {
        en: "shoes",
        ar: "احذية",
        fr: "IDK",
      },
    },
  ]);
  const { t } = useTranslation();

  async function fetchAllCategories() {
    // Fetch request
  }

  useEffect(() => {
    setIsLoading(true);
    fetchAllCategories();
    setIsLoading(false);
  }, []);

  return (
    <div className="bg-white pb-4">
      {isLoading ? (
        <div className="flex items-center justify-center">
          <RotatingLines strokeColor="#c89329" />
        </div>
      ) : (
        <>
          <Upload
            buttonTitle={t("forms.admin.uploadBtnCategoryOpen")}
            title={t("forms.admin.uploadCategoryTitle")}
            hanldeClick={() => setShowAddCategory(true)}
          />
          <table className="w-full userTable">
            <thead>
              <tr className="bg-primary-700 text-white">
                <th>{t("tables.allCategories.count")}</th>
                <th>{t("tables.allCategories.arabicName")}</th>
                <th>{t("tables.allCategories.englishName")}</th>
                <th>{t("tables.allCategories.frenchName")}</th>
              </tr>
            </thead>
            <tbody>
              {data.map((el, index) => {
                return (
                  <tr key={el._id}>
                    <td>{index + 1}</td>
                    <td>{el.categoryName["ar"]}</td>
                    <td>{el.categoryName["en"]}</td>
                    <td>{el.categoryName["fr"]}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      )}
      {showAddCategory && (
        <ModalWindow onClose={() => setShowAddCategory(false)}>
          <AddCategoryForm onSuccess={() => fetchAllCategories()} />
        </ModalWindow>
      )}
    </div>
  );
}

export default AllCategories;
