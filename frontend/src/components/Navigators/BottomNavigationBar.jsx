import icon_home from "@/assets/icons/icon_home.png";
import icon_calendar from "@/assets/icons/icon_calendar.png";
import icon_mypage from "@/assets/icons/icon_mypage.png";
import icon_search from "@/assets/icons/icon_search.png";
import icon_progress from "@/assets/icons/icon_progress.png";

import { Link } from "react-router-dom";
// 성일

function BottomNavigationBar() {
  return (
    <nav className="h-[8vh] z-3 w-screen sticky bottom-0 flex justify-around pt-3 bg-[#FFFDFA]">
      {/* 홈 */}
      <Link to="/" className="flex flex-1 flex-col items-center gap-1">
        <img
          src={icon_home}
          alt="Home Icon"
          className="h-8 w-8 object-contain"
        />
        <span className="font-pretendard text-sm text-center text-[#121212]">
          홈
        </span>
      </Link>

      {/* 검색 */}
      <Link to="/search" className="flex flex-1 flex-col items-center gap-1">
        <img
          src={icon_search}
          alt="Search Icon"
          className="h-8 w-8 object-contain"
        />
        <span className="font-pretendard text-[#121212] text-sm text-center ">
          검색
        </span>
      </Link>

      {/* 일정 */}
      <Link to="/schedule" className="flex flex-1 flex-col items-center gap-1">
        <img
          src={icon_calendar}
          alt="Calendar Icon"
          className="h-8 w-8 object-contain"
        />
        <span className="font-pretendard text-[#121212] text-sm text-center">
          일정
        </span>
      </Link>

      {/* 진행도 */}
      <Link to="/progress" className="flex flex-1 flex-col items-center gap-1">
        <img
          src={icon_progress}
          alt="Progress Icon"
          className="h-8 w-8 object-contain"
        />
        <span className="font-pretendard text-[#121212] text-sm text-center">
          진행도
        </span>
      </Link>

      {/* 마이페이지 */}
      <Link to="/mypage" className="flex flex-1 flex-col items-center gap-1">
        <img
          src={icon_mypage}
          alt="Mypage Icon"
          className="h-8 w-8 object-contain"
        />
        <span className="font-pretendard text-[#121212] text-sm text-center">
          마이페이지
        </span>
      </Link>
    </nav>
  );
}

export default BottomNavigationBar;
