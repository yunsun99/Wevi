import Button1 from "@/components/Buttons/Button1";
import Input from "@/components/Inputs/Input_gray";
import { useState } from "react";
import { axiosCoupleDelete } from "../../api/coupleAxios";

export default function CoupleLinked({ link }) {
  // 연동 취소
  const handleRequest = async (e) => {
    e.preventDefault();

    try {
      const code = await axiosCoupleDelete();
      if (code === 204) {
        window.location.reload();
      }
    } catch (err) {
      consolelog(err.message);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center w-full min-h-[calc(70vh)]">
        {/* 프로필 이미지 */}
        <img
          src={link.profileImage || "/user.png"}
          alt="프로필 이미지"
          className="w-20 h-20 rounded-full object-cover"
        />
        {/* 이름 & 이메일 */}
        <div className="text-center mt-2">
          <p className="text-lg font-semibold">{link.spouseName}</p>
        </div>

        {/* 중앙 문구 */}
        <p className="text-center text-gray-700 text-lg mt-6 font-pretendard">
          {link.spouseName}님과 결혼 준비한 지 368일째
        </p>
      </div>
      <div className="w-full flex flex-col items-center justify-center gap-4">
        <div className="w-[80%]"></div>
        {/* 요청 보내기 버튼 */}
        <div className="w-[80%]">
          <Button1 onClick={handleRequest}>연동 해제</Button1>
        </div>
      </div>
    </>
  );
}
