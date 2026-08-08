import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated } from "../api/authService";

export default function ProtectedRoute() {
  if (!isAuthenticated()) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
