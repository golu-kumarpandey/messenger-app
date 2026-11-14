import { Navigate, Outlet } from "react-router-dom";
import { getToken } from "../../utils/helper";

const AuthProtectedRoute = () => {
  const token = getToken();
  if (token) return <Navigate to="/" />;
  return <Outlet />;
};
export default AuthProtectedRoute;
