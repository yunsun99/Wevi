import { useState } from "react";
import { useRecoilState } from "recoil";
import { searchState } from "../../atoms/searchState";

export default function SearchCategoryBar() {
  const handleButtonClick = (buttonName) => {
    if (selectedButton !== buttonName) {
      setSelectedButton(buttonName);
    }
  };
  // 활성화 버튼 css
  const buttonActive =
    "flex-1 text-[#121212]center font-medium text-[#121212] hover:text-gray-800 hover:border-b-2 hover:border-black cursor-pointer border-b-2 border-black";
  // 비활성화 버튼 css
  const buttonInactive =
    "flex-1 text-center text-sm font-semibold text-[#AC9261] hover:text-[#121212] hover:border-b-2 hover:border-black cursor-pointer";
  // 선택된 버튼

  const [selectedButton, setSelectedButton] = useRecoilState(searchState);

  return (
    <>
      <div className="flex border-b border-gray-300 px-4 py-3 bg-white">
        <button
          className={
            selectedButton === "웨딩홀" ? buttonActive : buttonInactive
          }
          onClick={() => handleButtonClick("웨딩홀")}
        >
          웨딩홀
        </button>
        <button
          className={
            selectedButton === "드레스" ? buttonActive : buttonInactive
          }
          onClick={() => handleButtonClick("드레스")}
        >
          드레스
        </button>
        <button
          className={
            selectedButton === "스튜디오" ? buttonActive : buttonInactive
          }
          onClick={() => handleButtonClick("스튜디오")}
        >
          스튜디오
        </button>
        <button
          className={
            selectedButton === "헤어, 메이크업" ? buttonActive : buttonInactive
          }
          onClick={() => handleButtonClick("헤어, 메이크업")}
        >
          헤어, 메이크업
        </button>
      </div>
    </>
  );
}
