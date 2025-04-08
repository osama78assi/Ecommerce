import { useState } from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FaRegCircleUser } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import SummaryApi from "../common";
import { getCartCount } from "../store/cartSlice";
import { fetchCurrentUser } from "../store/userSlice";
// import Context from "../context";

function Login() {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  // const { fetchUserDetails, fetchUserAddToCart } = useContext(Context);

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const dataResponse = await fetch(SummaryApi.signIn.url, {
        method: SummaryApi.signIn.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const dataApi = await dataResponse.json();

      if (dataApi.success) {
        toast.success(t("messages.successLogin"));
        dispatch(fetchCurrentUser());
        dispatch(getCartCount());
        navigate("/");
        // fetchUserDetails();
        // fetchUserAddToCart();
      }

      if (dataApi.error) {
        throw new Error("Something went wrong");
      }
    } catch (err) {
      console.log(err.message);
      toast.error(t("messages.errLogin"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{t("SEO.titles.login")}</title>
      </Helmet>

      <section id="login">
        <div className="mx-auto container p-4">
          <div className="bg-white p-5 w-full max-w-sm mx-auto section-box-shadow rounded-lg border-[1px] border-[var(--primary-color-900)]">
            <div className="w-20 h-20 mx-auto">
              <FaRegCircleUser className="text-[5rem] rounded-[50%] fill-[var(--primary-color-900)]" />
            </div>

            <form className="pt-6 flex flex-col gap-2" onSubmit={handleSubmit}>
              <div className="grid">
                <label>{t("forms.login.emailField.label")}</label>
                <div className="bg-slate-100 p-2">
                  <input
                    type="email"
                    placeholder={t("forms.login.emailField.placeholder")}
                    name="email"
                    value={data.email}
                    onChange={handleOnChange}
                    className="w-full h-full outline-none bg-transparent"
                  />
                </div>
              </div>

              <div>
                <label>{t("forms.login.passwordField.label")}</label>
                <div className="bg-slate-100 p-2 flex">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder={t("forms.login.passwordField.placeholder")}
                    value={data.password}
                    name="password"
                    onChange={handleOnChange}
                    className="w-full h-full outline-none bg-transparent"
                  />
                  <div
                    className="cursor-pointer text-xl"
                    onClick={() => setShowPassword((preve) => !preve)}
                  >
                    <span>{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
                  </div>
                </div>
                {/* <Link
                to={"/forgot-password"}
                className="block w-fit ml-auto hover:underline hover:text-red-600"
              >
                Forgot password ?
              </Link> */}
              </div>

              <button
                disabled={isLoading}
                className="bg-primary-900 hover:bg-primary-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6"
              >
                {t("forms.login.loginBtn")}
              </button>
            </form>

            <p className="my-5">
              {t("forms.login.askAccount")}
              <Link
                to={"/sign-up"}
                className="text-[var(--primary-color-1100)] hover:underline"
              >
                {t("forms.login.signupBtn")}
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default Login;
