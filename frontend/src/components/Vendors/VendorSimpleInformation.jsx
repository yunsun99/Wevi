import React, { useState, useRef } from "react";
import icon_search from "../../assets/icons/icon_search.png";
import { useRecoilState } from "recoil";
import { vendorState } from "../../atoms/vendorState";
// 성일

export default function VendorSimpleInformation({ data }) {
  return (
    <>
      {/* 웨딩홀 정보 vendor simple information*/}
      <div className="bg-white shadow-md mt-4 p-4">
        <h2 className="text-2xl font-bold">{data.vendorName}</h2>
        <p className="text-xl text-gray-600 mt-2">{`${data.minPrice.toLocaleString()}원`}</p>
        <p className="text-sm text-gray-500 mt-1">📍 {data.autoRoadAddress}</p>
      </div>
    </>
  );
}
