import { useState } from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FaPen, FaRegCircleUser } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import SummaryApi from "../common";

function SignUp() {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
    profilePic: "",
  });
  const [imgUrl, setImgUrl] = useState("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  function handleUploadPic(e) {
    const file = e.target.files[0];
    if (file.size > 5 * 1024 * 1024) {
      toast.warn(t("messages.errBigImage"));
      return;
    }

    const reader = new FileReader();
    reader.onload = function (event) {
      const previewImageUrl = event.target.result;
      setImgUrl(previewImageUrl);
    };

    reader.readAsDataURL(file); // Read file as data URL

    setData((preve) => {
      return {
        ...preve,
        profilePic: file,
      };
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (/\W+/.test(data.name)) {
        toast.warn(t("messages.errSpecialNameChars"));
        return;
      }

      if (data.password !== data.confirmPassword) {
        toast.warn(t("messages.errPasswordConfirm"));
        return;
      }
      setIsLoading(true);

      const formData = new FormData();
      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("name", data.name);
      formData.append("profilePic", data.profilePic);

      const dataResponse = await fetch(SummaryApi.signUP.url, {
        method: SummaryApi.signUP.method,
        body: formData,
      });

      const dataApi = await dataResponse.json();

      if (dataApi.success) {
        toast.success(t("messages.successSignup"));
        navigate("/login");
      }

      if (dataApi.error) {
        throw new Error("Something went wrong");
      }
    } catch (err) {
      console.log(err.message);
      toast.error(t("messages.errSignup"));
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{t("SEO.titles.signup")}</title>
      </Helmet>

      <section id="signup">
        <div className="mx-auto container p-4">
          <div className="bg-white p-5 w-full max-w-sm mx-auto section-box-shadow rounded-lg border-[1px] border-[var(--primary-color-900)]">
            <div className="w-20 h-20 mx-auto relative rounded-full">
              <div className="w-[5rem] h-[5rem]">
                {imgUrl ? (
                  <img
                    src={imgUrl}
                    alt="user"
                    className="object-cover w-full h-full rounded-full"
                  />
                ) : (
                  <FaRegCircleUser className="text-[5rem] rounded-[50%]" />
                )}
              </div>
              <form>
                <label>
                  <div className="text-xs bg-opacity-80 bg-primary-900 p-2 cursor-pointer text-center absolute bottom-[-10px] right-[-1.5rem] w-content rounded-full">
                    <FaPen className="fill-white text-[1.2rem]" />
                  </div>
                  <input
                    accept="image/*"
                    type="file"
                    className="hidden"
                    onChange={handleUploadPic}
                  />
                </label>
              </form>
            </div>

            <form className="pt-6 flex flex-col gap-2" onSubmit={handleSubmit}>
              <div className="grid">
                <label>{t("forms.signup.nameField.label")}</label>
                <div className="bg-slate-100 p-2">
                  <input
                    type="text"
                    placeholder={t("forms.signup.nameField.placeholder")}
                    name="name"
                    value={data.name}
                    onChange={handleOnChange}
                    required
                    className="w-full h-full outline-none bg-transparent"
                  />
                </div>
              </div>
              <div className="grid">
                <label>{t("forms.signup.emailField.label")}</label>
                <div className="bg-slate-100 p-2">
                  <input
                    type="email"
                    placeholder={t("forms.signup.emailField.placeholder")}
                    name="email"
                    value={data.email}
                    onChange={handleOnChange}
                    required
                    className="w-full h-full outline-none bg-transparent"
                  />
                </div>
              </div>

              <div>
                <label>{t("forms.signup.passwordField.label")}</label>
                <div className="bg-slate-100 p-2 flex">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder={t("forms.signup.passwordField.placeholder")}
                    value={data.password}
                    name="password"
                    onChange={handleOnChange}
                    required
                    className="w-full h-full outline-none bg-transparent"
                  />
                  <div
                    className="cursor-pointer text-xl"
                    onClick={() => setShowPassword((preve) => !preve)}
                  >
                    <span>{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
                  </div>
                </div>
              </div>

              <div>
                <label>{t("forms.signup.confirmPasswordField.label")}</label>
                <div className="bg-slate-100 p-2 flex">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder={t(
                      "forms.signup.confirmPasswordField.placeholder"
                    )}
                    value={data.confirmPassword}
                    name="confirmPassword"
                    onChange={handleOnChange}
                    required
                    className="w-full h-full outline-none bg-transparent"
                  />

                  <div
                    className="cursor-pointer text-xl"
                    onClick={() => setShowConfirmPassword((preve) => !preve)}
                  >
                    <span>
                      {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                  </div>
                </div>
              </div>

              <button
                disabled={isLoading}
                className="bg-primary-900 hover:bg-primary-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6"
              >
                {t("forms.signup.signupBtn")}
              </button>
            </form>

            <p className="my-5">
              {t("forms.signup.askAccount")}
              <Link
                to={"/login"}
                className="text-[var(--primary-color-1100)]  hover:underline"
              >
                {t("forms.signup.loginBtn")}
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default SignUp;
