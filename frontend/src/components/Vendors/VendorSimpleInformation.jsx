import React from "react";

export default function VendorSimpleInformation({ data }) {
  return (
    <div className="bg-white shadow-md mt-4 p-4">
      {/* 📌 업체명 예외 처리 */}
      <h2 className="text-2xl font-bold">
        {data.vendorName ? data.vendorName : "업체명이 없습니다"}
      </h2>

      {/* 📌 최소 가격 예외 처리 (0원 또는 미정인 경우) */}
      <p className="text-xl text-gray-600 mt-2">
        {data.minPrice
          ? `${data.minPrice.toLocaleString()}원`
          : "가격 정보 없음"}
      </p>

      {/* 📌 주소 예외 처리 */}
      <p className="text-sm text-gray-500 mt-1">
        📍 {data.autoRoadAddress ? data.autoRoadAddress : "주소 정보 없음"}
      </p>
    </div>
  );
}
