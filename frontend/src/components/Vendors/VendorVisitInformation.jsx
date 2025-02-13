import React from "react";
import exampleImage from "../../assets/example_weddinghall.png";

// 성일

export default function VendorVisitInformation({ data }) {
  // `parkinglot` 데이터를 줄바꿈(`\n`) 또는 쉼표(`, `) 기준으로 분리
  const parkingInfoList = data.parkinglot ? data.parkinglot.split(/, |\n/) : [];

  return (
    <div className="bg-white shadow-md mt-4 p-4">
      <h3 className="text-xl font-bold">방문 안내</h3>
      <img
        src={exampleImage}
        alt="지도"
        className="w-full h-full object-cover rounded-lg mt-2"
      />
      <div className="mt-4 grid grid-cols-3 gap-y-2 text-sm text-gray-600">
        <p className="font-bold">주소</p>
        <p className="col-span-2">{data.autoRoadAddress}</p>

        <p className="font-bold">지하철</p>
        <p className="col-span-2">{data.subway}</p>

        <p className="font-bold">주차</p>
        <div className="col-span-2">
          {parkingInfoList.map((info, index) => (
            <p key={index}>{info}</p>
          ))}
        </div>
      </div>
    </div>
  );
}
