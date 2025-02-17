import React, { useState, useEffect, useRef } from "react";
import "pannellum/build/pannellum.css";
import "pannellum";
import * as pannellum from "pannellum";

export default function Vendor360View({ data }) {
  const panoramaImages = data.images.filter(
    (img) => img.imageType === "PANORAMA"
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const viewerRef = useRef(null);
  const panoramaContainerRef = useRef(null);

  useEffect(() => {
    if (panoramaImages.length > 0) {
      // Pannellum 초기화
      viewerRef.current = window.pannellum.viewer(
        panoramaContainerRef.current,
        {
          type: "equirectangular",
          panorama: panoramaImages[currentIndex].imageUrl,
          autoLoad: true,
          compass: true,
          pitch: -10,
          minPitch: -50,
          maxPitch: 80,
          yaw: 0,
          hfov: 100,
          showZoomCtrl: true,
          disablePitchLimits: true,
          hotSpots: [
            {
              pitch: 10,
              yaw: 180,
              type: "info",
              text: "Example Hotspot",
              URL: "https://example.com",
            },
          ],
        }
      );
    }
  }, [currentIndex, panoramaImages]); // 🔄 currentIndex가 변경될 때마다 업데이트

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
      <h3 className="text-xl font-bold">360도 뷰</h3>
      {panoramaImages.length > 0 ? (
        <div className="relative w-full h-[300px] mt-2 rounded-lg">
          {/* 🛠 Pannellum 컨테이너 */}
          <div
            ref={panoramaContainerRef}
            className="w-full h-full rounded-lg"
          ></div>

          {/* 🔄 이전 버튼 */}
          {panoramaImages.length > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full"
              >
                ◀
              </button>
              {/* ⏩ 다음 버튼 */}
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
