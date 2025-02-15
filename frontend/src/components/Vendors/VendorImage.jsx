import React, { useState, useRef } from "react";
import icon_search from "../../assets/icons/icon_search.png";
import exampleImage from "../../assets/example_weddinghall.png";
import { useRecoilState } from "recoil";
import { vendorState } from "../../atoms/vendorState";
// 성일

export default function VendorImage({ data }) {
  return (
    <>
      {/* 상단 이미지 vendor image */}
      {data.images && data.images > 0 ? (
        <img
          src={data.images[0].imageUrl}
          alt="웨딩홀 이미지"
          className="w-full h-full object-cover"
        />
      ) : (
        <span>이미지가 없습니다.</span>
      )}
    </>
  );
}
