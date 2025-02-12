import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { setupInterceptors } from "../api/auth";
import { useEffect, useState } from "react";

const ProtectedRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true); // 기본적으로 로그인 상태로 가정
  const navigate = useNavigate(); // 리디렉트 기능 사용

  useEffect(() => {
    // Axios 인터셉터 설정 (401/403 응답 시 자동 로그아웃 처리)
    setupInterceptors(setIsAuthenticated);
  }, []);

  useEffect(() => {
    if (isAuthenticated === false) {
      navigate("/login", { replace: true }); // 로그인 페이지로 강제 이동
    }
  }, [isAuthenticated, navigate]);
  return <Outlet />;
};

export default ProtectedRoute;
