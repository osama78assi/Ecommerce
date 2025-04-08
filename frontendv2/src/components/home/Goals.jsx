import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  FaHandHoldingDollar,
  FaHandHoldingHand,
  FaPeopleGroup,
} from "react-icons/fa6";
import { toast } from "react-toastify";
import SummaryApi from "../../common";
import EmptyData from "../ui/EmptyData";
import HeaderTag from "../ui/HeaderTag";
import Goal from "./Goal";

function Goals({ setErr }) {
  const { t, i18n } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);
  const [goals, setGoals] = useState([]);

  const getData = useCallback(async function getData() {
    try {
      setIsLoading(true);
      const req = await fetch(SummaryApi.getGoalsData.url, {
        method: SummaryApi.getGoalsData.method,
      });

      const res = await req.json();

      if (res.success) {
        setGoals(res.data);
      } else {
        throw new Error(res.message);
      }
    } catch (err) {
      console.log(err.message);
      toast.error(t("messages.errGetGoals"));
      setErr?.(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  function choseIcon(index) {
    const iconClass = "text-3xl fill-[var(--primary-color-900)]";
    switch (index) {
      case 0:
        return <FaHandHoldingHand className={iconClass} />;
      case 1:
        return <FaHandHoldingDollar className={iconClass} />;
      case 2:
        return <FaPeopleGroup className={iconClass} />;
      default:
        return "";
    }
  }

  return (
    <>
      <HeaderTag title={t("headers.goals")} />

      <div className="container mx-auto p-8 py-14">
        <div className="flex flex-col justify-between gap-[30px] md:flex-row">
          {!isLoading && !goals.length ? (
            <EmptyData />
          ) : (
            goals.map((item, index) =>
              isLoading ? (
                <div key={index} className="basis-4/12 relative h-[15rem] bg-white animate-pulse" />
              ) : (
                <Goal
                  key={item._id}
                  description={
                    item?.description?.filter(
                      (item) => item.language === i18n.language
                    )[0]?.text
                  }
                  title={
                    item.title?.filter(
                      (item) => item.language === i18n.language
                    )[0]?.text
                  }
                  icon={choseIcon(index)}
                />
              )
            )
          )}
        </div>
      </div>
    </>
  );
}

export default Goals;
