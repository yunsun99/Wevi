import React, { useState, useRef } from "react";
import Region from "../../components/Search/SearchRegion";

export default function SearchFilters() {
  return (
    <>
      {/* 옵션 필터링링 */}
      <div className="flex gap-4 mb-4 overflow-x-auto">
        <Region key="region" />
        <select className="border border-[#D1D1D1] text-[#6E6E6E] p-2 rounded-full flex-shrink-0">
          <option>실내</option>
          <option>야외</option>
        </select>
        <select className="border border-[#D1D1D1] text-[#6E6E6E] p-2 rounded-full flex-shrink-0">
          <option>가격</option>
          <option>컨벤션</option>
          <option>하우스</option>
        </select>
        <select className="border border-[#D1D1D1] text-[#6E6E6E] p-2 rounded-full flex-shrink-0">
          <option>가격</option>
          <option>컨벤션</option>
          <option>하우스</option>
        </select>
      </div>
    </>
  );
}
