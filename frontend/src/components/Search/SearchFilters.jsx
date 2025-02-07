import React, { useState, useRef } from "react";
import Region from "../../components/Search/SearchRegion";
import { searchState } from "../../atoms/searchState";
import { useRecoilState } from "recoil";
// 성일

export default function SearchFilters() {
  const [filterState, setfilterState] = useRecoilState(searchState);

  const handleOptionChange = (event, field) => {
    setfilterState((prevState) => ({
      ...prevState,
      [field]: event.target.value,
    }));
  };

  return (
    <>
      {/* 옵션 필터링링 */}
      <div className="flex gap-4 mb-4 overflow-x-auto">
        <Region key="region" />
        {filterState.selectedCategory === "웨딩홀" ? (
          <select
            className="border border-[#D1D1D1] text-[#6E6E6E] p-2 rounded-full flex-shrink-0"
            value={filterState.inoutside || ""}
            onChange={(e) => handleOptionChange(e, "inoutside")}
          >
            <option>무관</option>
            <option value="inside">실내</option>
            <option value="outside">야외</option>
          </select>
        ) : null}
        <select
          className="border border-[#D1D1D1] text-[#6E6E6E] p-2 rounded-full flex-shrink-0"
          value={filterState.price || ""}
          onChange={(e) => handleOptionChange(e, "price")}
        >
          <option>가격</option>
          <option value="asc">오름차순</option>
          <option value="desc">내림차순</option>
        </select>
      </div>
    </>
  );
}
// 우편번호, 도로명, 몇동몇호, (업체+시도/시군구코드)
