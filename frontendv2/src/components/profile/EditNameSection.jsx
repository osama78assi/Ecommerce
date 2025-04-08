import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import SummaryApi from "../../common";
import { setUserDetails } from "../../store/userSlice";
import Confirm from "../ui/Confirm";
import SubmitBtn from "../ui/SubmitBtn";
import EditUserInput from "./EditUserInput";
import EditUserSection from "./EditUserSection";

function EditNameSection({ isLoading, setIsLoading }) {
  const { t } = useTranslation();
  const user = useSelector((state) => state?.user?.user);
  const [userName, setUserName] = useState("");
  const dispatch = useDispatch();
  const [confirmAbout, setConfirmAbout] = useState("");

  async function handleChangeName() {
    setConfirmAbout("");
    try {
      if (userName === "") {
        toast.warn(t("messages.errUsernameReq"));
        return;
      }
      if (/\W+/g.test(userName)) {
        toast.warn(t("messages.errSpecialNameChars"));
        return;
      }
      if (userName.length > 50) {
        toast.warn(t("messages.errUsernameLong"));
        return;
      }
      if (userName === user?.name) {
        toast.warn(t("messages.errUsernameSame"));
        return;
      }

      setIsLoading?.(true);
      const res = await fetch(SummaryApi.updateName.url, {
        method: SummaryApi.updateName.method,
        body: JSON.stringify({ newName: userName.trim() }),
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
        toast.error(t("messages.errUnkown"));
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
        title={t("forms.profile.changeNameTitle")}
        classes="self-start m-auto w-[90%] gap-2 flex-col sm:flex-row"
      >
        <EditUserInput
          val={userName}
          setVal={(val) => setUserName(val)}
          label={t("forms.profile.nameField.label")}
          type="text"
          id="userName"
          name="userName"
          placeholder={t("forms.profile.nameField.placeholder")}
        />
        <SubmitBtn
          title={t("forms.profile.confirm")}
          dis={isLoading || !userName}
          handleClick={() => {
            setConfirmAbout(t("forms.profile.nameField.confirmChange"));
          }}
          classes="w-[75%] mx-auto sm:w-fit sm:mx-0"
        />
      </EditUserSection>
    </>
  );
}

export default EditNameSection;
