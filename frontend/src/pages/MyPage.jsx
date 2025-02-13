import TopNavigationBar from "../components/Navigators/TopNavigationBar";
import BottomNavigationBar from "../components/Navigators/BottomNavigationBar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserInfo } from "../api/user";

export default function MyPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState([]);

  const menuItems = [
    { label: "알림 설정", path: "/notification" },
    { label: "공지사항", path: "/" },
    { label: "문의하기", path: "/" },
    { label: "회원정보 수정", path: "/" },
    { label: "계약 내역", path: "/contractList" },
    { label: "상담 내역", path: "/consultationList" },
  ];

  const handleButtonClick = () => {
    navigate("/couplelink"); // ✅ spouseId가 없으면 커플 연동 페이지로 이동
  };

  useEffect(() => {
    const axiosUserInfo = async () => {
      try {
        const userInfo = await getUserInfo();
        setUser(userInfo);
      } catch (err) {
        console.log(err); // ✅ 서버에서 받은 오류 메시지 표시
      }
    };
    axiosUserInfo();
  }, []);

  return (
    <>
      <TopNavigationBar />
      <div className="flex items-center justify-between w-full bg-white p-4 py-6">
        {/* 프로필 정보 */}
        <div className="flex items-center gap-3">
          <img
            src={user.profileImage || "https://via.placeholder.com/60"}
            alt="프로필 이미지"
            className="w-12 h-12 rounded-full"
          />
          <div className="text-left">
            <p className="text-lg font-semibold">{user.name}</p>
            <p className="text-gray-500 text-sm">{user.email}</p>
          </div>
        </div>

        {/* 커플 연동 버튼 */}
        <button
          className="px-4 py-1 text-sm border rounded-lg text-gray-700"
          onClick={handleButtonClick}
        >
          {user.spouseId ? user.spouseId : "커플 연동"}
        </button>
      </div>

      {/* 메뉴 리스트 */}
      <div className="flex-1 mt-4">
        {menuItems.map((item, index) => (
          <MenuItem key={index} label={item.label} path={item.path} />
        ))}
      </div>

      {/* 로그아웃 버튼 */}
      <div className="px-6 pb-24 flex flex-col items-start mt-5">
        <button className="text-red-500 text-center py-3 text-sm font-semibold">
          로그아웃
        </button>
        <p className="text-gray-400 text-xs text-center mt-1">회원탈퇴</p>
      </div>
      <BottomNavigationBar />
    </>
  );
}

function MenuItem({ label, path }) {
  const navigate = useNavigate(); // ✅ 페이지 이동 함수

  return (
    <div
      className="py-4 px-6 border-b text-[#555555] cursor-pointer border-[#DAE0D6]"
      onClick={() => navigate(path)} // ✅ 클릭 시 해당 경로로 이동
    >
      {label}
    </div>
  );
}
