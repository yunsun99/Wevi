import React from "react";
import weddinghall_default from "../../assets/weddinghall_default.png";

export default function VendorImage({ data }) {
  return (
    <div className="relative w-full h-full">
      {/* 상단 이미지 vendor image */}
      {data.images && data.images.length > 0 ? (
        <img
          src={data.images[0].imageUrl}
          alt="웨딩홀 이미지"
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="relative w-full h-full">
          {/* 디폴트 이미지 */}
          <img
            src={weddinghall_default}
            alt="웨딩홀 기본 이미지"
            className="w-full h-[30.654vh] object-cover"
          />
          {/* 이미지 위에 텍스트 */}
          <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white px-4 py-2 rounded-md text-sm">
            이미지가 없습니다.
          </span>
        </div>
      )}
    </div>
  );
}
