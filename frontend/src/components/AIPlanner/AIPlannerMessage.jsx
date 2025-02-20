import { useRecoilState } from "recoil";
import {
  questionIndexState,
  plannerState,
  AIquestions,
} from "@/atoms/AIPlannerState";
import { useEffect, useState } from "react";
import InputField from "@/components/AIPlanner/AIPlannerInput"; // ✅ 입력 필드 컴포넌트 임포트
import character_image from "@/assets/characters/couple_link.png";
import { requestAIplanner, handleSubmit } from "../../api/aiplannerAxios";

export default function QuestionFlow() {
  const [questionIndex, setQuestionIndex] = useRecoilState(questionIndexState);
  const [formData, setFormData] = useRecoilState(plannerState);
  const [recommendInfo, setRecommendInfo] = useState();
  // ✅ 1번 & 5번 질문은 2초 후 자동 진행
  useEffect(() => {
    if (questionIndex === 0) {
      const timer = setTimeout(() => {
        setQuestionIndex((prev) => prev + 1);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [questionIndex, setQuestionIndex]);

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
          <InputField
            name="venueStyle"
            placeholder="1. 우아 2. 화려 3. 수수 4. ???"
          />
        )}
        {questionIndex === 2 && (
          <InputField
            name="studioStyle"
            placeholder="1. 우아 2. 화려 3. 수수 4. ???"
          />
        )}
        {questionIndex === 3 && (
          <InputField
            name="dressStyle"
            placeholder="1. 우아 2. 화려 3. 수수 4. ???"
          />
        )}
        {questionIndex === 4 && (
          <InputField
            name="makeupStyle"
            placeholder="1. 우아 2. 화려 3. 수수 4. ???"
          />
        )}

        {questionIndex === AIquestions.length - 1 && (
          <button
            onClick={() => handleSubmit(formData)}
            className="bg-gray-200 p-2 rounded-lg"
          >
            제출
          </button>
        )}
      </div>
      {recommendInfo ? (
        <>
          <span>{recommendInfo.weddingHallVendor.vendorName}</span>
          <span>{recommendInfo.studioVendor.vendorName}</span>
          <span>{recommendInfo.dressVendor.vendorName}</span>
          <span>{recommendInfo.makeUpVendor.vendorName}</span>
        </>
      ) : null}
    </>
  );
}
