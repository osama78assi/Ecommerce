import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { MdDelete } from "react-icons/md";
import { RotatingLines } from "react-loader-spinner";
import { toast } from "react-toastify";
import SummaryApi from "../../common";
import Confirm from "../ui/Confirm";
import ErrorComponent from "../ui/ErrorComponent";
import AddGoalForm from "./AddGoalForm";
import EmptyData from "../ui/EmptyData";
import ModalWindow from "./ModalWindow";
import Upload from "./Upload";

function GoalsAdmin() {
  const [isLoading, setIsLoading] = useState(true);
  const [err, setErr] = useState(false);
  const [data, setData] = useState([]);
  const [showAddGoal, setShowAddGoal] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const { t } = useTranslation();

  const goalDelete = useRef();

  async function fetchAllGoals() {
    try {
      setIsLoading(true);
      setErr(false);
      const req = await fetch(SummaryApi.getGoalsData.url, {
        method: SummaryApi.getGoalsData.method,
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

  async function deleteGoal() {
    try {
      const req = await fetch(
        `${SummaryApi.deleteGoal.url}/${goalDelete.current}`,
        {
          method: SummaryApi.deleteGoal.method,
          credentials: "include",
        }
      );

      const res = await req.json();
      if (res.success) {
        toast.success(t("messages.successDeleteGoal"));
        fetchAllGoals();
      } else {
        throw new Error("Soemthing went wrong");
      }
    } catch (err) {
      console.log(err.message);
      toast.error(t("messages.errDeleteGoal"));
    }
  }

  useEffect(() => {
    fetchAllGoals();
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
        <ErrorComponent refetchFunction={fetchAllGoals} disable={isLoading} />
      </div>
    );
  }

  return (
    <div className="bg-white pb-4">
      <Upload
        buttonTitle={t("forms.admin.uploadGoalOpen")}
        title={t("forms.admin.uploadGoalsTitle")}
        hanldeClick={() => setShowAddGoal(true)}
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
                  <td className="py-2">
                    <button
                      className="bg-red-100 p-2 rounded-full cursor-pointer transition-colors hover:bg-red-500 hover:text-white"
                      onClick={() => {
                        goalDelete.current = el._id;
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

      {showAddGoal && (
        <ModalWindow onClose={() => setShowAddGoal(false)}>
          <AddGoalForm
            onSuccess={() => {
              setShowAddGoal(false);
              fetchAllGoals();
            }}
          />
        </ModalWindow>
      )}

      {showConfirm && (
        <Confirm
          about={t("messages.confirmDeleteGoal")}
          onClose={() => setShowConfirm(false)}
          onConfirm={() => {
            deleteGoal();
            setShowConfirm(false);
          }}
        />
      )}
    </div>
  );
}

export default GoalsAdmin;
