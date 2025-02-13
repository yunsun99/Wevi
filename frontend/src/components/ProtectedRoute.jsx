import { useNavigate, Outlet, Navigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { isAuthenticatedState } from "../atoms/userState";

const ProtectedRoute = () => {
  const isAuthenticated = useRecoilValue(isAuthenticatedState);

  if (isAuthenticated === false) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
