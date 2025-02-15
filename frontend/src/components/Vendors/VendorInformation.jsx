import React from "react";

export default function VendorInformation({ data }) {
  return (
    <div className="bg-white shadow-md mt-4 p-4">
      <h3 className="text-xl font-bold">업체 정보</h3>
      <div className="mt-4 grid grid-cols-3 gap-y-2 text-sm text-gray-600">
        {/* 📌 전화번호가 없을 경우 처리 */}
        <p className="font-bold">전화번호</p>
        {data.vendorPhone ? (
          <p className="col-span-2">{data.vendorPhone}</p>
        ) : (
          <p className="col-span-2 text-gray-400">전화번호가 없어요</p>
        )}

        {/* 📌 홈페이지가 없을 경우 처리 */}
        <p className="font-bold">홈페이지</p>
        <p className="col-span-2">
          {data.homepage ? (
            <a
              href={data.homepage}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500"
            >
              {data.homepage}
            </a>
          ) : (
            <span className="text-gray-400">홈페이지가 없어요</span>
          )}
        </p>

        {/* 📌 영업시간이 없을 경우 처리 */}
        <p className="font-bold">영업시간</p>
        <div className="col-span-2">
          {data.businessHour ? (
            <>
              <p>월~금 {data.businessHour}</p>
              <p>주말/공휴일 {data.businessHour}</p>
            </>
          ) : (
            <p className="text-gray-400">영업시간 정보가 없어요</p>
          )}
        </div>
      </div>
    </div>
  );
}
