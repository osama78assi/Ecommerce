import { useState } from "react";
import { FaPen } from "react-icons/fa";
import { FaRegCircleUser } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import SummaryApi from "../common";
import { useLazyloadingImg } from "../hooks/useLazyLoadingImg";
import { setUserDetails } from "../store/userSlice";
import Confirm from "./Confirm";
import EditUserSection from "./EditUserSection";

function EditImageSection({ isLoading, setIsLoading }) {
  const user = useSelector((state) => state?.user?.user);
  const [newImage, setNewImage] = useState("");
  const imgUrl = useLazyloadingImg(user?.profilePic);
  const dispatch = useDispatch();
  const [confirmAbout, setConfirmAbout] = useState("");

  async function handleUploadPic(e) {
    setConfirmAbout("");
    const file = e.target.files[0];
    if (file.size > 5 * 1024 * 1024) {
      toast.warn("The image is biggen than 5MB. Pick another image please");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("profilePic", file);

      setIsLoading?.(true);
      const res = await fetch(SummaryApi.updateImage.url, {
        method: SummaryApi.updateImage.method,
        credentials: "include",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      if (data.success) {
        toast.success("New image updated successfully");
        dispatch(setUserDetails(data.data));
      } else {
        toast.error("Something went wrong while updating the iamge. Try again");
      }
    } catch (err) {
      console.log(err.message);
      toast.error("Something went wrong while updating the iamge. Try again");
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
          onConfirm={handleUploadPic}
        />
      ) : null}

      <EditUserSection classes="items-center flex-col">
        {user?.profilePic ? (
          imgUrl ? (
            <div className="w-[100px] h-[100px] rounded-full border-[1px] bg-gray-500 animate-pulse" />
          ) : (
            <img
              src={imgUrl}
              className="w-[100px] h-[100px] rounded-full object-cover border-[1px]"
              alt={user?.name}
            />
          )
        ) : (
          <FaRegCircleUser className="text-[100px]" />
        )}
        <form className="relative">
          <label>
            <div className="text-xs bg-opacity-80 bg-blue-500 p-2 cursor-pointer text-center absolute bottom-[-10px] right-[-4rem] w-content rounded-full">
              <FaPen className="fill-white text-[1.2rem]" />
            </div>
            <input
              type="file"
              className="hidden"
              onChange={() => setConfirmAbout("Change Image ?")}
            />
          </label>
        </form>
        <h2 className="text-2xl font-semibold">{user?.name}</h2>
      </EditUserSection>
    </>
  );
}

export default EditImageSection;
