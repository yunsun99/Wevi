import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import icon_arrow from "@/assets/icons/icon_arrow_left.png";
import icon_menu from "@/assets/icons/icon_menu.png";
import { useState } from "react";
import Hamburger from "../Hamburger/Hamburger";

function TopNavigationBar2({ title }) {
  const navigate = useNavigate(); // ✅ 네비게이션 훅 사용
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="flex items-center w-full sticky top-0 left-0 right-0 justify-between px-4 py-3 bg-[#FFFDFA] shadow-md z-10">
        {/* 🔙 뒤로 가기 버튼 */}
        <button onClick={() => navigate(-1)} className="flex items-center">
          <img
            src={icon_arrow}
            alt="arrow"
            className="h-8 w-8 object-contain"
          />
        </button>

        <span className="text-lg font-bold text-gray-900">{title}</span>

        <button className="p-2" onClick={() => setMenuOpen(true)}>
          <img src={icon_menu} alt="Menu Icon" className="h-8 w-8" />
        </button>
      </header>
      <Hamburger isOpen={menuOpen} setMenuOpen={setMenuOpen}></Hamburger>
    </>
  );
}

TopNavigationBar2.propTypes = {
  title: PropTypes.string.isRequired,
};

export default TopNavigationBar2;
