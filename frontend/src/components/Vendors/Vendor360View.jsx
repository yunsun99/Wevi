import React, { useState, useEffect, useRef } from "react";
import testimage from "@/assets/pannellum/panorama3.jpg"; // src 폴더에서 직접 import
import "@/assets/pannellum/pannellum.css"; // CSS 파일 import

export default function Vendor360View({ data }) {
  useEffect(() => {
    // pannellum.js 스크립트 로드
    const script = document.createElement("script");
    script.src = "/pannellum/pannellum.js"; // public 폴더 내 경로로 수정
    script.async = true;
    script.onload = () => {
      // pannellum.viewer 초기화
      if (window.pannellum) {
        pannellum.viewer("panorama", {
          type: "equirectangular",
          panorama: testimage, // 로컬 이미지 경로
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
        });
      }
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return <div id="panorama" style={{ width: "100%", height: "40vh" }}></div>;
}
