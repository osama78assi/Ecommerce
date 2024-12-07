import { useState } from "react";
import { FaPen } from "react-icons/fa";
import { FaRegCircleUser } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import SummaryApi from "../../common";
import { useLazyloadingImg } from "../../hooks/useLazyLoadingImg";
import { setUserDetails } from "../../store/userSlice";
import Confirm from "../ui/Confirm";
import EditUserSection from "./EditUserSection";
import { useTranslation } from "react-i18next";

function EditImageSection({ isLoading, setIsLoading }) {
  const {t} = useTranslation();
  const user = useSelector((state) => state?.user?.user);
  const [newImage, setNewImage] = useState(null);
  const [newImgURL, setNewImgURL] = useState("");
  const imgUrl = useLazyloadingImg(user?.profilePic);
  const dispatch = useDispatch();
  const [confirmAbout, setConfirmAbout] = useState("");

  async function handleUploadPic() {
    setConfirmAbout("");
    if (newImage.size > 5 * 1024 * 1024) {
      toast.warn(t("messages.bigImage"));
      return;
    }

    try {
      const formData = new FormData();
      formData.append("profilePic", newImage);

      setIsLoading?.(true);
      const res = await fetch(SummaryApi.updateImage.url, {
        method: SummaryApi.updateImage.method,
        credentials: "include",
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
        toast.success(t("messages.successUploadingImage"));
        dispatch(setUserDetails(data.data));
      } else {
        toast.error(t("messages.errUploadingImage"));
      }
    } catch (err) {
      console.log(err.message);
      toast.error(t("messages.errUploadingImage"));
    } finally {
      setIsLoading?.(false);
    }
  }

  async function handleLoadImg(e) {
    const file = e.target.files[0];
    setNewImage(file);

    const reader = new FileReader();
    reader.onload = function (event) {
      const previewImageUrl = event.target.result;
      setNewImgURL(previewImageUrl);
    };

    reader.readAsDataURL(file); // Read file as data URL
    setConfirmAbout(t("forms.profile.imageField.confirmChange"));
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
        >
          <div className="flex justify-center items-center">
            {newImgURL ? (
              <img
                src={newImgURL}
                alt="new profile"
                className="w-[100px] h-[100px] rounded-full border-[1px] object-cover"
              />
            ) : (
              <div className="w-[100px] h-[100px] rounded-full border-[1px] bg-gray-500 animate-pulse" />
            )}
          </div>
        </Confirm>
      ) : null}

      <EditUserSection classes="items-center flex-col">
        {user?.profilePic ? (
          imgUrl ? (
            <img
              src={imgUrl}
              className="w-[100px] h-[100px] rounded-full object-cover border-[1px]"
              alt={user?.name}
            />
          ) : (
            <div className="w-[100px] h-[100px] rounded-full border-[1px] bg-gray-500 animate-pulse" />
          )
        ) : (
          <FaRegCircleUser className="text-[100px]" />
        )}
        <form className="relative">
          <label>
            <div className="text-xs bg-opacity-80 bg-primary-900 p-2 cursor-pointer text-center absolute bottom-[-10px] right-[-4rem] w-content rounded-full">
              <FaPen className="fill-white text-[1.2rem]" />
            </div>
            <input
              disabled={isLoading}
              type="file"
              className="hidden"
              onChange={handleLoadImg}
            />
          </label>
        </form>
        <h2 className="text-2xl font-semibold">{user?.name}</h2>
      </EditUserSection>
    </>
  );
}

export default EditImageSection;
