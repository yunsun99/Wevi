import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userState } from "@/atoms/userState";
// 테스트용
import { useRecoilState } from "recoil";

const ProtectedRoute = () => {
  const [user, setUser] = useRecoilState(userState);
  const location = useLocation();
  // if (user.code === 403) {
  //   return <Navigate to="/login" state={{ from: location }} replace />;
  // }
  // setUser({
  //   ...user,
  //   code: 403,
  // });
  return <Outlet />;
};

export default ProtectedRoute;
