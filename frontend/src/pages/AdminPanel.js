import React from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { FaRegCircleUser } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import { useLazyloadingImg } from "../hooks/useLazyLoadingImg";

function AdminPanel() {
  const { t } = useTranslation();
  const user = useSelector((state) => state?.user?.user);
  const imgUrl = useLazyloadingImg(user?.profilePic);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{t("SEO.titles.adminPanel")}</title>
      </Helmet>

      <div className="h-full flex p-6">
        <aside className="bg-white min-h-full  w-full  max-w-60 customShadow py-2">
          <div className="h-32  flex justify-center items-center flex-col">
            <div className="text-5xl cursor-pointer relative flex justify-center">
              {user?.profilePic ? (
                imgUrl ? (
                  <img
                    src={imgUrl}
                    className="w-20 h-20 rounded-full object-cover"
                    alt={user?.name}
                  />
                ) : (
                  <div className="w-20 h-20 rounded-full bg-gray-500 animate-pulse" />
                )
              ) : (
                <FaRegCircleUser />
              )}
            </div>
            <p className="capitalize text-lg font-semibold">{user?.name}</p>
            <p className="text-sm">{user?.role}</p>
          </div>

          {/***navigation */}
          <div>
            <nav className="grid p-4">
              <Link to={"all-users"} className="px-2 py-1 hover:bg-slate-100">
                {t("admin.users")}
              </Link>
              <Link
                to={"all-products"}
                className="px-2 py-1 hover:bg-slate-100"
              >
                {t("admin.products")}
              </Link>
              <Link
                to={"all-categories"}
                className="px-2 py-1 hover:bg-slate-100"
              >
                {t("admin.categories")}
              </Link>
              <Link to={"slider"} className="px-2 py-1 hover:bg-slate-100">
                {t("admin.slider")}
              </Link>
              <Link to={"about-us"} className="px-2 py-1 hover:bg-slate-100">
                {t("admin.aboutUs")}
              </Link>
              <Link to={"vision"} className="px-2 py-1 hover:bg-slate-100">
                {t("admin.vision")}
              </Link>
              <Link to={"goals"} className="px-2 py-1 hover:bg-slate-100">
                {t("admin.goals")}
              </Link>
            </nav>
          </div>
        </aside>

        <main className="w-full h-full p-2">
          <Outlet />
        </main>
      </div>
    </>
  );
}

export default AdminPanel;
