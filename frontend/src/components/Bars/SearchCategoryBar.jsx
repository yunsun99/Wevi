import { memo } from "react";

function SearchCategoryBar({ currentCategory, onChangeCategory }) {
  // ✅ props로 상태 전달
  // console.log("SearchCategoryBar 렌더링됨");

  const buttonActive =
    "px-4 py-4 flex-1 text-[#121212] text-sm font-semibold text-[#121212] hover:text-gray-800 hover:border-b-2 hover:border-black cursor-pointer bg-[#EDE4DC]";
  const buttonInactive =
    "px-4 py-4 flex-1 text-center text-sm font-semibold text-[#AC9261] hover:text-[#121212] hover:border-b-2 hover:border-black cursor-pointer";

  return (
    <div className="flex border-b border-gray-300 bg-white whitespace-nowrap">
      {["weddinghall", "dress", "studio", "makeup"].map((tab) => (
        <button
          key={tab}
          className={currentCategory === tab ? buttonActive : buttonInactive} // ✅ `searchState` 대신 props 사용
          onClick={() => onChangeCategory(tab)} // ✅ props로 받은 onChangeCategory 실행
        >
          {tab === "weddinghall"
            ? "웨딩홀"
            : tab === "dress"
            ? "드레스"
            : tab === "studio"
            ? "스튜디오"
            : "헤어, 메이크업"}
        </button>
      ))}
    </div>
  );
}

export default memo(SearchCategoryBar);
