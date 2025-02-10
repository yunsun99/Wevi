import TopNavigationBar from "../components/Navigators/TopNavigationBar2";
import BottomNavigationBar from "../components/Navigators/BottomNavigationBar";

import character_image from "../assets/characters/couple_link.png";
import Button1 from "@/components/Buttons/Button1";
import Input from "@/components/Inputs/Input_gray";
import CoupleLinkSend from "../components/Forms/CoupleLinkSend";
import { useEffect, useState } from "react";
import { getCoupleLinkState } from "../api/user";
import CoupleLinkPending from "../components/Forms/CoupleLinkPending";
import CoupleLinkReceive from "../components/Forms/CoupleLinkReceive";

export default function CoupleLink() {
  const [link, setLink] = useState({
    link: 0,
    data: "",
  });

  useEffect(() => {
    const axiosLink = async () => {
      try {
        const data = await getCoupleLinkState();
        setLink(data);
        console.log(link.type);
      } catch (error) {
        console.log(error);
      }
    };
    axiosLink();
  }, []);

  return (
    <>
      <TopNavigationBar title="커플 연동" />
      <div className="relative w-full flex items-center justify-center">
        {/* 캐릭터 배경 */}
        <img src={character_image} alt="Character Background" />
      </div>
      {/* 문구 */}

      {link.type === 0 && (
        <>
          <p className="text-center text-gray-700 text-lg mt-6 font-pretendard">
            상대방의 이메일을
            <br /> 입력해주세요
          </p>
          <CoupleLinkSend />
        </>
      )}
      {link.type === 1 && (
        <>
          <p className="text-center text-gray-700 text-lg mt-6 font-pretendard">
            상대방의 수락을
            <br /> 기다리는 중입니다.
          </p>
          <CoupleLinkPending />
        </>
      )}
      {link.type === 2 && (
        <>
          <p className="text-center text-gray-700 text-lg mt-6 font-pretendard">
            OOO님으로부터
            <br /> 연동 신청이 왔습니다.
          </p>
          <CoupleLinkReceive />
        </>
      )}

      <BottomNavigationBar />
    </>
  );
}
