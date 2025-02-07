import { useState } from "react";
import { useRecoilState } from "recoil";
import { searchState } from "../../atoms/searchState";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function SearchCategoryBar() {
  const handleButtonClick = (buttonName) => {
    if (selectedButton.selectedCategory !== buttonName) {
      setSelectedButton((prev) => ({
        ...prev,
        selectedCategory: buttonName,
      }));
    }
    navigate(`?${buttonName}`);
  };
  // 활성화 버튼 css
  const buttonActive =
    "px-4 py-4 flex-1 text-[#121212]center text-sm font-medium text-[#121212] hover:text-gray-800 hover:border-b-2 hover:border-black cursor-pointer bg-[#EDE4DC]";
  // 비활성화 버튼 css
  const buttonInactive =
    "px-4 py-4 flex-1 text-center text-sm font-semibold text-[#AC9261] hover:text-[#121212] hover:border-b-2 hover:border-black cursor-pointer";
  // 선택된 버튼

  const [selectedButton, setSelectedButton] = useRecoilState(searchState);

  ////
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const currentTab = searchParams.get("tab") || "weddinghall";

  return (
    <>
      <div className="flex border-b border-gray-300  bg-white whitespace-nowrap ">
        <button
          className={
            selectedButton.selectedCategory === "weddinghall"
              ? buttonActive
              : buttonInactive
          }
          onClick={() => handleButtonClick("weddinghall")}
        >
          웨딩홀
        </button>
        <button
          className={
            selectedButton.selectedCategory === "dress"
              ? buttonActive
              : buttonInactive
          }
          onClick={() => handleButtonClick("dress")}
        >
          드레스
        </button>
        <button
          className={
            selectedButton.selectedCategory === "studio"
              ? buttonActive
              : buttonInactive
          }
          onClick={() => handleButtonClick("studio")}
        >
          스튜디오
        </button>
        <button
          className={
            selectedButton.selectedCategory === "hair&makeup"
              ? buttonActive
              : buttonInactive
          }
          onClick={() => handleButtonClick("hair&makeup")}
        >
          헤어, 메이크업
        </button>
      </div>
    </>
  );
}
