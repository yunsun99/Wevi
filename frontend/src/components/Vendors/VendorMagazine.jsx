import React, { useState, useRef } from "react";
import icon_search from "../../assets/icons/icon_search.png";
import exampleImage from "../../assets/example_weddinghall.png"

// 성일

export default function VendorMagazine() {
  return (
    <>
      {/* 업체 화보 사진 */}
      <div className="bg-white rounded-lg shadow-md mt-4 p-4">
        <h3 className="text-xl font-bold">업체 화보사진</h3>
        <div className="flex gap-4 mt-2 overflow-x-auto scrollbar-hide">
          <img
            src={exampleImage}
            alt="화보 1"
            className="w-40 h-56 object-cover rounded-lg flex-shrink-0"
          />
          <img
            src={exampleImage}
            alt="화보 2"
            className="w-40 h-56 object-cover rounded-lg flex-shrink-0"
          />
          <img
            src={exampleImage}
            alt="화보 3"
            className="w-40 h-56 object-cover rounded-lg flex-shrink-0"
          />
          <img
            src={exampleImage}
            alt="화보 4"
            className="w-40 h-56 object-cover rounded-lg flex-shrink-0"
          />
        </div>
      </div>

    </>
  );
}
