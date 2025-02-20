import React, { useEffect, useState } from "react";
import icon_search from "../../assets/icons/icon_search.png";
import icon_close from "../../assets/icons/icon_close.png"; // ✅ 닫기 아이콘 추가
import { searchTextState } from "../../atoms/searchState";
import { useRecoilState } from "recoil";
import { useParams } from "react-router-dom";

export default function Search() {
  const { category } = useParams();
  const [searchText, setSearchText] = useRecoilState(searchTextState);
  const [localSearchText, setLocalSearchText] = useState(searchText);

  useEffect(() => {
    setSearchText(""); // ✅ Recoil 상태 초기화
    setLocalSearchText(""); // ✅ local 상태도 초기화
  }, [category]);

  useEffect(() => {
    const debounce = setTimeout(() => {
      setSearchText(localSearchText);
    }, 300);

    return () => clearTimeout(debounce); // cleanup으로 기존 타이머 제거
  }, [localSearchText, setSearchText]);

  const handleInputChange = (e) => {
    setLocalSearchText(e.target.value);
  };

  // ✅ X 버튼 클릭 시 검색어 초기화
  const handleClearSearch = () => {
    setLocalSearchText("");
    setSearchText("");
  };

  return (
    <div className="relative flex items-center w-full bg-gray-100 rounded-[10px] p-2 mb-4">
      {/* 🔍 검색 아이콘 */}
      <div className="flex items-center justify-center h-8 w-8 bg-white rounded-full shadow-sm">
        <img src={icon_search} alt="Search Icon" className="h-5 w-5" />
      </div>

      {/* 검색 입력창 */}
      <input
        type="text"
        placeholder="검색"
        className="flex-1 bg-transparent px-4 text-sm text-gray-700 focus:outline-none"
        value={localSearchText}
        onChange={handleInputChange}
      />

      {/* ❌ X 버튼 (검색어가 있을 때만 표시) */}
      <button
        className="absolute right-3 top-1/2 transform -translate-y-1/2"
        onClick={handleClearSearch}
        aria-label="Clear search"
      >
        <img
          src={icon_close}
          alt="Clear"
          className="h-5 w-5 opacity-80 hover:opacity-100"
        />
      </button>
    </div>
  );
}
