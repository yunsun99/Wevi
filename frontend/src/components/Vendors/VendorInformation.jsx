import React from "react";
// 성일

export default function VendorInformation() {
  return (
    <div className="bg-white shadow-md mt-4 p-4">
      <h3 className="text-xl font-bold">업체 정보</h3>
      <div className="mt-4 grid grid-cols-3 gap-y-2 text-sm text-gray-600">
        <p className="font-bold">전화번호</p>
        <p className="col-span-2">02-4318-0007</p>

        <p className="font-bold">홈페이지</p>
        <p className="col-span-2">
          <a href="http://wedding.co.kr" className="text-blue-500">
            http://wedding.co.kr
          </a>
        </p>

        <p className="font-bold">영업시간</p>
        <div className="col-span-2">
          <p>월~금 09:00 ~ 19:00</p>
          <p>주말/공휴일 09:00 ~ 21:00</p>
        </div>
      </div>
    </div>
  );
}
