import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import "./App.css";
// import "./Calendar.css"
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import SignupComplete from "./pages/SignUpComplete";
import Home from "./pages/Home";
import Notification from "./pages/Notification";
import Hamburger from "./pages/Hamburger";
import MyPage from "./pages/MyPage";
import Progress from "./pages/Progress";
import Search from "./pages/Search";
import AiPlanner from "./pages/AIPlanner";
import ProtectedRoute from "./components/ProtectedRoute";
import Test from "./pages/testpage";
import { RecoilRoot, useRecoilState } from "recoil";
import ConsultationReservation from "./pages/ConsultationReservation";
import SearchDetail from "./pages/SearchDetail";
import CoupleLink from "./pages/CoupleLink";
import Reservation from "./pages/Reservation";
import ConsultationList from "./pages/ConsultationList";
import ConsultationDetail from "./pages/ConsultationDetail";
import ContractDetail from "./pages/ContractDetail";
import RecoilNexus from "recoil-nexus";
import ContractList from "./pages/ContractList";
import Schedule from "./pages/Schedule";
import { isNotificationState } from "./atoms/notificationState";
import { useEffect } from "react";
import { onForegroundMessage, registerServiceWorker } from "./api/firebase";

const router = createBrowserRouter([
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <SignUp /> },
  { path: "/signup/complete", element: <SignupComplete /> },
  {
    element: <ProtectedRoute />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/notification", element: <Notification /> },
      { path: "/schedule", element: <Schedule /> },
      { path: "/hamburger", element: <Hamburger /> },
      { path: "/mypage", element: <MyPage /> },
      { path: "/progress", element: <Progress /> },
      { path: "/aiplanner", element: <AiPlanner /> },
      { path: "/test", element: <Test /> },
      {
        path: "/search",
        element: <Navigate replace to="/search/weddinghall" />,
      },
      { path: "/search/:category", element: <Search /> },
      { path: "/searchDetail", element: <SearchDetail /> },
      {
        path: "/consultationReservation",
        element: <ConsultationReservation />,
      },
      { path: "/couplelink", element: <CoupleLink /> },
      { path: "/reservation", element: <Reservation /> },
      { path: "/consultationList", element: <ConsultationList /> },
      { path: "/consultationDetail/:id", element: <ConsultationDetail /> },
      { path: "/contractList", element: <ContractList /> },
      { path: "/contractDetail/:id", element: <ContractDetail /> },
    ],
  },
]);

function NotificationHandler() {
  const [isNotification, setIsNotification] =
    useRecoilState(isNotificationState);

  useEffect(() => {
    // ✅ 1. 서비스 워커 등록 (상태 변경 없음)
    registerServiceWorker().catch(() => {
      console.error("서비스 워커 등록 실패");
    });

    // ✅ 2. 포그라운드 메시지 수신 시에만 상태 업데이트
    onForegroundMessage(() => {
      setIsNotification(true);
      alert("🔔 새로운 알림이 도착했습니다!");
    });
  }, [setIsNotification]);

  return null; // UI 없음
}

function App() {
  return (
    <RecoilRoot>
      <RecoilNexus />
      <NotificationHandler /> {/* RecoilRoot 내부에서 Recoil 사용 */}
      <RouterProvider router={router} />
    </RecoilRoot>
  );
}

export default App;
