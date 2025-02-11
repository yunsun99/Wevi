import Button1 from "@/components/Buttons/Button1";
import Input from "@/components/Inputs/Input_gray";
import { useState } from "react";

export default function CoupleLinkReceive() {
  const [email, setEmail] = useState("");

  const handleRequest = () => {
    console.log("연동 요청 보냄:", email);
    // TODO: 커플 연동 요청 API 호출
  };
  return (
    <div className="w-full flex flex-col items-center justify-center mt-4 gap-4">
      <div className="w-[80%] max-w-md"></div>
      {/* 요청 보내기 버튼 */}
      <div className="w-[80%] max-w-m mt-30 flex gap-4">
        <Button1 onClick={handleRequest}>거절</Button1>
        <Button1 onClick={handleRequest}>수락</Button1>
      </div>
    </div>
  );
}
