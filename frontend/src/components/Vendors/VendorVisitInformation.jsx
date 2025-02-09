import React, { useState, useRef } from "react";
import icon_search from "../../assets/icons/icon_search.png";
import exampleImage from "../../assets/example_weddinghall.png";

// 성일

export default function VendorVisitInformation() {
  return (
    <>
      {/* 방문 안내 visit information*/}
      <div className="bg-white shadow-md mt-4 p-4">
        <h3 className="text-xl font-bold">방문 안내</h3>
        <img
          src={exampleImage}
          alt="지도"
          className="w-full h-full object-cover rounded-lg mt-2"
        />
        <div className="mt-4 grid grid-cols-3 gap-y-2 text-sm text-gray-600">
          <p className="font-bold">주소</p>
          <p className="col-span-2">서울시 강남구 선릉로 757</p>

          <p className="font-bold">지하철</p>
          <p className="col-span-2">7호선 강남구청역 8분</p>

          <p className="font-bold">주차</p>
          <div className="col-span-2">
            <p>내부 200대</p>
            <p>외부 300대</p>
            <p>1시간 30분 무료 이용 (이후 10분당 1,000원)</p>
            <p>혼주 차량 8대 4시간 무료 / 웨딩카 1대 무료</p>
          </div>
        </div>
      </div>
    </>
  );
}
