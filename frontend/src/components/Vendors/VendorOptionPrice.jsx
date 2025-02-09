import React from "react";
// 성일

export default function VendorOptionPrice() {
  return (
    <div className="bg-white shadow-md mt-4 p-4">
      <h3 className="text-xl font-bold">옵션별 가격</h3>
      <div className="mt-4 grid grid-cols-3 gap-y-2 text-sm text-gray-600">
        <p className="font-bold">그랜드홀</p>
        <p className="col-span-2">10,000,000원</p>

        <p className="font-bold">부페</p>
        <p className="col-span-2">3,000,000원</p>

        <p className="font-bold">서브홀</p>
        <p className="col-span-2">1,000,000원</p>

        <p className="font-bold">주차비</p>
        <p className="col-span-2">포함</p>

        <p className="font-bold">꽃장식</p>
        <p className="col-span-2">4,000,000원</p>
      </div>
    </div>
  );
}
