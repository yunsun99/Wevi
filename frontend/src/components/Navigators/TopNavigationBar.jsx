import { Link } from "react-router-dom";
import icon_search from "@/assets/icons/icon_search.png";
import icon_alarm from "@/assets/icons/icon_alaram.png";
import icon_menu from "@/assets/icons/icon_menu.png";
import logo from "@/assets/logo.png";
// 성일

function TopNavigationBar() {
  return (
    <header className="z-3 flex items-center w-screen sticky  top-0 justify-between px-4 py-3 bg-[#FFFDFA] shadow-md">
      {/* 로고 섹션 */}
      <Link to="/" className="flex items-center">
        <img
          src={logo} // 로고 이미지 경로
          alt="Logo"
          className="h-10 w-10 object-contain" // 로고 크기 조정
        />
        <span className="ml-2 text-lg font-bold text-gray-700">WEDDI</span>
      </Link>

      {/* 아이콘 섹션 */}
      <div className="flex items-center space-x-4">
        {/* 검색 아이콘 */}
        <Link
          to="/search"
          aria-label="Search"
          className="text-gray-600 hover:text-gray-800"
        >
          <img
            src={icon_search}
            alt="Search Icon"
            className="h-8 w-8 object-contain"
          />
        </Link>

        {/* 알림 아이콘 */}
        <Link
          to="/notification"
          aria-label="Notifications"
          className="text-gray-600 hover:text-gray-800"
        >
          <img
            src={icon_alarm}
            alt="Alarm Icon"
            className="h-8 w-8 object-contain"
          />
        </Link>

        {/* 메뉴 아이콘 */}
        <Link
          to="/hamburger"
          aria-label="Menu"
          className="text-gray-600 hover:text-gray-800"
        >
          <img
            src={icon_menu}
            alt="Menu Icon"
            className="h-8 w-8 object-contain"
          />
        </Link>
      </div>
    </header>
  );
}

export default TopNavigationBar;
