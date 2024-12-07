import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import ROLE from "../../common/role";
import FullPageLoading from "../../pages/FullPageLoading";

function ProtectedRoute({ forAdmin = false, children }) {
  const user = useSelector((state) => state.user.user);
  const isLoading = useSelector((state) => state.user.isLoading);
  const loc = useLocation();

  // Show loading screen while user data is being fetched
  if (isLoading) {
    return <FullPageLoading />;
  }

  // If user is not logged in, only allow access to login or sign-up pages
  if (!user?.name) {
    if (!/\/(login|sign-up)/.test(loc.pathname)) {
      return <Navigate to="/login" replace />;
    }
    return children; // Allow rendering login or sign-up pages
  }

  // Redirect authenticated users away from login or sign-up pages
  if (/\/(login|sign-up)/.test(loc.pathname) && user?.name) {
    return <Navigate to="/" replace />;
  }

  // Check admin-specific routes
  if (forAdmin && user?.role !== ROLE.ADMIN) {
    return <Navigate to="/profile" replace />;
  }

  // Render the requested page
  return children;
}

export default ProtectedRoute;
