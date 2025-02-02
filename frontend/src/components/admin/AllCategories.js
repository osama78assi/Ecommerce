import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { MdDelete, MdModeEdit } from "react-icons/md";
import { RotatingLines } from "react-loader-spinner";
import { toast } from "react-toastify";
import SummaryApi from "../../common";
import Confirm from "../ui/Confirm";
import EmptyData from "../ui/EmptyData";
import ErrorComponent from "../ui/ErrorComponent";
import AddCategoryForm from "./AddCategoryForm";
import ModalWindow from "./ModalWindow";
import Upload from "./Upload";

function AllCategories() {
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [showEditCategory, setShowEditCategory] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [err, setErr] = useState(false);
  const [data, setData] = useState([]);
  const { t } = useTranslation();

  const categoryUpdate = useRef(null);
  const categoryDelete = useRef(null);

  async function fetchAllCategories() {
    try {
      setErr(false);
      setIsLoading(true);


      const req = await fetch(SummaryApi.getAllCategories.url, {
        method: SummaryApi.getAllCategories.method,
      });

      const res = await req.json();
      if (res.success) {
        setData(res.data);
      } else {
        throw new Error("Something went wrong");
      }
    } catch (err) {
      setErr(true);
      console.log(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  async function deleteCategory() {
    try {
      const req = await fetch(SummaryApi.deleteCategory.url, {
        method: SummaryApi.deleteCategory.method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: categoryDelete.current }),
      });

      const res = await req.json();
      if (res.success) {
        toast.success(t("messages.successDeleteCategory"));
        fetchAllCategories();
      } else {
        throw new Error("Something went wrong");
      }
    } catch (err) {
      console.log(err.message);
    } finally {
      setShowConfirm(false);
      categoryDelete.current = null;
    }
  }

  useEffect(() => {
    fetchAllCategories();
  }, []);

  if (isLoading) {
    return (
      <div className="bg-white pb-4">
        <div className="flex items-center justify-center">
          <RotatingLines strokeColor="#c89329" />
        </div>
      </div>
    );
  }

  if (err) {
    return (
      <div className="p-4 w-full h-full">
        <ErrorComponent
          refetchFunction={fetchAllCategories}
          disable={isLoading}
        />
      </div>
    );
  }

  return (
    <div className="bg-white pb-4">
      <Upload
        buttonTitle={t("forms.admin.uploadBtnCategoryOpen")}
        title={t("forms.admin.uploadCategoryTitle")}
        hanldeClick={() => setShowAddCategory(true)}
      />
      {data.length ? (
        <table className="w-full userTable">
          <thead>
            <tr className="bg-primary-700 text-white">
              <th>{t("tables.common.count")}</th>
              <th>{t("tables.allCategories.englishName")}</th>
              <th>{t("tables.allCategories.arabicName")}</th>
              <th>{t("tables.allCategories.frenchName")}</th>
              <th>{t("tables.common.action")}</th>
            </tr>
          </thead>
          <tbody>
            {data.map((el, index) => {
              return (
                <tr key={el._id}>
                  <td>{index + 1}</td>
                  {el.categoryName.map((item) => (
                    <td key={item._id}>{item.text}</td>
                  ))}
                  <td className="py-2 flex justify-evenly">
                    <button
                      className="bg-green-100 p-2 rounded-full cursor-pointer transition-colors hover:bg-green-500 hover:text-white"
                      onClick={() => {
                        categoryUpdate.current = el;
                        setShowEditCategory(true);
                      }}
                    >
                      <MdModeEdit />
                    </button>
                    <button
                      className="bg-red-100 p-2 rounded-full cursor-pointer transition-colors hover:bg-red-500 hover:text-white"
                      onClick={() => {
                        categoryDelete.current = el._id;
                        setShowConfirm(true);
                      }}
                    >
                      <MdDelete />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <EmptyData />
      )}

      {showAddCategory && (
        <ModalWindow onClose={() => setShowAddCategory(false)}>
          <AddCategoryForm
            onSuccess={() => {
              setShowAddCategory(false);
              fetchAllCategories();
            }}
          />
        </ModalWindow>
      )}

      {showEditCategory && (
        <ModalWindow onClose={() => setShowEditCategory(false)}>
          <AddCategoryForm
            data={categoryUpdate.current}
            onSuccess={() => {
              categoryUpdate.current = null;
              setShowEditCategory(false);
              fetchAllCategories();
            }}
          />
        </ModalWindow>
      )}

      {showConfirm && (
        <Confirm
          about={t("messages.confirmDeleteCategory")}
          onClose={() => setShowConfirm(false)}
          onConfirm={() => {
            deleteCategory();
          }}
        />
      )}
    </div>
  );
}

export default AllCategories;
