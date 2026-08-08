import { Navigate, Outlet } from "react-router-dom";
import { getUserRole } from "../api/authService";

export default function RoleGuard({ allowedRoles }) {
  const role = getUserRole();

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/accessDenied" replace />;
  }

  return <Outlet />;
}
