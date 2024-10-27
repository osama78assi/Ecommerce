import React from "react";
import { FaEnvelope, FaPhone } from "react-icons/fa";
import { FaMobileButton } from "react-icons/fa6";
import { Link } from "react-router-dom";
import Logo from "./Logo";

function Footer() {
  const footerNavClasses =
    "border-b-2 border-[var(--primary-color-1100)] p-2 cursor-pointer";
  const conectNavClasses =
    "flex justify-between items-center p-2 border-b-[1px] border-b-[var(--primary-color-1100)]";
  const conectNavIconsClasses = "text-xl fill-[var(--primary-color-1100)]";

  return (
    <footer
      className="bg-slate-50 relative bottom-0"
      style={{
        backgroundImage: "url(/footer-pattren.png)",
        backgroundSize: "cover",
      }}
    >
      <div className="absolute left-0 bottom-0 w-full h-full bg-[rgba(156,175,82,0.45)] z-[1]" />
      <div className="container mx-auto p-6 relative z-[2]">
        <div className="flex justify-center items-center flex-col gap-5 md:flex-row md:justify-between md:gap-0">
          <Logo w="200px" h="200px" />

          <div className="w-[250px] flex flex-col justify-center">
            <h1 className="text-2xl font-semibold mb-3">Contact with us</h1>
            <ul>
              <li className={conectNavClasses}>
                <FaPhone className={conectNavIconsClasses} />
                <span>011 55053</span>
              </li>
              <li className={conectNavClasses}>
                <FaMobileButton className={conectNavIconsClasses} />
                <span>+963 999 999 999</span>
              </li>
              <li className={conectNavClasses}>
                <FaEnvelope className={conectNavIconsClasses} />
                <span>example@example.example</span>
              </li>
            </ul>
          </div>

          <div className="w-[250px]">
            <h1 className="text-[var(--primary-color-1100)] text-2xl font-bold">
              Quick links
            </h1>
            <ul className="space-y-5">
              <li className={footerNavClasses}>
                <Link to="/about-us" className="w-full">
                  About us
                </Link>
              </li>
              <li className={footerNavClasses}>
                <Link to="/vision" className="w-full">
                  Vision
                </Link>
              </li>
              <li className={footerNavClasses}>
                <Link to="/" className="w-full">
                  Home
                </Link>
              </li>
            </ul>
          </div>
        </div>

      </div>
      <div className="w-full p-2 bg-[#00000053] text-center">All rights reserved</div>
    </footer>
  );
}

export default Footer;
