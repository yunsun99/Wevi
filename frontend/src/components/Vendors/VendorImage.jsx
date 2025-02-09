import React, { useState, useRef } from "react";
import icon_search from "../../assets/icons/icon_search.png";
import exampleImage from "../../assets/example_weddinghall.png"
// 성일

export default function VendorImage() {
  
  return (
    <>
        {/* 상단 이미지 vendor image */}
        <img
          src={exampleImage}
          alt="웨딩홀 이미지"
          className="w-full h-72 object-cover"
        />
    </>
  );
}
