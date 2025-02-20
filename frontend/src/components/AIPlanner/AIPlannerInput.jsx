import { useRecoilState } from "recoil";
import { plannerState, questionIndexState } from "@/atoms/AIPlannerState";
import { handleSubmit } from "../../api/aiplannerAxios";

export default function InputField({ name, placeholder }) {
  const [formData, setFormData] = useRecoilState(plannerState);
  const [questionIndex, setQuestionIndex] = useRecoilState(questionIndexState);

  const handleInputChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [name]: e.target.value,
    }));
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // ✅ 기본 Enter 키 동작 방지
      if (questionIndex === 4) {
        handleSubmit(formData);
      } else {
        setQuestionIndex((prev) => prev + 1); // ✅ 다음 질문으로 이동
      }
    }
  };

  return (
    <input
      type="text"
      name={name}
      placeholder={placeholder}
      value={formData[name] || ""}
      onChange={handleInputChange}
      onKeyDown={handleKeyPress} // ✅ Enter 키 감지
      className="border border-gray-300 rounded-lg p-2 text-center"
    />
  );
}
