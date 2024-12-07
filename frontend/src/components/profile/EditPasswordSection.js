import { useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import SummaryApi from "../../common";
import Confirm from "../ui/Confirm";
import SubmitBtn from "../ui/SubmitBtn";
import EditUserInput from "./EditUserInput";
import EditUserSection from "./EditUserSection";

function EditPasswordSection({ isLoading, setIsLoading }) {
  const { t } = useTranslation();
  const [userOldPassword, setUserOldPassword] = useState("");
  const [userNewPassword, setUserNewPassword] = useState("");
  const [confirmAbout, setConfirmAbout] = useState("");

  async function handleChangePassword() {
    setConfirmAbout("");
    try {
      if (userOldPassword === "") {
        toast.warn(t("messages.errOldPasswordReq"));
        return;
      }

      if (userNewPassword === "") {
        toast.warn(t("messages.errNewPasswordReq"));
        return;
      }
      setIsLoading?.(true);

      const res = await fetch(SummaryApi.updatePassword.url, {
        method: SummaryApi.updatePassword.method,
        body: JSON.stringify({
          oldPassword: userOldPassword,
          newPassword: userNewPassword.trim(),
        }),
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      if (data.success) {
        toast.success(data.message);
        setUserOldPassword("");
        setUserNewPassword("");
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
      <span className="w-f"></span>
      {confirmAbout !== "" ? (
        <Confirm
          about={confirmAbout}
          onClose={() => {
            setConfirmAbout("");
          }}
          onConfirm={handleChangePassword}
        />
      ) : null}

      <EditUserSection
        title={t("forms.profile.changePasswordTitle")}
        classes="self-start m-auto flex-col w-[90%] space-y-3 "
      >
        <EditUserInput
          val={userOldPassword}
          setVal={(val) => setUserOldPassword(val)}
          label={t("forms.profile.oldPasswordField.label")}
          type="password"
          id="userOldPassword"
          name="userOldPassword"
          placeholder={t("forms.profile.oldPasswordField.placeholder")}
        />

        <EditUserInput
          val={userNewPassword}
          setVal={(val) => setUserNewPassword(val)}
          label={t("forms.profile.newPasswordField.label")}
          type="password"
          id="userNewPassword"
          name="userNewPassword"
          placeholder={t("forms.profile.newPasswordField.placeholder")}
        />
        <SubmitBtn
          title={t("forms.profile.confirm")}
          dis={isLoading || !userOldPassword || !userNewPassword}
          handleClick={() => {
            setConfirmAbout(t("forms.profile.oldPasswordField.confirmChange"));
          }}
          classes="self-center w-[75%] sm:w-fit sm:self-end"
        />
      </EditUserSection>
    </>
  );
}

export default EditPasswordSection;
