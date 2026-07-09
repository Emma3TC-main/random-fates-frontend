import { Navigate, useLocation } from "react-router-dom";
import {
  isAdminAuthenticated,
  isAdminLoggedWithoutRecentMfa,
} from "../services/adminAuthService";
import { adminPath } from "../../config/routes";

function AdminProtectedRoute({ children }) {
  const location = useLocation();

  if (isAdminLoggedWithoutRecentMfa()) {
    return (
      <Navigate
        to={adminPath("/login")}
        replace
        state={{
          from: location.pathname,
          message:
            "Tu verificación administrativa expiró. Inicia sesión nuevamente y confirma el OTP.",
        }}
      />
    );
  }

  if (!isAdminAuthenticated()) {
    return (
      <Navigate
        to={adminPath("/login")}
        replace
        state={{
          from: location.pathname,
          message: "Debes iniciar sesión como administrador.",
        }}
      />
    );
  }

  return children;
}

export default AdminProtectedRoute;
