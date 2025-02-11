import character_image from "@/assets/characters/couple_link.png";
import Input from "@/components/Inputs/Input_gray.jsx";
import { useInput } from "@/components/Inputs/useInput.js";
import { isNotEmpty } from "@/components/Inputs/validation";

export default function AiPlannerLocation({ formData, setFormData, onNext }) {
  // 지역 입력 관리
  const { value: locationValue, handelInputChange: handleLocationChange } =
    useInput(formData, setFormData, "location", (value) => isNotEmpty(value));
  return (
    <>
      <div className="flex justify-center items-end h-[calc(10vh)]">
        <p className="text-center text-gray-700 font-pretendard">
          지역은 어디가
          <br /> 좋으신가요?
        </p>
      </div>
      <div className="relative w-full flex items-center justify-center">
        {/* 캐릭터 배경 */}
        <img src={character_image} alt="Character Background" />
      </div>
      <div className="w-full flex flex-col items-center justify-center mt-4 gap-4">
        <div className="w-[80%] max-w-md">
          <Input
            type="email"
            value="입력"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="이메일 입력"
          />
        </div>
      </div>
    </>
  );
}
