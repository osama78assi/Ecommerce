import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import ROLE from "../common/role";
import FullPageLoading from "../pages/FullPageLoading";

function ProtectedRoute({ forAdmin = false, children }) {
  const user = useSelector((state) => state.user.user);
  const isLoading = useSelector((state) => state.user.isLoading);
  
  if (isLoading) {
    return <FullPageLoading />;
  }

  if (forAdmin) {
    if (!user?.name) {
      return <Navigate to="/login" replace={true} />;
    }
    if (user?.role !== ROLE.ADMIN) {
      return <Navigate to="/profile" replace={true} />;
    }
  }

  if (!user?.name) {
    return <Navigate to="/login" replace={true} />;
  }

  return children;
}

export default ProtectedRoute;
