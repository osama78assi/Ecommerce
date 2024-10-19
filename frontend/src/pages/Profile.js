import { useRef, useState } from "react";
import { FaRegCircleUser } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import SummaryApi from "../common";
import Confirm from "../components/Confirm";
import EditUserInput from "../components/EditUserInput";
import EditUserSection from "../components/EditUserSection";
import SubmitBtn from "../components/SubmitBtn";
import { setUserDetails } from "../store/userSlice";

function Profile() {
  const user = useSelector((state) => state?.user?.user);
  const [userName, setUserName] = useState("");
  const [userOldPassword, setUserOldPassword] = useState("");
  const [userNewPassword, setUserNewPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [confirmAbout, setConfirmAbout] = useState("");
  const changeType = useRef(null);

  // This function to switch what does the user want to change
  function handleConfirm() {
    switch (changeType.current) {
      case "name":
        handleChangeName();
        break;
      case "email":
        handleChangeEmail();
        break;
      case "password":
        handleChangePassword();
        break;
      case "logout":
        handleLogout();
        break;
      default:
        break;
    }
    // Clear
    setConfirmAbout("");
    changeType.current = "";
  }

  async function handleLogout() {
    try {
      setIsLoading(true);
      const fetchData = await fetch(SummaryApi.logout_user.url, {
        method: SummaryApi.logout_user.method,
        credentials: "include",
      });

      const data = await fetchData.json();

      if (data.success) {
        toast.success(data.message);
        dispatch(setUserDetails(null));
        navigate("/");
      }

      if (data.error) {
        toast.error("Something went wrong");
      }
    } catch (err) {
      console.log(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleChangeName() {
    try {
      if (userName === "") {
        toast.warn("Add user name first");
        return;
      }
      if (/\W+/g.test(userName)) {
        toast.warn("Username mustn't have special chars");
        return;
      }
      if (userName.length > 50) {
        toast.warn("Username is too long");
        return;
      }
      setIsLoading(true);
      const res = await fetch(SummaryApi.updateName.url, {
        method: SummaryApi.updateName.method,
        body: JSON.stringify({ newName: userName }),
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (data.success) {
        toast.success(data.message);
        dispatch(setUserDetails(data.data));
        setUserName("");
      }
      if (data.error) {
        toast.error("Something went wrong. Try again");
      }
    } catch (err) {
      console.log(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleChangeEmail() {
    try {
      if (email === "") {
        toast.warn("Email shouldn't be empty.");
        return;
      }

      setIsLoading(true);
      const res = await fetch(SummaryApi.updateEmail.url, {
        method: SummaryApi.updateEmail.method,
        credentials: "include",
        body: JSON.stringify({ newEmail: email }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      if (data.success) {
        toast.success(data.message);
        dispatch(setUserDetails(data.data));
        setEmail("");
      }

      if (data.error) {
        toast.error("Something went wrong");
      }
    } catch (err) {
      console.log(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleChangePassword() {
    try {
      if (userOldPassword === "") {
        toast.warn("You must confirm your old password");
        return;
      }

      if (userNewPassword === "") {
        toast.warn("You must add the new password");
        return;
      }

      const res = await fetch(SummaryApi.updatePassword.url, {
        method: SummaryApi.updatePassword.method,
        body: JSON.stringify({
          oldPassword: userOldPassword,
          newPassword: userNewPassword,
        }),
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      if (data.success) {
        toast.success(data.message);
        setUserOldPassword("");
        setUserNewPassword("");
      }

      if (data.error) {
        toast.error(data.message);
      }
    } catch (err) {
      console.log(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="w-[75%] p-4 m-auto bg-slate-50 space-y-4">
      {confirmAbout !== "" ? (
        <Confirm
          about={confirmAbout}
          onClose={() => {
            setConfirmAbout("");
            changeType.current = "";
          }}
          onConfirm={handleConfirm}
          moreDetails={changeType.current !== "logout"}
        />
      ) : null}

      {/* User Profile */}
      <EditUserSection classes="items-center flex-col">
        {user?.profilePic ? (
          <img
            src={user?.profilePic}
            className="w-[100px] h-[100px] rounded-full object-cover border-[1px]"
            alt={user?.name}
          />
        ) : (
          <FaRegCircleUser className="text-[100px]" />
        )}
        <h2 className="text-2xl font-semibold">{user?.name}</h2>
      </EditUserSection>

      {/* User name */}
      <EditUserSection
        title="Change User Name"
        classes="self-start m-auto flex-col w-[75%] space-y-3 "
      >
        <EditUserInput
          val={userName}
          setVal={(val) => setUserName(val)}
          label="Enter The New Name"
          type="text"
          id="userName"
          name="userName"
          placeholder="New Name"
        />
        <SubmitBtn
          title="Confirm Change"
          dis={isLoading || !userName}
          handleClick={() => {
            setConfirmAbout("update the name ?");
            changeType.current = "name";
          }}
        />
      </EditUserSection>

      {/* User Email */}
      <EditUserSection
        title="Change Email"
        classes="self-start m-auto flex-col w-[75%] space-y-3 "
      >
        <EditUserInput
          val={email}
          setVal={(val) => setEmail(val)}
          label="Enter The New Email"
          type="email"
          id="email"
          name="email"
          placeholder="New Email"
        />
        <SubmitBtn
          title="Confirm Change"
          dis={isLoading || !email}
          handleClick={() => {
            setConfirmAbout("update the email ?");
            changeType.current = "email";
          }}
        />
      </EditUserSection>

      {/* User password */}
      <EditUserSection
        title="Change Password"
        classes="self-start m-auto flex-col w-[75%] space-y-3 "
      >
        <EditUserInput
          val={userOldPassword}
          setVal={(val) => setUserOldPassword(val)}
          label="Confirm The Old Password"
          type="password"
          id="userOldPassword"
          name="userOldPassword"
          placeholder="Confirm Password"
        />

        <EditUserInput
          val={userNewPassword}
          setVal={(val) => setUserNewPassword(val)}
          label="Enter The New Password"
          type="password"
          id="userNewPassword"
          name="userNewPassword"
          placeholder="Enter New Password"
        />
        <SubmitBtn
          title="Confirm Change"
          dis={isLoading || !userOldPassword || !userNewPassword}
          handleClick={() => {
            setConfirmAbout("update the password ?");
            changeType.current = "password";
          }}
        />
      </EditUserSection>

      <EditUserSection classes="w-[75%]">
        <SubmitBtn
          title="Logout"
          type="danger"
          dis={isLoading}
          handleClick={() => {
            changeType.current = "logout";
            setConfirmAbout("Logout");
          }}
          classes="w-[100%]"
        />
      </EditUserSection>
    </div>
  );
}

export default Profile;
