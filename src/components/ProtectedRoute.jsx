import { Navigate } from "react-router-dom";
import { getAuthUser } from "../services/authService";

function ProtectedRoute({ children }) {
  const user = getAuthUser();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;