import { useState } from "react";
import { Link } from "react-router-dom";
import icon_search from "@/assets/icons/icon_search.png";
import icon_alarm from "@/assets/icons/icon_alaram.png";
import icon_alarm_on from "@/assets/icons/icon_alarm_on.png";
import icon_menu from "@/assets/icons/icon_menu.png";
import logo from "@/assets/logo.png";
import close_icon from "@/assets/icons/icon_close.png";
import Hamburger from "../Hamburger/Hamburger";
import { useRecoilValue } from "recoil";
import { isNotificationState } from "../../atoms/notificationState";

function TopNavigationBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const notification = useRecoilValue(isNotificationState);
  // console.log(notification);

  return (
    <>
      {/* 상단 네비게이션 바 */}
      <header className="h-[6vh] z-10 flex items-center w-screen sticky top-0 justify-between px-4 py-3 bg-[#FFFDFA]">
        {/* 로고 */}
        <Link to="/" className="flex items-center">
          <img src={logo} alt="Logo" className="h-10 w-10 object-contain" />
          <span className="ml-2 text-lg font-bold text-gray-700">WEDDI</span>
        </Link>

        {/* 아이콘 섹션 */}
        <div className="flex items-center space-x-4">
          <Link to="/search" aria-label="Search">
            <img src={icon_search} alt="Search Icon" className="h-8 w-8" />
          </Link>

          <Link to="/notification" aria-label="Notifications">
            <img
              src={`${notification ? icon_alarm_on : icon_alarm}`}
              alt="Alarm Icon"
              className={`h-8 w-8 `}
            />
          </Link>

          {/* 메뉴 아이콘 (햄버거 버튼) */}
          <button
            onClick={() => setMenuOpen(true)}
            aria-label="Menu"
            className="text-gray-600 hover:text-gray-800 focus:outline-none"
          >
            <img src={icon_menu} alt="Menu Icon" className="h-8 w-8" />
          </button>
        </div>
        <Hamburger isOpen={menuOpen} setMenuOpen={setMenuOpen}></Hamburger>
      </header>
    </>
  );
}

export default TopNavigationBar;
