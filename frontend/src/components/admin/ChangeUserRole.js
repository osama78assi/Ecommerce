import React, { useState } from "react";
// import { IoMdClose } from "react-icons/io";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import SummaryApi from "../../common";
import ROLE from "../../common/role";
import ModalWindow from "./ModalWindow";

const ChangeUserRole = ({ name, email, role, userId, onClose, callFunc }) => {
  const { t } = useTranslation();
  const [userRole, setUserRole] = useState(role);
  const [isLoading, setIsLoading] = useState(false);

  const handleOnChangeSelect = (e) => {
    setUserRole(e.target.value);

    console.log(e.target.value);
  };

  const updateUserRole = async () => {
    try {
      setIsLoading(true);
      const fetchResponse = await fetch(SummaryApi.updateUser.url, {
        method: SummaryApi.updateUser.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
          role: userRole,
        }),
      });

      const responseData = await fetchResponse.json();

      if (responseData.success) {
        toast.success(t("messages.successChangeRole"));
        onClose();
        callFunc();
      } else {
        toast.error(responseData.message)
      }

      console.log("role updated", responseData);
    } catch (err) {
      console.log(err.message);
      setIsLoading(false);
    }
  };

  return (
    // <div className="fixed top-0 bottom-0 left-0 right-0 w-full h-full z-10 flex justify-between items-center bg-slate-200 bg-opacity-50">
    //   <div className="mx-auto bg-white shadow-md p-4 w-full max-w-sm" ref={ref}>
    <ModalWindow onClose={onClose} classes="h-fit my-auto">
      <h1 className="pb-4 text-lg font-medium">{t("forms.admin.roleTitle")}</h1>

      <p>{t("forms.admin.nameLabel") + name}</p>
      <p>{t("forms.admin.emailLabel") + email}</p>

      <div className="flex items-center justify-between my-4">
        <p>{t("forms.admin.roleLabel")}</p>
        <select
          className="border px-4 py-1"
          value={userRole}
          onChange={handleOnChangeSelect}
        >
          {Object.values(ROLE).map((el) => {
            return (
              <option value={el} key={el}>
                {el}
              </option>
            );
          })}
        </select>
      </div>

      <button
        disabled={isLoading}
        className="w-fit mx-auto block py-1 px-3 rounded-full bg-red-600 text-white hover:bg-red-700"
        onClick={updateUserRole}
      >
        {t("forms.admin.editRoleBtn")}
      </button>
    </ModalWindow>
    //   </div>
    // </div>
  );
};

export default ChangeUserRole;
