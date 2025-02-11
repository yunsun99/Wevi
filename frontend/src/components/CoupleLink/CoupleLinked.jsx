import Button1 from "@/components/Buttons/Button1";
import Input from "@/components/Inputs/Input_gray";
import { useState } from "react";

export default function CoupleLinked({ link }) {
  const handleRequest = () => {
    console.log(link.profileImage);
  };
  return (
    <>
      <div className="flex flex-col items-center justify-center w-full min-h-[calc(70vh)]">
        {/* 프로필 이미지 */}
        <img
          src={link.profileImage}
          alt="프로필 이미지"
          className="w-20 h-20 rounded-full object-cover"
        />
        {/* 이름 & 이메일 */}
        <div className="text-center mt-2">
          <p className="text-lg font-semibold">{link.name}</p>
          <p className="text-gray-500 text-sm">{link.email}</p>
        </div>

        {/* 중앙 문구 */}
        <p className="text-center text-gray-700 text-lg mt-6 font-pretendard">
          {link.name}님과 결혼 준비한 지 368일째
        </p>
      </div>
      <div className="w-full flex flex-col items-center justify-center gap-4">
        <div className="w-[80%]"></div>
        {/* 요청 보내기 버튼 */}
        <div className="w-[80%]">
          <Button1 onClick={handleRequest}>요청 취소</Button1>
        </div>
      </div>
    </>
  );
}
