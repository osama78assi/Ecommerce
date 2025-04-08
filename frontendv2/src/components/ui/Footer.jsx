import { useTranslation } from "react-i18next";
import { FaEnvelope, FaPhone } from "react-icons/fa";
import { FaMobileButton } from "react-icons/fa6";
import { Link } from "react-router-dom";
import Logo from "./Logo";

function Footer() {
  const { t } = useTranslation();
  const footerNavClasses =
    "border-b-2 border-[var(--primary-color-1100)] p-2 cursor-pointer";
  const conectNavClasses =
    "flex justify-between items-center p-2 border-b-[1px] border-b-[var(--primary-color-1100)]";
  const conectNavIconsClasses = "text-xl fill-[var(--primary-color-1100)]";

  return (
    <footer className="bg-[#373e4a14] relative bottom-0 min-h-[64px]">
      <div className="absolute left-0 bottom-0 w-full h-full z-[1]" />
      <div className="container mx-auto p-6 relative z-[2]">
        <div className="flex justify-center items-center flex-col gap-5 md:flex-row md:justify-between md:gap-0">
          <Logo w="200px" h="200px" />

          <div className="w-[250px] flex flex-col justify-center">
            <h1 className="text-2xl font-semibold mb-3">
              {t("footer.contactWithUs")}
            </h1>
            <ul dir="ltr">
              <li className={conectNavClasses}>
                <FaPhone className={conectNavIconsClasses} />
                <span>011 5436822</span>
              </li>
              <li className={conectNavClasses}>
                <FaMobileButton className={conectNavIconsClasses} />
                <span>+963 936 574 444</span>
              </li>
              <li className={conectNavClasses}>
                <FaEnvelope className={conectNavIconsClasses} />
                <span>alsakhrasyria@gmail.com</span>
              </li>
            </ul>
          </div>

          <div className="w-[250px]">
            <h1 className="text-[var(--primary-color-1100)] text-2xl font-bold">
              {t("footer.quickLinks")}
            </h1>
            <ul className="space-y-5">
              <li className={footerNavClasses}>
                <Link to="/about-us" className="w-full">
                  {t("navbar.aboutUs")}
                </Link>
              </li>
              <li className={footerNavClasses}>
                <Link to="/vision" className="w-full">
                  {t("navbar.vision")}
                </Link>
              </li>
              <li className={footerNavClasses}>
                <Link to="/" className="w-full">
                  {t("navbar.home")}
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="w-full p-2 text-center font-bold italic">
          {t("footer.rights")}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
