import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
// import "./Calendar.css"
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import SignUpDetail from "./pages/SignUpDetail";
import SignupComplete from "./pages/SignUpComplete";
import Home from "./pages/Home";
import Notification from "./pages/Notification";
import Calendar from "./pages/Schedule";
import Hamburger from "./pages/Hamburger";
import MyPage from "./pages/MyPage";
import Progress from "./pages/Progress";
import Search from "./pages/Search";
import AiPlanner from "./pages/AIPlanner";
import ProtectedRoute from "./components/ProtectedRoute";
import Test from "./pages/testpage";
import { RecoilRoot } from "recoil";
import SearchList from "./pages/searchlistpage";
import SearchDetail from "./pages/searchdetailpage";
import ConsultationReservation from "./pages/ConsultationReservation";
import CoupleLink from "./pages/CoupleLink";

const router = createBrowserRouter([
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <SignUp /> },
  { path: "/signupdetail", element: <SignUpDetail /> },
  { path: "/signup/complete", element: <SignupComplete /> },
  {
    element: <ProtectedRoute />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/notification", element: <Notification /> },
      { path: "/calendar", element: <Calendar /> },
      { path: "/hamburger", element: <Hamburger /> },
      { path: "/mypage", element: <MyPage /> },
      { path: "/progress", element: <Progress /> },
      { path: "/search", element: <Search /> },
      { path: "/aiplanner", element: <AiPlanner /> },
    ],
  },
  { path: "/test", element: <Test /> },
  { path: "/searchList", element: <SearchList /> },
  { path: "/searchDetail", element: <SearchDetail /> },
  { path: "/consultationReservation", element: <ConsultationReservation /> },
  { path: "/couplelink", element: <CoupleLink /> },
]);

function App() {
  return (
    <RecoilRoot>
      <RouterProvider router={router} />
    </RecoilRoot>
  );
}

export default App;
