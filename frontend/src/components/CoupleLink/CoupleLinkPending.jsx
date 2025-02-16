import Button1 from "@/components/Buttons/Button1";
import Input from "@/components/Inputs/Input_gray";
import { useState } from "react";
import { axiosCoupleRequestDelete } from "../../api/coupleAxios";

export default function CoupleLinkPending({ user }) {
  const [email, setEmail] = useState("");

  const handleRequest = async (e) => {
    e.preventDefault();

    try {
      const code = await axiosCoupleRequestDelete(user.sentRequestId);
      if (code === 204) {
        window.location.reload();
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <div className="w-full flex flex-col items-center justify-center mt-4 gap-4">
      <div className="w-[80%]"></div>
      {/* 요청 보내기 버튼 */}
      <div className="w-[80%] max-w-m mt-30">
        <Button1 onClick={handleRequest}>요청 취소</Button1>
      </div>
    </div>
  );
}
