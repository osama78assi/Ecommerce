import React from "react";
import { FaRegCircleUser } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import { useLazyloadingImg } from "../hooks/useLazyLoadingImg";

const AdminPanel = () => {
  const user = useSelector((state) => state?.user?.user);
  const imgUrl = useLazyloadingImg(user?.profilePic);

  return (
    <div className="h-full flex">
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
              All Users
            </Link>
            <Link to={"all-products"} className="px-2 py-1 hover:bg-slate-100">
              All product
            </Link>
            <Link
              to={"all-categories"}
              className="px-2 py-1 hover:bg-slate-100"
            >
              All categories
            </Link>
            <Link to={"slider"} className="px-2 py-1 hover:bg-slate-100">
              slider sections
            </Link>
            <Link to={"about-us-edit"} className="px-2 py-1 hover:bg-slate-100">
              About us sections
            </Link>
            <Link to={"vision"} className="px-2 py-1 hover:bg-slate-100">
              Vision sections
            </Link>
          </nav>
        </div>
      </aside>

      <main className="w-full h-full p-2">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminPanel;
