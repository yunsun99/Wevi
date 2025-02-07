import React, { useState, useRef } from "react";
import icon_search from "../../assets/icons/icon_search.png";
// 성일

export default function Search() {
  return (
    <>
      <div className="flex items-center w-full bg-gray-100 rounded-[10px] p-2 mb-4">
        {/* Google 아이콘 */}
        <div className="flex items-center justify-center h-8 w-8 bg-white rounded-full shadow-sm">
          <img src={icon_search} alt="Google Icon" className="h-5 w-5" />
        </div>

        {/* 검색 입력창 */}
        <input
          type="text"
          placeholder="검색"
          className="flex-1 bg-transparent px-4 text-sm text-gray-700 focus:outline-none"
        />
      </div>
    </>
  );
}
