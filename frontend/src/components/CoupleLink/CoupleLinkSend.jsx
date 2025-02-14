import Button1 from "@/components/Buttons/Button1";
import Input from "@/components/Inputs/Input_gray";
import { useState } from "react";
import { axiosCoupleRequests } from "../../api/coupleAxios";

export default function CoupleLinkSend() {
  const [email, setEmail] = useState("");

  // 커플 요청 함수
  const onRequestsSubmit = async (e) => {
    e.preventDefault();

    try {
      const code = axiosCoupleRequests(email);
    } catch (err) {
      consolelog(err.message);
    }
  };

  return (
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
        <Button1 onClick={onRequestsSubmit}>요청 보내기</Button1>
      </div>
    </div>
  );
}
