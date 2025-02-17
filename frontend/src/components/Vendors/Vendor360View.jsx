import React, { useState, useEffect } from "react";

export default function Vendor360View({ data }) {
  // PANORAMA 이미지 필터링
  const panoramaImages = data.images.filter(
    (img) => img.imageType === "PANORAMA"
  );

  // 현재 슬라이드 인덱스
  const [currentIndex, setCurrentIndex] = useState(0);

  // 이전/다음 버튼 핸들러
  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? panoramaImages.length - 1 : prevIndex - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === panoramaImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-md mt-4 p-4 relative">
      <h3 className="text-xl font-bold w-full h-full">360도 뷰</h3>
      {panoramaImages.length > 0 ? (
        <div className="relative w-full h-full h-64 overflow-hidden mt-2 rounded-lg">
          <img
            src={panoramaImages[currentIndex].imageUrl}
            alt="360도 뷰"
            className="w-full h-full object-cover rounded-lg transition-opacity duration-500 ease-in-out"
          />
          {/* 이전 버튼 */}
          {panoramaImages.length > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full"
              >
                ◀
              </button>
              {/* 다음 버튼 */}
              <button
                onClick={nextSlide}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full"
              >
                ▶
              </button>
            </>
          )}
        </div>
      ) : (
        <p className="text-gray-500 mt-2">360도 뷰 이미지가 없습니다.</p>
      )}
    </div>
  );
}
