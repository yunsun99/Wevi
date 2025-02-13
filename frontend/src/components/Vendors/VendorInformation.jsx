import React from "react";
// 성일

export default function VendorInformation({ data }) {
  return (
    <div className="bg-white shadow-md mt-4 p-4">
      <h3 className="text-xl font-bold">업체 정보</h3>
      <div className="mt-4 grid grid-cols-3 gap-y-2 text-sm text-gray-600">
        <p className="font-bold">전화번호</p>
        <p className="col-span-2">{data.vendorPhone}</p>

        <p className="font-bold">홈페이지</p>
        <p className="col-span-2">
          <a href={data.homepage} className="text-blue-500">
            {data.homepage}
          </a>
        </p>

        <p className="font-bold">영업시간</p>
        <div className="col-span-2">
          <p>월~금 {data.businessHour}</p>
          <p>주말/공휴일 {data.businessHour}</p>
        </div>
      </div>
    </div>
  );
}
