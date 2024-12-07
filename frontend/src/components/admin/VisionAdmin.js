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
import AddVisionForm from "./AddVisionForm";
import ModalWindow from "./ModalWindow";
import Upload from "./Upload";

function VisionAdmin() {
  const [isLoading, setIsLoading] = useState(true);
  const [err, setErr] = useState(false);
  const [data, setData] = useState([]);
  const [showAddVision, setShowAddVision] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const { t } = useTranslation();

  const visionDelete = useRef(null);
  const visionImage = useRef(null);

  async function fetchAllVisions() {
    try {
      setIsLoading(true);
      setErr(false);
      const req = await fetch(SummaryApi.getVisionData.url, {
        method: SummaryApi.getVisionData.method,
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

  async function deleteVision() {
    try {
      const req = await fetch(
        `${SummaryApi.deleteVision.url}/${visionDelete.current}`,
        {
          method: SummaryApi.deleteVision.method,
          credentials: "include",
        }
      );

      const res = await req.json();
      if (res.success) {
        toast.success(t("messages.successDeleteVision"));
        fetchAllVisions();
      } else {
        throw new Error("Soemthing went wrong");
      }
    } catch (err) {
      console.log(err.message);
      toast.error(t("messages.errDeleteVision"));
    }
  }

  useEffect(() => {
    fetchAllVisions();
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
        <ErrorComponent refetchFunction={fetchAllVisions} disable={isLoading} />
      </div>
    );
  }

  return (
    <div className="bg-white pb-4">
      <Upload
        buttonTitle={t("forms.admin.uploadVisionOpen")}
        title={t("forms.admin.uploadVisionTitle")}
        hanldeClick={() => setShowAddVision(true)}
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
            {data.map((el, index) => {
              return (
                <tr key={el._id}>
                  {el.title.map((item) => (
                    <td key={item._id}>{item.text}</td>
                  ))}
                  {el.description.map((item) => (
                    <td key={item._id}>{item.text}</td>
                  ))}
                  <td>
                    <span
                      className={`${
                        el.image ? "text-blue-700 cursor-pointer underline" : ""
                      }`}
                      onClick={() => {
                        visionImage.current = el.image;
                        setShowImage(true);
                      }}
                    >
                      {t("tables.common.image")}
                    </span>
                  </td>
                  <td>
                    <button
                      className="bg-red-100 p-2 rounded-full cursor-pointer transition-colors hover:bg-red-500 hover:text-white"
                      onClick={() => {
                        visionDelete.current = el._id;
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

      {showAddVision && (
        <ModalWindow onClose={() => setShowAddVision(false)}>
          <AddVisionForm
            onSuccess={() => {
              setShowAddVision(false);
              fetchAllVisions();
            }}
          />
        </ModalWindow>
      )}

      {showConfirm && (
        <Confirm
          about={t("messages.confirmDeleteVision")}
          onClose={() => {
            visionDelete.current = "";
            setShowConfirm(false);
          }}
          onConfirm={() => {
            deleteVision();
            setShowConfirm(false);
          }}
        />
      )}

      {showImage &&
        createPortal(
          <DisplayImage
            onClose={() => {
              setShowImage(false);
              visionImage.current = null;
            }}
            imgUrl={visionImage.current}
          />,
          document.body
        )}
    </div>
  );
}

export default VisionAdmin;
