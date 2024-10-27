import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import SummaryApi from "../../common";
import { setUserDetails } from "../../store/userSlice";
import Confirm from "../ui/Confirm";
import SubmitBtn from "../ui/SubmitBtn";
import EditUserInput from "./EditUserInput";
import EditUserSection from "./EditUserSection";

function EditNameSection({ isLoading, setIsLoading }) {
  const user = useSelector((state) => state?.user?.user);
  const [userName, setUserName] = useState("");
  const dispatch = useDispatch();
  const [confirmAbout, setConfirmAbout] = useState("");

  async function handleChangeName() {
    setConfirmAbout("");
    try {
      if (userName === "") {
        toast.warn("Add user name first");
        return;
      }
      if (/\W+/g.test(userName)) {
        toast.warn("Username mustn't have special chars");
        return;
      }
      if (userName.length > 50) {
        toast.warn("Username is too long");
        return;
      }
      if (userName === user?.name) {
        toast.warn("Username is the same. Change it please");
        return;
      }

      setIsLoading?.(true);
      const res = await fetch(SummaryApi.updateName.url, {
        method: SummaryApi.updateName.method,
        body: JSON.stringify({ newName: userName }),
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (data.success) {
        toast.success(data.message);
        dispatch(setUserDetails(data.data));
        setUserName("");
      }
      if (data.error) {
        toast.error("Something went wrong. Try again");
      }
    } catch (err) {
      console.log(err.message);
    } finally {
      setIsLoading?.(false);
    }
  }
  return (
    <>
      {confirmAbout !== "" ? (
        <Confirm
          about={confirmAbout}
          onClose={() => {
            setConfirmAbout("");
          }}
          onConfirm={handleChangeName}
        />
      ) : null}

      <EditUserSection
        title="Change User Name"
        classes="self-start m-auto w-[90%] gap-2 flex-col sm:flex-row"
      >
        <EditUserInput
          val={userName}
          setVal={(val) => setUserName(val)}
          label="Enter The New Name"
          type="text"
          id="userName"
          name="userName"
          placeholder="New Name"
          
        />
        <SubmitBtn
          title="Confirm"
          dis={isLoading || !userName}
          handleClick={() => {
            setConfirmAbout("update the name ?");
          }}
          classes="w-[75%] mx-auto sm:w-fit sm:mx-0"
        />
      </EditUserSection>
    </>
  );
}

export default EditNameSection;
