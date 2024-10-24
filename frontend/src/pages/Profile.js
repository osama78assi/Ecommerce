import { useState } from "react";
import EditEmailSection from "../components/profile/EditEmailSection";
import EditImageSection from "../components/profile/EditImageSection";
import EditNameSection from "../components/profile/EditNameSection";
import EditPasswordSection from "../components/profile/EditPasswordSection";
import LogoutSection from "../components/profile/LogoutSection";

function Profile() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="py-6">
      <div className="w-[95%] md:w-[75%] p-4 m-auto bg-slate-50 space-y-4">
        <EditImageSection isLoading={isLoading} setIsLoading={setIsLoading} />
        <EditNameSection isLoading={isLoading} setIsLoading={setIsLoading} />
        <EditEmailSection isLoading={isLoading} setIsLoading={setIsLoading} />
        <EditPasswordSection
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
        <LogoutSection isLoading={isLoading} setIsLoading={setIsLoading} />
      </div>
    </div>
  );
}

export default Profile;
