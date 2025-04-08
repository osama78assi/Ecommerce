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
import AddSliderForm from "./AddSliderForm";
import ModalWindow from "./ModalWindow";
import Upload from "./Upload";

function SliderAdmin() {
  const [isLoading, setIsLoading] = useState(true);
  const [err, setErr] = useState(false);
  const [showAddSlider, setShowAddSlider] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [data, setData] = useState([]);
  const { t } = useTranslation();

  const sliderDelete = useRef(null);
  const sliderImage = useRef(null);

  async function fetchSliderData() {
    try {
      setIsLoading(true);

      const req = await fetch(SummaryApi.getSliderData.url, {
        method: SummaryApi.getSliderData.method,
      });

      const res = await req.json();
      if (res.success) {
        setData(res.data);
      } else {
        throw new Error(res.message);
      }
    } catch (err) {
      console.log(err.message);
      setErr(true);
      toast.error(t("message.errGetSlider"));
    } finally {
      setIsLoading(false);
    }
  }

  async function deleteSliderData() {
    try {
      const req = await fetch(
        `${SummaryApi.deleteSlider.url}/${sliderDelete.current}`,
        {
          method: SummaryApi.deleteSlider.method,
          credentials: "include",
        }
      );

      const res = await req.json();
      if (res.success) {
        toast.success(t("messages.successDeleteSlider"));
        fetchSliderData();
      } else {
        throw new Error("Something went wrong");
      }
    } catch (err) {
      toast.error(t("messages.errDeleteSlider"));
      console.log(err.message);
    } finally {
      sliderDelete.current = null;
    }
  }

  useEffect(() => {
    fetchSliderData();
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
        <ErrorComponent refetchFunction={fetchSliderData} disable={isLoading} />
      </div>
    );
  }

  return (
    <div className="bg-white pb-4">
      <Upload
        buttonTitle={t("forms.admin.uploadBtnSliderOpen")}
        title={t("forms.admin.uploadSliderTitle")}
        hanldeClick={() => setShowAddSlider(true)}
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
                    <td key={item._id} className="p-2">
                      {item.text}
                    </td>
                  ))}

                  {el.description.map((item) => (
                    <td key={item._id} className="p-2">
                      {item.text}
                    </td>
                  ))}

                  <td className="p-2">
                    <span
                      className="underline text-blue-700 cursor-pointer"
                      onClick={() => {
                        sliderImage.current = el.img;
                        setShowImage(true);
                      }}
                    >
                      {t("tables.common.image")}
                    </span>
                  </td>
                  <td className="p-2">
                    <button
                      className="bg-red-100 p-2 rounded-full cursor-pointer transition-colors hover:bg-red-500 hover:text-white"
                      onClick={() => {
                        sliderDelete.current = el._id;
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

      {showAddSlider && (
        <ModalWindow onClose={() => setShowAddSlider(false)}>
          <AddSliderForm
            onSuccess={() => {
              setShowAddSlider(false);
              fetchSliderData();
            }}
          />
        </ModalWindow>
      )}

      {showConfirm && (
        <Confirm
          about={t("messages.confirmDeleteSlider")}
          onClose={() => setShowConfirm(false)}
          onConfirm={() => {
            deleteSliderData();
            setShowConfirm(false);
          }}
        />
      )}

      {showImage &&
        createPortal(
          <DisplayImage
            onClose={() => {
              setShowImage(false);
              sliderImage.current = null;
            }}
            imgUrl={sliderImage.current}
          />,
          document.body
        )}
    </div>
  );
}

export default SliderAdmin;
