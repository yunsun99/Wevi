import PropTypes from "prop-types";
import icon_arrow from "@/assets/icons/icon_arrow_left.png";

function TopNavigationBar3({ title, onBack }) {
  return (
    <header className="flex items-center w-full px-4 py-10 z-10">
      {/* 뒤로가기로 수정하기기 */}
      <button onClick={onBack} className="absolute left-4">
        <img
          src={icon_arrow} // 로고 이미지 경로
          alt="arrow"
          className="h-6 w-6 object-contain" // 로고 크기 조정
        />
      </button>

      <span className="absolute left-1/2 transform -translate-x-1/2 text-2xl font-bold font-pretendard">
        {title}
      </span>
    </header>
  );
}

TopNavigationBar3.propTypes = {
  title: PropTypes.string.isRequired, // 검색 제목 (필수)
};

export default TopNavigationBar3;
