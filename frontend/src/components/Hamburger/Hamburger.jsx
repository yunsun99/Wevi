import close_icon from "@/assets/icons/icon_close.png";
import logo from "@/assets/logo.png";
import { Link } from "react-router-dom";

export default function Hamburger({ isOpen, setMenuOpen }) {
  return (
    <>
      {/* 어두운 배경 (메뉴가 열렸을 때만 보임) */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-20 transition-opacity duration-300 ${
          isOpen ? "opacity-50 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setMenuOpen(false)}
      />

      {/* 사이드바 메뉴 (CSS 애니메이션 적용) */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-white shadow-lg z-30 flex flex-col transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* 닫기 버튼 */}
        <div className="flex justify-between items-center p-4 border-b">
          <img src={logo} alt="Logo" className="h-10 w-10 object-contain" />
          <button onClick={() => setMenuOpen(false)} aria-label="Close Menu">
            <img src={close_icon} alt="Close Icon" className="h-6 w-6" />
          </button>
        </div>

        {/* 메뉴 리스트 */}
        <nav className="flex flex-col p-4">
          <Link
            to="/search"
            className="p-3 text-gray-800 hover:bg-gray-200 rounded transition"
            onClick={() => setMenuOpen(false)}
          >
            업체 검색
          </Link>
          <hr className="border-t border-gray-300" />

          <Link
            to="/schedule"
            className="p-3 text-gray-800 hover:bg-gray-200 rounded transition"
            onClick={() => setMenuOpen(false)}
          >
            일정 조회
          </Link>
          <hr className="border-t border-gray-300" />

          <Link
            to="/progress"
            className="p-3 text-gray-800 hover:bg-gray-200 rounded transition"
            onClick={() => setMenuOpen(false)}
          >
            중간과정 조회
          </Link>
          <hr className="border-t border-gray-300" />

          <Link
            to="/mypage"
            className="p-3 text-gray-800 hover:bg-gray-200 rounded transition"
            onClick={() => setMenuOpen(false)} // ✅ 여기 추가!
          >
            마이페이지
          </Link>
          <hr className="border-t border-gray-300" />

          <Link
            to="/ai-planner"
            className="p-3 text-gray-800 hover:bg-gray-200 rounded transition"
            onClick={() => setMenuOpen(false)}
          >
            AI 플래너
          </Link>
          <hr className="border-t border-gray-300" />

          <Link
            to="/community"
            className="p-3 text-gray-800 hover:bg-gray-200 rounded transition"
            onClick={() => setMenuOpen(false)}
          >
            커뮤니티
          </Link>
          <hr className="border-t border-gray-300" />

          <Link
            to="/contract-analysis"
            className="p-3 text-gray-800 hover:bg-gray-200 rounded transition"
            onClick={() => setMenuOpen(false)}
          >
            계약서 분석
          </Link>
        </nav>
      </div>
    </>
  );
}
