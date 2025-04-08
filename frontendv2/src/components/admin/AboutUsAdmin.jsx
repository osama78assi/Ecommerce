import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useTranslation } from "react-i18next";
import { MdDelete } from "react-icons/md";
import { RotatingLines } from "react-loader-spinner";
import { toast } from "react-toastify";
import SummaryApi from "../../common";
import Confirm from "../ui/Confirm";
import DisplayImage from "../ui/DisplayImage";
import EmptyData from "../ui/EmptyData";
import ErrorComponent from "../ui/ErrorComponent";
import AddAboutusForm from "./AddAboutusForm";
import ModalWindow from "./ModalWindow";
import Upload from "./Upload";


function AboutUsAdmin() {
  const [isLoading, setIsLoading] = useState(true);
  const [err, setErr] = useState(false);
  const [data, setData] = useState([]);
  const [showAddAbotuus, setShowAddAboutus] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const { t } = useTranslation();

  const aboutusDelete = useRef(null);
  const aboutusImage = useRef(null);

  async function fetchAllAboutus() {
    try {
      setIsLoading(true);
      setErr(false);
      const req = await fetch(SummaryApi.getAboutUsData.url, {
        method: SummaryApi.getAboutUsData.method,
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

  async function deleteAboutUs() {
    try {
      const req = await fetch(
        `${SummaryApi.deleteAboutus.url}/${aboutusDelete.current}`,
        {
          method: SummaryApi.deleteVision.method,
          credentials: "include",
        }
      );

      const res = await req.json();
      if (res.success) {
        toast.success(t("messages.successDeleteAboutus"));
        fetchAllAboutus();
      } else {
        throw new Error("Soemthing went wrong");
      }
    } catch (err) {
      console.log(err.message);
      toast.error(t("messages.errDeleteAboutusSection"));
    }
  }

  useEffect(() => {
    fetchAllAboutus();
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
        <ErrorComponent refetchFunction={fetchAllAboutus} disable={isLoading} />
      </div>
    );
  }

  return (
    <div className="bg-white pb-4">
      <Upload
        buttonTitle={t("forms.admin.uploadAboutUsOpen")}
        title={t("forms.admin.uploadAboutUsTitle")}
        hanldeClick={() => setShowAddAboutus(true)}
      />
      {data.length ? (
        <table className="w-full userTable">
          <thead>
            <tr className="bg-primary-700 text-white">
              <th className="p-2">{t("tables.common.titleEN")}</th>
              <th className="p-2">{t("tables.common.titleAR")}</th>
              <th className="p-2">{t("tables.common.titleFR")}</th>
              <th className="p-2">{t("tables.common.descEN")}</th>
              <th className="p-2">{t("tables.common.descAR")}</th>
              <th className="p-2">{t("tables.common.descFR")}</th>
              <th className="p-2">{t("tables.common.image")}</th>
              <th className="p-2">{t("tables.common.action")}</th>
            </tr>
          </thead>
          <tbody>
            {data.map((el) => {
              return (
                <tr key={el._id}>
                  {el.title.map((item) => (
                    <td key={item._id}>{item.text}</td>
                  ))}
                  {el.content.map((item) => (
                    <td key={item._id}>{item.text}</td>
                  ))}
                  <td>
                    <span
                      className="text-blue-700 cursor-pointer underline"
                      onClick={() => {
                        aboutusImage.current = el.image;
                        setShowImage(true);
                      }}
                    >
                      {t("tables.common.image")}
                    </span>
                  </td>
                  <td className="py-2">
                    <button
                      className="bg-red-100 p-2 rounded-full cursor-pointer transition-colors hover:bg-red-500 hover:text-white"
                      onClick={() => {
                        aboutusDelete.current = el._id;
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

      {showAddAbotuus && (
        <ModalWindow onClose={() => setShowAddAboutus(false)}>
          <AddAboutusForm
            onSuccess={() => {
              setShowAddAboutus(false);
              fetchAllAboutus();
            }}
          />
        </ModalWindow>
      )}

      {showConfirm && (
        <Confirm
          about={t("messages.confirmDeleteAboutus")}
          onClose={() => {
            aboutusDelete.current = "";
            setShowConfirm(false);
          }}
          onConfirm={() => {
            deleteAboutUs();
            setShowConfirm(false);
          }}
        />
      )}

      {showImage &&
        createPortal(
          <DisplayImage
            onClose={() => {
              setShowImage(false);
              aboutusImage.current = null;
            }}
            imgUrl={aboutusImage.current}
          />,
          document.body
        )}
    </div>
  );
}

export default AboutUsAdmin;
