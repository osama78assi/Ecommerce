import { useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import SummaryApi from "../../common";
import ROLE from "../../common/role";
import AdminInput from "./AdminInput";

function AddUserFrom({ onSucess }) {
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();
  const [role, setRole] = useState(ROLE.GENERAL);
  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setRole((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    try {
      const formData = new FormData(e.target);
      formData.append("profilePic", "");
      formData.entries().forEach((element) => {
        if (
          element[0] === "name" ||
          element[0] === "email" ||
          element[0] === "password"
        ) {
          formData.delete(element[0]);
          formData.append(element[0], element[1].trim());
        }
      });

      const dataResponse = await fetch(SummaryApi.signUP.url, {
        method: SummaryApi.signUP.method,
        body: formData,
      });

      const dataApi = await dataResponse.json();

      if (dataApi.success) {
        toast.success(t("messages.successCreateUser"));
        onSucess();
      }

      if (dataApi.error) {
        toast.error(dataApi.message);
      }
    } catch (err) {
      console.log(err.message);
      setIsLoading(false);
    }
  }

  return (
    <form className="pt-6 flex flex-col gap-2" onSubmit={handleSubmit}>
      <AdminInput
        id="name"
        placeholder={t("forms.admin.nameField.placeholder")}
        name="name"
        type="text"
        classes="p-2 bg-slate-100 border rounded disabled:cursor-not-allowed"
        required={true}
        label={t("forms.admin.nameField.label")}
        sterilizer={(val) => {
          if (/\W+/.test(val)) {
            toast.warn(t("messages.errSpecialNameChars"));
            return false;
          }
          if (val.length >= 150) {
            toast.warn(t("messages.errUsernameLong"));
            return false;
          }
          return true;
        }}
      />

      <AdminInput
        id="email"
        placeholder={t("forms.admin.emailField.placeholder")}
        name="email"
        type="email"
        classes="p-2 bg-slate-100 border rounded disabled:cursor-not-allowed"
        required={true}
        disabled={isLoading}
        label={t("forms.admin.emailField.label")}
      />

      <AdminInput
        id="password"
        placeholder={t("forms.admin.passwordField.placeholder")}
        name="password"
        type={"password"}
        classes="p-2 bg-slate-100 border rounded disabled:cursor-not-allowed"
        required={true}
        disabled={isLoading}
        label={t("forms.admin.passwordField.label")}
      />

      <div>
        <label>{t("forms.admin.selectRoleField.label")}</label>
        <div className="bg-slate-100 p-2 flex">
          <select
            disabled={isLoading}
            name="role"
            value={role}
            onChange={handleOnChange}
            required
            className="w-full h-full outline-none bg-transparent disabled:cursor-not-allowed"
          >
            <option value={ROLE.ADMIN}>{ROLE.ADMIN}</option>
            <option value={ROLE.GENERAL}>{ROLE.GENERAL}</option>
          </select>
        </div>
      </div>

      <button
        disabled={isLoading}
        className="bg-primary-900 hover:bg-primary-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6 disabled:cursor-not-allowed"
      >
        {t("forms.admin.addUserBtn")}
      </button>
    </form>
  );
}

export default AddUserFrom;
