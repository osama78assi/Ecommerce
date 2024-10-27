import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import SummaryApi from "../../common";
import { setUserDetails } from "../../store/userSlice";
import Confirm from "../ui/Confirm";
import SubmitBtn from "../ui/SubmitBtn";
import EditUserInput from "./EditUserInput";
import EditUserSection from "./EditUserSection";

function EditEmailSection({ isLoading, setIsLoading }) {
  const user = useSelector((state) => state?.user?.user);
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [confirmAbout, setConfirmAbout] = useState("");

  async function handleChangeEmail() {
    setConfirmAbout("");
    try {
      if (email === "") {
        toast.warn("Email shouldn't be empty.");
        return;
      }

      if (email === user?.email) {
        toast.warn("The new email is the same as old one. Change it please");
        return;
      }

      setIsLoading?.(true);
      const res = await fetch(SummaryApi.updateEmail.url, {
        method: SummaryApi.updateEmail.method,
        credentials: "include",
        body: JSON.stringify({ newEmail: email }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      if (data.success) {
        toast.success(data.message);
        dispatch(setUserDetails(data.data));
        setEmail("");
      }

      if (data.error) {
        toast.error("Something went wrong");
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
          onConfirm={handleChangeEmail}
        />
      ) : null}

      <EditUserSection
        title="Change Email"
        classes="self-start m-auto w-[90%] gap-2 flex-col sm:flex-row"
      >
        <EditUserInput
          val={email}
          setVal={(val) => setEmail(val)}
          label="Enter The New Email"
          type="email"
          id="email"
          name="email"
          placeholder="New Email"
        />
        <SubmitBtn
          title="Confirm"
          dis={isLoading || !email}
          handleClick={() => {
            setConfirmAbout("update the email ?");
          }}
          classes="w-[75%] mx-auto sm:w-fit sm:mx-0"
        />
      </EditUserSection>
    </>
  );
}

export default EditEmailSection;
