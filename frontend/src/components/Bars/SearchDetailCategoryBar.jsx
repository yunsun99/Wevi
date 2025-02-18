import { useState } from "react";
import { useRecoilState } from "recoil";
// import { searchState } from "../../atoms/searchState";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { searchDetailState } from "../../atoms/searchState";

export default function SearchDetailCategoryBar({
  selectedButton,
  setSelectedButton,
}) {
  const category = useParams("category");

  const handleButtonClick = (buttonName) => {
    if (selectedButton !== buttonName) {
      setSelectedButton(buttonName);
    }
  };
  // 활성화 버튼 css
  const buttonActive =
    "px-4 py-4 flex-1 text-[#121212]center text-sm font-medium text-[#121212] hover:text-gray-800 hover:border-b-2 hover:border-black cursor-pointer bg-[#EDE4DC]";
  // 비활성화 버튼 css
  const buttonInactive =
    "px-4 py-4 flex-1 text-center text-sm font-semibold text-[#AC9261] hover:text-[#121212] hover:border-b-2 hover:border-black cursor-pointer";
  // 선택된 버튼

  const [searchParams] = useSearchParams();

  return (
    <>
      <div className="h-[6vh] z-10 flex border-b top-[6vh] border-gray-300 sticky bg-white whitespace-nowrap ">
        <button
          className={
            selectedButton === "information" ? buttonActive : buttonInactive
          }
          onClick={() => handleButtonClick("information")}
        >
          정보
        </button>
        <button
          className={
            selectedButton === "360view" ? buttonActive : buttonInactive
          }
          onClick={() => handleButtonClick("360view")}
        >
          {category.category === "weddinghall" ? "360도 뷰" : "화보사진"}
        </button>
        <button
          className={
            selectedButton === "location" ? buttonActive : buttonInactive
          }
          onClick={() => handleButtonClick("location")}
        >
          위치
        </button>
        <button
          className={
            selectedButton === "review" ? buttonActive : buttonInactive
          }
          onClick={() => handleButtonClick("review")}
        >
          리뷰
        </button>
      </div>
    </>
  );
}
