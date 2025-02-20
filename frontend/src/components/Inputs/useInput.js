import { useState } from "react";
import { isEmail } from "@/components/Inputs/validation";

export function useInput(
  formData,
  setFormData,
  fieldName,
  validationFn,
  extraValidationFn = null,
  setIsEmailValid = null
) {
  const [didEdit, setDidEdit] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [extraError, setExtraError] = useState(null);

  const valueIsValid = validationFn(formData[fieldName]);

  function handelInputChange(event) {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: event.target.value,
    }));
    setDidEdit(false);
    setExtraError(null);

    // ✅ 이메일 입력값이 바뀌면 인증 버튼 비활성화
    if (fieldName === "email" && setIsEmailValid) {
      setIsEmailValid(false);
    }
  }

  async function handleInputBlur() {
    setDidEdit(true);

    if (fieldName === "email") {
      if (!isEmail(formData[fieldName])) {
        setExtraError("유효한 이메일을 입력해주세요.");
        return; // ✅ 이메일 형식이 틀리면 중복 검사 실행 안 함
      }
    }

    if (extraValidationFn) {
      setIsChecking(true);
      const errorCode = await extraValidationFn(formData[fieldName]);
      setIsChecking(false);

      // ✅ 중복 검사 결과에 따라 오류 메시지 설정 및 인증 버튼 활성화 여부 결정
      setExtraError(errorCode === 400 ? "이미 사용 중인 이메일입니다." : "");

      // ✅ 이메일이 사용 가능하면 인증 버튼 활성화
      if (setIsEmailValid) {
        setIsEmailValid(errorCode === 200);
      }
    }
  }

  async function handleKeyDown(event) {
    if (event.key === "Enter") {
      await handleInputBlur(); // ✅ 엔터 눌렀을 때도 중복 검사 실행
    }
  }

  // const formatPhoneNumber = (value) => {
  //   value = value.replace(/\D/g, ""); // 숫자만 남기기
  //   if (value.length < 4) return value;
  //   if (value.length < 8) return `${value.slice(0, 3)}-${value.slice(3)}`;
  //   if (value.length === 10)
  //     return `${value.slice(0, 3)}-${value.slice(3, 6)}-${value.slice(6)}`;
  //   return `${value.slice(0, 3)}-${value.slice(3, 7)}-${value.slice(7, 11)}`;
  // };

  // const handlePhoneChange = (e) => {
  //   const formatted = formatPhoneNumber(e.target.value);
  //   setFormData((prev) => ({ ...prev, phone: formatted }));
  // };

  return {
    value: formData[fieldName] || "",
    handelInputChange,
    handleInputBlur,
    handleKeyDown, // ✅ Enter 감지 추가
    isChecking,
    extraError,
    hasError: didEdit && (!valueIsValid || extraError),
  };
}
