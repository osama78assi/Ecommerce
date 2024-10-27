import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import SummaryApi from "../../common";
import { setUserDetails } from "../../store/userSlice";
import Confirm from "../ui/Confirm";
import SubmitBtn from "../ui/SubmitBtn";
import EditUserSection from "./EditUserSection";

function LogoutSection({ isLoading, setIsLoading }) {
  const [confirmAbout, setConfirmAbout] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleLogout() {
    setConfirmAbout("");
    try {
      setIsLoading?.(true);
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
      setIsLoading?.(false);
    }
  }

  return (
    <>
      {confirmAbout !== "" ? (
        <Confirm
          about={confirmAbout}
          onClose={() => {
            setConfirmAbout("");
          }}
          onConfirm={handleLogout}
          moreDetails={false}
        />
      ) : null}

      <EditUserSection classes="w-[25%]">
        <SubmitBtn
          title="Logout"
          type="danger"
          dis={isLoading}
          handleClick={() => {
            setConfirmAbout("Logout");
          }}
          classes="w-[100%]"
        />
      </EditUserSection>
    </>
  );
}

export default LogoutSection;
