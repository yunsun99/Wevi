import React, { useEffect, useState } from "react";
import icon_search from "../../assets/icons/icon_search.png";
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

  return (
    <div className="flex items-center w-full bg-gray-100 rounded-[10px] p-2 mb-4">
      <div className="flex items-center justify-center h-8 w-8 bg-white rounded-full shadow-sm">
        <img src={icon_search} alt="Google Icon" className="h-5 w-5" />
      </div>
      <input
        type="text"
        placeholder="검색"
        className="flex-1 bg-transparent px-4 text-sm text-gray-700 focus:outline-none"
        value={localSearchText}
        onChange={handleInputChange}
      />
    </div>
  );
}
