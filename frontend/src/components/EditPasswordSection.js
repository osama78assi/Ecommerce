import { useState } from "react";
import { toast } from "react-toastify";
import SummaryApi from "../common";
import Confirm from "./Confirm";
import EditUserInput from "./EditUserInput";
import EditUserSection from "./EditUserSection";
import SubmitBtn from "./SubmitBtn";

function EditPasswordSection({ isLoading, setIsLoading }) {
  const [userOldPassword, setUserOldPassword] = useState("");
  const [userNewPassword, setUserNewPassword] = useState("");
  const [confirmAbout, setConfirmAbout] = useState("");

  async function handleChangePassword() {
    setConfirmAbout("");
    try {
      if (userOldPassword === "") {
        toast.warn("You must confirm your old password");
        return;
      }

      if (userNewPassword === "") {
        toast.warn("You must add the new password");
        return;
      }
      setIsLoading?.(true);

      const res = await fetch(SummaryApi.updatePassword.url, {
        method: SummaryApi.updatePassword.method,
        body: JSON.stringify({
          oldPassword: userOldPassword,
          newPassword: userNewPassword,
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
        toast.error(data.message);
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
          onConfirm={handleChangePassword}
        />
      ) : null}

      <EditUserSection
        title="Change Password"
        classes="self-start m-auto flex-col w-[75%] space-y-3 "
      >
        <EditUserInput
          val={userOldPassword}
          setVal={(val) => setUserOldPassword(val)}
          label="Confirm The Old Password"
          type="password"
          id="userOldPassword"
          name="userOldPassword"
          placeholder="Confirm Password"
        />

        <EditUserInput
          val={userNewPassword}
          setVal={(val) => setUserNewPassword(val)}
          label="Enter The New Password"
          type="password"
          id="userNewPassword"
          name="userNewPassword"
          placeholder="Enter New Password"
        />
        <SubmitBtn
          title="Confirm Change"
          dis={isLoading || !userOldPassword || !userNewPassword}
          handleClick={() => {
            setConfirmAbout("update the password ?");
          }}
        />
      </EditUserSection>
    </>
  );
}

export default EditPasswordSection;
