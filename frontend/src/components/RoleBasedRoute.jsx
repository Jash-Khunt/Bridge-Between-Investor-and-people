import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import LoadingSpinner from "./ui/LoadingSpinner";

const RoleBasedRoute = ({ children, allowedRoles }) => {
  const user = useAuthStore((state) => state.user);
  const isCheckingAuth = useAuthStore((state) => state.isCheckingAuth);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (isCheckingAuth) {
    return (
      <div className="flex h-screen items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user?.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default RoleBasedRoute;
