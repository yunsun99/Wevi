import React from "react";
// 성일

export default function VendorBusinessInformation() {
  return (
    <div className="bg-white shadow-md mt-4 p-4">
      <h3 className="text-xl font-bold">사업자 정보</h3>
      <div className="mt-4 grid grid-cols-3 gap-y-2 text-sm text-gray-600">
        <p className="font-bold">대표자</p>
        <p className="col-span-2">김대표</p>

        <p className="font-bold">업체명</p>
        <p className="col-span-2">대치웨딩컨벤션</p>

        <p className="font-bold">사업자등록번호</p>
        <p className="col-span-2">000-00-00000</p>
      </div>
    </div>
  );
}
