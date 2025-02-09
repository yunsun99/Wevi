import React, { useState, useRef } from "react";
import icon_search from "../../assets/icons/icon_search.png";
// 성일

export default function VendorSimpleInformation() {
  return (
    <>
        {/* 웨딩홀 정보 vendor simple information*/}
        <div className="bg-white shadow-md mt-4 p-4">
          <h2 className="text-2xl font-bold">대치웨딩컨벤션_강남</h2>
          <p className="text-xl text-gray-600 mt-2">12,441,000원~</p>
          <p className="text-sm text-gray-500 mt-1">📍 강남구 대치동</p>
        </div>
    </>
  );
}
