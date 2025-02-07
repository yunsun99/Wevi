import TopNavigationBar from "../components/Navigators/TopNavigationBar";
import BottomNavigationBar from "../components/Navigators/BottomNavigationBar";
import potatooriginal from "../assets/characters/potato_original.png";

import { Link } from "react-router-dom";

import { useState } from "react";

/** AI플래너 시작 페이지
 * 사용자가 원하는 스타일 입력 받기
 * 사진을 주고 고르는 형태가 나을 것 같은데?
 * ex) 웨딩홀 -> 화려한 예시, 웅장한 예시 등등
 */
export default function AiPlannerStart() {
  // 말풍선 내용 상태 관리
  const [speechText, setSpeechText] =
    useState("당신이 원하는 스타일을 말해주세요");

  // 말풍선 내용 변경 핸들러
  const handleInputChange = (event) => {
    setSpeechText(event.target.value); // 입력값으로 말풍선 업데이트
  };

  return (
    <>
      <TopNavigationBar />
      <main className="flex flex-col pt-4 pb-4 w-screen items-center justify-center min-h-[calc(100vh-8rem)] bg-[#609966]">
        {/* 가운데 사진 */}
        <div className="relative">
          <img
            src={potatooriginal} // 감자 이미지 경로 설정
            alt="Potato"
            className="w-auto h-auto" // 높이 고정
          />
          {/* 말풍선 */}
          <div className="font-pretendard absolute top-15 left-1/2 -translate-x-1/2 -translate-y-full bg-white p-4 rounded-lg shadow-md text-center text-gray-800 w-[300px] max-w-auto max-h-30 overflow-y-auto whitespace-normal">
            {speechText}
          </div>
        </div>

        <div className="max-w-lg mx-auto p-4 bg-white rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">결혼식 정보 입력</h2>

          {/* 1. 결혼식 원하는 지역 */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              결혼식 원하는 지역
            </label>
            <input
              type="text"
              placeholder="예시: 서울시 양천구"
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* 2. 총 예산 */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">총 예산</label>
            <input
              type="number"
              placeholder="예시: 5000000"
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* 3. 웨딩홀 선택 */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              웨딩홀 (실내 또는 야외)
            </label>
            <select className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="indoor">실내</option>
              <option value="outdoor">야외</option>
            </select>
          </div>

          {/* 4. 웨딩홀 분위기 */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              웨딩홀 분위기
            </label>
            <input
              type="text"
              placeholder="예시: 화려한, 웅장한, 독채"
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span>
              #화려한 #웅장한 #모던한 #세련된 #독채 #야외 #클래식 #로맨틱한
            </span>
          </div>

          {/* 5. 스튜디오 분위기 */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              스튜디오 분위기
            </label>
            <input
              type="text"
              placeholder="예시: 화려한, 고급스러운"
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span>
              #고급진 #심플한 #수수한 #화려한 #드라마틱한 #자연스러운 #모던한
              #아늑한
            </span>
          </div>

          {/* 6. 드레스 분위기 */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              드레스 분위기
            </label>
            <input
              type="text"
              placeholder="예시: 화려한, 수수한, 고급스러운"
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span>
              #클래식한 #화려한 #비즈 #레이스 #심플한 #독특한 #우아한 #섬세한
            </span>
          </div>

          {/* 7. 헤어메이크업 분위기 */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              헤어메이크업 분위기
            </label>
            <input
              type="text"
              placeholder="예시: 화려한, 수수한"
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span>
              #화려한 #자연스러운 #고급진 #정교한 #수수한 #트렌디한 #러블리한
              #깔끔한
            </span>
          </div>

          {/* 제출 버튼 */}
          <Link to="/aiplannerresult">
            <button className="w-full bg-blue-500 text-black e p-2 rounded-md hover:bg-blue-600 transition">
              정보 제출
            </button>
          </Link>
        </div>
      </main>
      <BottomNavigationBar />
    </>
  );
}
