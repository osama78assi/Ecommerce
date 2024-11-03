import moment from "moment";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { MdModeEdit } from "react-icons/md";
import { RotatingLines } from "react-loader-spinner";
import { toast } from "react-toastify";
import SummaryApi from "../../common";
import AddUserFrom from "./AddUserFrom";
import ChangeUserRole from "./ChangeUserRole";
import ModalWindow from "./ModalWindow";
import Upload from "./Upload";

function AllUsers() {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);

  const [allUser, setAllUsers] = useState([]);
  const [openUpdateRole, setOpenUpdateRole] = useState(false);
  const [updateUserDetails, setUpdateUserDetails] = useState({
    email: "",
    name: "",
    role: "",
    _id: "",
  });

  const [showAddUser, setShowAddUser] = useState(false);

  async function fetchAllUsers() {
    try {
      const fetchData = await fetch(SummaryApi.allUser.url, {
        method: SummaryApi.allUser.method,
        credentials: "include",
      });

      const dataResponse = await fetchData.json();

      if (dataResponse.success) {
        setAllUsers(dataResponse.data);
      }

      if (dataResponse.error) {
        toast.error(dataResponse.message);
      }
    } catch (err) {
      console.log(err.message);
    }
  }

  useEffect(() => {
    setIsLoading(true);
    fetchAllUsers();
    setIsLoading(false);
  }, []);

  return (
    <div className="bg-white pb-4">
      {isLoading ? (
        <div className="flex items-center justify-center">
          <RotatingLines strokeColor="#c89329" />
        </div>
      ) : (
        <>
          <Upload
            title={t("forms.admin.uploadBtnUserTitle")}
            buttonTitle={t("forms.admin.uploadBtnUserOpen")}
            hanldeClick={() => setShowAddUser(true)}
          />
          <table className="w-full userTable">
            <thead>
              <tr className="bg-primary-700 text-white">
                <th>{t("tables.allUsers.count")}</th>
                <th>{t("tables.allUsers.name")}</th>
                <th>{t("tables.allUsers.email")}</th>
                <th>{t("tables.allUsers.role")}</th>
                <th>{t("tables.allUsers.createdAt")}</th>
                <th>{t("tables.allUsers.action")}</th>
              </tr>
            </thead>
            <tbody>
              {allUser.map((el, index) => {
                return (
                  <tr key={el?._id}>
                    <td>{index + 1}</td>
                    <td>{el?.name}</td>
                    <td>{el?.email}</td>
                    <td>{el?.role}</td>
                    <td>{moment(el?.createdAt).format("LL")}</td>
                    <td>
                      <button
                        className="bg-green-100 p-2 rounded-full cursor-pointer hover:bg-green-500 hover:text-white"
                        onClick={() => {
                          setUpdateUserDetails(el);
                          setOpenUpdateRole(true);
                        }}
                      >
                        <MdModeEdit />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      )}
      {openUpdateRole && (
        <ChangeUserRole
          onClose={() => setOpenUpdateRole(false)}
          name={updateUserDetails.name}
          email={updateUserDetails.email}
          role={updateUserDetails.role}
          userId={updateUserDetails._id}
          callFunc={fetchAllUsers}
        />
      )}

      {showAddUser && (
        <ModalWindow onClose={() => setShowAddUser(false)}>
          <AddUserFrom
            onSucess={() => {
              fetchAllUsers();
              setShowAddUser(false);
            }}
          />
        </ModalWindow>
      )}
    </div>
  );
}

export default AllUsers;
