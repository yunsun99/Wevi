import React, { useState, useEffect } from "react";
import exampleImage from "../../assets/example_weddinghall.png";

export default function VendorMagazine({ data }) {
  // 화보 이미지 필터링
  const magazineImages = data.images.filter(
    (img) => img.imageType === "MAGAZINE"
  );

  // 현재 슬라이드 인덱스
  const [currentIndex, setCurrentIndex] = useState(0);

  // // 자동 슬라이드 기능 (3초마다 변경)
  // useEffect(() => {
  //   if (magazineImages.length > 1) {
  //     const interval = setInterval(() => {
  //       setCurrentIndex((prevIndex) =>
  //         prevIndex === magazineImages.length - 1 ? 0 : prevIndex + 1
  //       );
  //     }, 3000);
  //     return () => clearInterval(interval);
  //   }
  // }, [magazineImages.length, currentIndex]);

  // 이전/다음 버튼 핸들러
  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? magazineImages.length - 1 : prevIndex - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === magazineImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-md mt-4 p-4 relative">
      <h3 className="text-xl font-bold">업체 화보사진</h3>
      {magazineImages.length > 0 ? (
        <div className="relative flex items-center justify-center">
          {/* 이전 버튼 */}
          {magazineImages.length > 1 && (
            <button
              onClick={prevSlide}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full z-10"
            >
              ◀
            </button>
          )}
          <div className="relative flex gap-4 mt-2 overflow-hidden w-full max-w-lg">
            <img
              src={magazineImages[currentIndex].imageUrl}
              alt={`화보 ${currentIndex + 1}`}
              className="w-40 h-56 object-cover rounded-lg mx-auto transition-transform duration-500 ease-in-out"
            />
          </div>
          {/* 다음 버튼 */}
          {magazineImages.length > 1 && (
            <button
              onClick={nextSlide}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full z-10"
            >
              ▶
            </button>
          )}
        </div>
      ) : (
        <p className="text-gray-500 mt-2">화보 사진이 없습니다.</p>
      )}
    </div>
  );
}
