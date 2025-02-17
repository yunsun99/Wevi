import { useRecoilState } from "recoil";
import {
  questionIndexState,
  plannerState,
  AIquestions,
} from "@/atoms/AIPlannerState";
import { useEffect } from "react";
import InputField from "@/components/AIPlanner/AIPlannerInput"; // ✅ 입력 필드 컴포넌트 임포트
import character_image from "@/assets/characters/couple_link.png";

export default function QuestionFlow() {
  const [questionIndex, setQuestionIndex] = useRecoilState(questionIndexState);
  const [formData, setFormData] = useRecoilState(plannerState);

  // ✅ 1번 & 5번 질문은 2초 후 자동 진행
  useEffect(() => {
    if (questionIndex === 0 || questionIndex === 4) {
      const timer = setTimeout(() => {
        setQuestionIndex((prev) => prev + 1);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [questionIndex, setQuestionIndex]);

  // ✅ 모든 질문이 끝나면 제출 버튼 표시
  const handleSubmit = () => {
    console.log("📩 전송할 데이터:", formData);
    alert("데이터가 저장되었습니다!");
  };

  return (
    <>
      <div className="flex justify-center items-end h-[calc(10vh)]">
        <p className="text-center text-gray-700 font-pretendard">
          {AIquestions[questionIndex]}
        </p>
      </div>
      <div className="relative w-full flex items-center justify-center">
        {/* 캐릭터 배경 */}
        <img src={character_image} alt="Character Background" />
      </div>

      <div className="w-full flex flex-col items-center justify-center mt-4 gap-4">
        {questionIndex === 1 && (
          <InputField name="location" placeholder="서울시 ㅇㅇ구" />
        )}
        {questionIndex === 2 && (
          <InputField name="venueType" placeholder="실내 or 야외" />
        )}
        {questionIndex === 3 && (
          <InputField name="budget" placeholder="예산을 입력해주세요" />
        )}
        {questionIndex === 5 && (
          <InputField
            name="venueStyle"
            placeholder="1. 우아 2. 화려 3. 수수 4. ???"
          />
        )}
        {questionIndex === 6 && (
          <InputField
            name="studioStyle"
            placeholder="1. 우아 2. 화려 3. 수수 4. ???"
          />
        )}
        {questionIndex === 7 && (
          <InputField
            name="dressStyle"
            placeholder="1. 우아 2. 화려 3. 수수 4. ???"
          />
        )}
        {questionIndex === 8 && (
          <InputField
            name="makeupStyle"
            placeholder="1. 우아 2. 화려 3. 수수 4. ???"
          />
        )}

        {questionIndex === AIquestions.length - 1 && (
          <button onClick={handleSubmit} className="bg-gray-200 p-2 rounded-lg">
            제출
          </button>
        )}
      </div>
    </>
  );
}
