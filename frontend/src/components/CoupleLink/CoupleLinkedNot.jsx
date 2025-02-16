import character_image from "@/assets/characters/couple_link.png";
import CoupleLinkSend from "@/components/CoupleLink/CoupleLinkSend";
import CoupleLinkPending from "@/components/CoupleLink/CoupleLinkPending";
import CoupleLinkReceive from "@/components/CoupleLink/CoupleLinkReceive";

export default function CoupleLinkedNot({ link }) {
  console.log(link.type);
  return (
    <>
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
          <CoupleLinkPending user={link} />
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
    </>
  );
}
