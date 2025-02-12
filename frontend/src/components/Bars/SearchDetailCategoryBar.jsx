import { useState } from "react";
import { useRecoilState } from "recoil";
// import { searchState } from "../../atoms/searchState";
import { useNavigate, useSearchParams } from "react-router-dom";
import { searchDetailState } from "../../atoms/searchState";

export default function SearchDetailCategoryBar() {
  console.log("detail");
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

  const [selectedButton, setSelectedButton] = useRecoilState(searchDetailState);

  ////
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const currentTab = searchParams.get("tab") || "weddinghall";

  return (
    <>
      <div className="flex border-b border-gray-300  bg-white whitespace-nowrap ">
        <button
          className={
            selectedButton.selectedCategory === "informtaion"
              ? buttonActive
              : buttonInactive
          }
          onClick={() => handleButtonClick("informtaion")}
        >
          정보
        </button>
        <button
          className={
            selectedButton.selectedCategory === "360view"
              ? buttonActive
              : buttonInactive
          }
          onClick={() => handleButtonClick("360view")}
        >
          360도 뷰
        </button>
        <button
          className={
            selectedButton.selectedCategory === "location"
              ? buttonActive
              : buttonInactive
          }
          onClick={() => handleButtonClick("location")}
        >
          위치
        </button>
        <button
          className={
            selectedButton.selectedCategory === "review"
              ? buttonActive
              : buttonInactive
          }
          onClick={() => handleButtonClick("review")}
        >
          리뷰
        </button>
      </div>
    </>
  );
}
