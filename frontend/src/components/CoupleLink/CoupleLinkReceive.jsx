import Button1 from "@/components/Buttons/Button1";
import Input from "@/components/Inputs/Input_gray";
import { useState } from "react";
import { axiosCoupleReceive } from "../../api/coupleAxios";

export default function CoupleLinkReceive() {
  const handleRequest = async (status) => {
    try {
      const code = await axiosCoupleReceive(status);
      if (code === 200) {
        window.location.reload();
      }
    } catch (err) {
      consolelog(err.message);
    }
  };
  return (
    <div className="w-full flex flex-col items-center justify-center mt-4 gap-4">
      <div className="w-[80%] max-w-md"></div>
      {/* 요청 보내기 버튼 */}
      <div className="w-[80%] max-w-m mt-30 flex gap-4">
        <Button1 onClick={() => handleRequest("REJECTED")}>거절</Button1>
        <Button1 onClick={() => handleRequest("ACCEPTED")}>수락</Button1>
      </div>
    </div>
  );
}
