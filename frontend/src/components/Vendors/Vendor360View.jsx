import React, { useState, useRef } from "react";
import icon_search from "../../assets/icons/icon_search.png";
import exampleImage from "../../assets/example_weddinghall.png";
// 성일

export default function Vendor360View({ data }) {
  return (
    <>
      <div className="bg-white rounded-lg shadow-md mt-4 p-4">
        <h3 className="text-xl font-bold">360도 뷰</h3>
        <img
          src={data.images}
          alt="360도 뷰"
          className="w-full h-full object-cover rounded-lg mt-2"
        />
      </div>
    </>
  );
}
