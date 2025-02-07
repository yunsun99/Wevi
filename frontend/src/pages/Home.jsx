import TopNavigationBar from "../components/Navigators/TopNavigationBar";
import BottomNavigationBar from "../components/Navigators/BottomNavigationBar";
import character_background from "../assets/characters/character_background2.png";
import character_dress from "../assets/characters/character_dress.png";
import character_hair from "../assets/characters/character_hair.png";
import character_original from "../assets/characters/character_original.png";
import character_camera from "../assets/characters/character_camera2.png";

import { useState } from "react";

export default function Home() {
  // 말풍선 내용 상태 관리
  const [speechText, setSpeechText] = useState("안녕하세요");

  // 말풍선 내용 변경 핸들러
  const handleInputChange = (event) => {
    setSpeechText(event.target.value); // 입력값으로 말풍선 업데이트
  };

  return (
    <>
      <TopNavigationBar />
      <div className="h-20 flex justify-end items-center px-4">
        <div className="text-2xl font-bold">1 일째</div>
      </div>
      <main className="flex flex-col w-screen items-center justify-center overflow-hidden h-[calc(100vh-144px)]">
        <div className="relative w-full flex items-center justify-center">
          {/* 캐릭터 배경 */}
          <img
            src={character_background}
            alt="Character Background"
            className="absolute  object-contain"
          />
          {/* 캐릭터 */}
          <img
            src={character_original}
            alt="Character Original"
            className="absolute  object-contain"
          />
          {/* 캐릭터 드레스 */}
          <img
            src={character_dress}
            alt="Character Dress"
            className="absolute  object-contain"
          />
          {/* 캐릭터 헤어 */}
          <img
            src={character_hair}
            alt="Character Hair"
            className="absolute object-contain"
          />
          {/* 카메라 */}
          <img
            src={character_camera}
            alt="Character Camera"
            className="absolute object-contain"
          />
        </div>
      </main>
      <BottomNavigationBar />
    </>
  );
}
