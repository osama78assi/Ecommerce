import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaBars } from "react-icons/fa";
import { FaRegCircleUser } from "react-icons/fa6";
import { GrSearch } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import ROLE from "../../common/role";
import { useLazyloadingImg } from "../../hooks/useLazyLoadingImg";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import { getCartCount } from "../../store/cartSlice";
import Logo from "./Logo";
import SelectLang from "./SelectLang";

function Header() {
  const { t, i18n } = useTranslation();
  const [showSearch, setShowSearch] = useState(false);
  const [toggleNav, setToggleNav] = useState(() => {
    if (window.matchMedia("(max-width: 1025px)").matches) {
      return true;
    } else {
      return false;
    }
  });
  const [showToggledNav, setShowtoggledNav] = useState(false);
  const isLoadingCart = useSelector((state) => state.cart.isLoading);
  const count = useSelector((state) => state.cart.count);
  const user = useSelector((state) => state?.user?.user);
  const imgUrl = useLazyloadingImg(user?.profilePic);
  const navigate = useNavigate();
  const navTogglerRef = useOutsideClick((e) => {
    if (!e.target.closest("#toggler-nav")) setShowtoggledNav(false);
  });
  const searchRef = useOutsideClick((e) => {
    if (!e.target.closest("#input-toggler")) setShowSearch(false);
  });
  const dispatch = useDispatch();

  const navItemClasses = `flex justify-between ${
    toggleNav ? "w-full" : ""
  } items-center gap-3 transition-all h-full p-2 hover:bg-slate-100`;
  const textNavItemClassess = "text-base font-semibold";

  const handleSearch = (e) => {
    const { value } = e.target;
    if (e.key === "Enter") {
      if (value !== "") {
        setShowSearch(false);
        navigate(`/search?q=${value}`);
      }
    }
  };

  // Either show popup or search immediately
  function handleSearchSmallMedia() {
    if (window.matchMedia("(min-width: 1024px)").matches) {
      const value = searchRef.current?.value;
      if (value) {
        setShowSearch(false);
        navigate(`/search?q=${value}`);
      }
    } else {
      setShowSearch((s) => !s);
    }
  }

  function handleCloseNav() {
    setShowtoggledNav(false);
  }

  useEffect(() => {
    // This feature for logged in users
    if (user !== null) {
      dispatch(getCartCount());
    }
  }, [user]);

  // To fix the search visibility when user resize the window
  useEffect(() => {
    function handleResize() {
      if (window.matchMedia("(min-width: 1024px)").matches) {
        setShowSearch(false);
      }
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // To show/hide the nav on small media

  useEffect(() => {
    function handleResize(e) {
      if (window.matchMedia("(max-width: 1025px)").matches) {
        setToggleNav(true);
      } else {
        setToggleNav(false);
      }
    }

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // To search when click Enter
  useEffect(() => {
    const ele = searchRef.current;
    if (ele) {
      ele.addEventListener("keyup", handleSearch);
    }

    return () => {
      ele.removeEventListener("keyup", handleSearch);
    };
  }, []);

  return (
    <header className="h-16 shadow-xl bg-white sticky w-full z-40 top-0 ">
      <div className=" h-full mx-auto flex items-center px-4 justify-between">
        <div className="flex align-middle justify-center gap-4">
          <Link to={"/"}>
            <Logo w={90} h={50} />
          </Link>
        </div>
        {/* Search */}
        <div className="w-[12rem] items-center justify-between max-w-sm border rounded-full focus-within:shadow lg:flex static sm:relative lg:overflow-hidden">
          <div
            className={`${
              showSearch
                ? `absolute -bottom-[4rem] ${
                    i18n.language === "ar" ? "right-0" : "left-0"
                  } w-[250px] h-[50px] z-50 p-1 flex items-center justify-center shadow-2xl`
                : ""
            }`}
          >
            <input
              ref={searchRef}
              type="text"
              placeholder={t("navbar.searchPlaceholder")}
              className={`w-full outline-none lg:flex px-2 ${
                showSearch
                  ? "p-4 border-[1px] rounded-lg border-slate-900"
                  : "hidden"
              }`}
            />
          </div>
          <div
            className="rounded-full text-lg min-w-[50px] h-8 bg-primary-700 hover:bg-primary-900 transition-colors flex items-center justify-center lg:rounded-r-full text-white cursor-pointer "
            onClick={handleSearchSmallMedia}
            id="input-toggler"
          >
            <GrSearch />
          </div>
        </div>

        {toggleNav && (
          <button
            id="toggler-nav"
            className="p-1 bg-slate-100 rounded-lg"
            onClick={() => setShowtoggledNav((s) => !s)}
          >
            <FaBars className="text-4xl fill-[var(--primary-color-700)]" />
          </button>
        )}
        {/*Main Nav */}
        <div
          ref={navTogglerRef}
          className={`flex gap-2 h-full ${
            toggleNav
              ? `${
                  !showToggledNav ? "hidden" : "!block space-y-3"
                } absolute !h-fit flex-col right-0 w-full mt-4 top-12 p-1 bg-stone-200 shadow-2xl rounded-b-lg rounded-l-lg !items-start border-[1px] border-[var(--primary-color-1100)]`
              : ""
          }`}
        >
          <NavLink to={"/"} className={navItemClasses} onClick={handleCloseNav}>
            <span className={`${textNavItemClassess} `}>
              {t("navbar.home")}
            </span>
          </NavLink>

          <SelectLang />

          <NavLink
            to={"/about-us"}
            className={navItemClasses}
            onClick={handleCloseNav}
          >
            <span className={`${textNavItemClassess} `}>
              {t("navbar.aboutUs")}
            </span>
          </NavLink>

          <NavLink
            to={"/vision"}
            className={navItemClasses}
            onClick={handleCloseNav}
          >
            <span className={`${textNavItemClassess} `}>
              {t("navbar.vision")}
            </span>
          </NavLink>

          {user?._id && (
            <NavLink
              to="/profile"
              className={navItemClasses}
              onClick={handleCloseNav}
            >
              <span className={`${textNavItemClassess} `}>
                {t("navbar.profile")}
              </span>

              {/* If there is an image then loading it async otherwise render an icon */}
              {user?.profilePic ? (
                imgUrl === "" ? (
                  <span className="w-10 h-10 rounded-full bg-gray-500 animate-pulse" />
                ) : (
                  <img
                    src={imgUrl}
                    className="w-10 h-10 rounded-full object-cover"
                    alt={user?.name}
                  />
                )
              ) : (
                <FaRegCircleUser className="text-2xl fill-[var(--color-primary-700)]" />
              )}
            </NavLink>
          )}

          {user?.role === ROLE.ADMIN && (
            <NavLink
              to={"/admin-panel/all-products"}
              className={navItemClasses}
              onClick={handleCloseNav}
            >
              <span className={`${textNavItemClassess} `}>
                {t("navbar.adminPanel")}
              </span>
            </NavLink>
          )}

          <NavLink
            to={"/store"}
            className={`${navItemClasses}`}
            onClick={handleCloseNav}
          >
            <span className={`${textNavItemClassess} `}>
              {t("navbar.store")}
            </span>
          </NavLink>

          {user?._id && (
            <NavLink
              to={"/cart"}
              className={`${navItemClasses}`}
              onClick={handleCloseNav}
            >
              <span className={`${textNavItemClassess} relative`}>
                {t("navbar.cart")}{" "}
                <div
                  className={`bg-primary-700 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute top-[-0.4rem] right-[-1rem] ${
                    isLoadingCart ? "animate-pulse" : ""
                  }`}
                >
                  <p className="text-sm">{isLoadingCart ? "" : count}</p>
                </div>
              </span>
            </NavLink>
          )}

          {!user?._id && (
            <NavLink
              to={"/login"}
              className={`${navItemClasses} transition-colors`}
              onClick={handleCloseNav}
            >
              <span className={textNavItemClassess}>{t("navbar.login")}</span>
            </NavLink>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
