import { useEffect, useState } from "react";
import {
  FaHandHoldingDollar,
  FaHandHoldingHand,
  FaPeopleGroup,
} from "react-icons/fa6";
import HeaderTag from "../ui/HeaderTag";
import Goal from "./Goal";

function Goals() {
  const [goals, setGoals] = useState([
    {
      id: "test1",
      title: "Helping",
      content:
        "We care about helping each other meaning we really have t oconsider all people as our family",
    },
    {
      id: "test2",
      title: "Donate",
      content:
        "Donation is something very speical as it's an important thing to keep up so we will give these money to who desreve it",
    },
    {
      id: "test3",
      title: "Family",
      content:
        "As we said and always will say all of you make our family and you children is our in the end",
    },
  ]);

  useEffect(() => {
    // Fetch the data here
  }, []);

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
      <HeaderTag title="Goals" />

      <div className="container mx-auto p-8 py-14">
        <div className="flex flex-col justify-between gap-[30px] md:flex-row">
          {goals.map((item, index) => (
            <Goal
              key={item.id}
              content={item.content}
              title={item.title}
              icon={choseIcon(index)}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default Goals;
