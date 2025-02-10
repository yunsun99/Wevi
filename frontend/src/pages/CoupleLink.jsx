import TopNavigationBar from "../components/Navigators/TopNavigationBar2";
import BottomNavigationBar from "../components/Navigators/BottomNavigationBar";

import character_image from "../assets/characters/couple_link.png";
import { useState } from "react";
import Button1 from "@/components/Buttons/Button1";
import Input from "@/components/Inputs/Input_gray";

export default function CoupleLink() {
  const [email, setEmail] = useState("");

  const handleRequest = () => {
    console.log("연동 요청 보냄:", email);
    // TODO: 커플 연동 요청 API 호출
  };
  return (
    <>
      <TopNavigationBar title="커플 연동" />
      <div className="relative w-full flex items-center justify-center">
        {/* 캐릭터 배경 */}
        <img src={character_image} alt="Character Background" />
      </div>
      {/* 문구 */}
      <p className="text-center text-gray-700 text-lg font-medium mt-6 font-pretendard">
        상대방의 이메일을
        <br /> 입력해주세요
      </p>

      {/* 이메일 입력창 */}
      <div className="w-full flex flex-col items-center justify-center mt-4 gap-4">
        <div className="w-[80%] max-w-md">
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="이메일 입력"
          />
        </div>
        {/* 요청 보내기 버튼 */}
        <div className="w-[80%] max-w-m">
          <Button1 onClick={handleRequest}>요청 보내기</Button1>
        </div>
        <BottomNavigationBar />
      </div>
    </>
  );
}
