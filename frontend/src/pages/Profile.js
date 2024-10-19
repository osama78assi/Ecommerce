import { useState } from "react";
import { useSelector } from "react-redux";
import EditEmailSection from "../components/EditEmailSection";
import EditImageSection from "../components/EditImageSection";
import EditNameSection from "../components/EditNameSection";
import EditPasswordSection from "../components/EditPasswordSection";
import LogoutSection from "../components/LogoutSection";

function Profile() {
  const user = useSelector((state) => state?.user?.user);
  const [isLoading, setIsLoading] = useState(false);
  // This function to switch what does the user want to change

  return (
    <div className="w-[75%] p-4 m-auto bg-slate-50 space-y-4">
      <EditImageSection isLoading={isLoading} setIsLoading={setIsLoading} />
      <EditNameSection isLoading={isLoading} setIsLoading={setIsLoading} />
      <EditEmailSection isLoading={isLoading} setIsLoading={setIsLoading} />
      <EditPasswordSection isLoading={isLoading} setIsLoading={setIsLoading} />
      <LogoutSection isLoading={isLoading} setIsLoading={setIsLoading} />
    </div>
  );
}

export default Profile;
