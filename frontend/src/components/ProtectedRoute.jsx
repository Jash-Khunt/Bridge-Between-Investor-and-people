import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import LoadingSpinner from "./ui/LoadingSpinner";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isCheckingAuth = useAuthStore((state) => state.isCheckingAuth);

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

  return children;
};

export default ProtectedRoute;
