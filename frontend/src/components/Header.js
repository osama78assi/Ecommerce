import React, { useEffect, useState } from "react";
import { CgInfo } from "react-icons/cg";
import { FaBars, FaCalculator, FaShoppingCart } from "react-icons/fa";
import { FaRegCircleUser } from "react-icons/fa6";
import { GrSearch } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import ROLE from "../common/role";
import { useLazyloadingImg } from "../hooks/useLazyLoadingImg";
import { useOutsideClick } from "../hooks/useOutsideClick";
import { getCartCount } from "../store/cartSlice";
import Logo from "./Logo";

const Header = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [toggleNav, setToggleNav] = useState(() => {
    if (window.matchMedia("(max-width: 768px)").matches) {
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
  } items-center gap-3 transition-all p-2 text-lg rounded-md hover:bg-slate-50 md:hover:bg-slate-200`;
  const textNavItemClassess = "text-lg font-semibold";

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
      if (window.matchMedia("(max-width: 768px)").matches) {
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
    <header className="h-16 shadow-xl bg-white sticky w-full z-40 top-0">
      <div className=" h-full container mx-auto flex items-center px-4 justify-between">
        <div className="flex align-middle justify-center gap-4">
          <Link to={"/"}>
            <Logo w={90} h={50} />
          </Link>
        </div>
        {/* Search */}
        <div className="w-auto items-center justify-between max-w-sm border rounded-full focus-within:shadow lg:flex lg:pl-2 static sm:relative">
          <div
            className={`${
              showSearch
                ? "absolute -bottom-[4rem] left-0 w-[250px] h-[50px] z-50 p-1 flex items-center justify-center shadow-2xl"
                : ""
            }`}
          >
            <input
              ref={searchRef}
              type="text"
              placeholder="search product here..."
              className={`w-full outline-none lg:flex ${
                showSearch
                  ? "p-4 border-[1px] rounded-lg border-slate-900"
                  : "hidden"
              }`}
            />
          </div>
          <div
            className="rounded-full text-lg min-w-[50px] h-8 bg-blue-500 hover:bg-blue-600 transition-colors flex items-center justify-center lg:rounded-r-full text-white cursor-pointer "
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
            <FaBars className="text-4xl" />
          </button>
        )}
        {/*Main Nav */}
        <div
          ref={navTogglerRef}
          className={`flex items-center gap-7 ${
            toggleNav
              ? `${
                  !showToggledNav ? "hidden" : "!block space-y-3"
                } absolute flex-col right-11 top-12 p-1 bg-slate-200 rounded-b-lg rounded-l-lg !items-start border-[1px] border-slate-700`
              : ""
          }`}
        >
          <NavLink
            to={"/about-us"}
            className={navItemClasses}
            onClick={() => setShowtoggledNav(false)}
          >
            <span className={`${textNavItemClassess} text-blue-500`}>
              About us
            </span>
            <CgInfo className="text-2xl text-blue-500" />
          </NavLink>

          {user?._id && (
            <NavLink
              to="/profile"
              className={navItemClasses}
              onClick={() => setShowtoggledNav(false)}
            >
              <span className={`${textNavItemClassess} text-blue-500`}>
                Profile
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
                <FaRegCircleUser className="text-2xl fill-blue-500" />
              )}
            </NavLink>
          )}

          {user?.role === ROLE.ADMIN && (
            <NavLink
              to={"/admin-panel/all-products"}
              className={navItemClasses}
              onClick={() => setShowtoggledNav(false)}
            >
              <span className={`${textNavItemClassess} text-blue-500`}>
                {" "}
                Admin Panel
              </span>
              <FaCalculator className="text-2xl text-blue-500" />
            </NavLink>
          )}

          {user?._id && (
            <NavLink
              to={"/cart"}
              className={`relative ${navItemClasses}`}
              onClick={() => setShowtoggledNav(false)}
            >
              <span className={`${textNavItemClassess} text-blue-500`}>
                Cart
              </span>
              <FaShoppingCart className="text-2xl text-blue-500" />

              <div
                className={`bg-red-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-0 -right-1 ${
                  isLoadingCart ? "animate-pulse" : ""
                }`}
              >
                <p className="text-sm">{isLoadingCart ? "" : count}</p>
              </div>
            </NavLink>
          )}

          {!user?._id && (
            <Link
              to={"/login"}
              className={`${navItemClasses} bg-blue-500 hover:!bg-blue-600 transition-colors text-white`}
              onClick={() => setShowtoggledNav(false)}
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
