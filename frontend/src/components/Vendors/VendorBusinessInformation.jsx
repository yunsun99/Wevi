import React from "react";

export default function VendorBusinessInformation({ data }) {
  return (
    <div className="bg-white shadow-md mt-4 p-4">
      <h3 className="text-xl font-bold">사업자 정보</h3>
      <div className="mt-4 grid grid-cols-3 gap-y-2 text-sm text-gray-600">
        {/* 📌 대표자명이 없을 경우 처리 */}
        <p className="font-bold">대표자</p>
        {data.ownerName ? (
          <p className="col-span-2">{data.ownerName}</p>
        ) : (
          <p className="col-span-2 text-gray-400">대표자명이 없습니다</p>
        )}

        {/* 📌 업체명이 없을 경우 처리 */}
        <p className="font-bold">업체명</p>
        {data.vendorName ? (
          <p className="col-span-2">{data.vendorName}</p>
        ) : (
          <p className="col-span-2 text-gray-400">업체명이 없습니다</p>
        )}

        {/* 📌 사업자등록번호가 없을 경우 처리 */}
        <p className="font-bold">사업자등록번호</p>
        {data.registrationNumber ? (
          <p className="col-span-2">{data.registrationNumber}</p>
        ) : (
          <p className="col-span-2 text-gray-400">사업자번호가 없습니다</p>
        )}
      </div>
    </div>
  );
}
