import Input from "@/components/Inputs/Input_gray";
import Button1 from "@/components/Buttons/Button1";
import Button2 from "@/components/Buttons/Button2";
import {
  isEmail,
  isNotEmpty,
  hasMinLength,
} from "@/components/Inputs/validation";
import { useInput } from "@/components/Inputs/useInput.js";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import TopNavigationBar3 from "../Navigators/TopNavigationBar3";
import { isEmailDuplicate, sendEmail, verifyEmail } from "../../api/auth";

const Signup1 = ({ formData, setFormData, onNext }) => {
  const navigate = useNavigate(); // 페이지 이동
  // 다음버튼 검증
  const [isEmailValid, setIsEmailValid] = useState(false);
  // 인증버튼 보내졌을시 띄우는 용
  const [isEmailSended, setIsEmailSended] = useState(false);
  // 인증번호
  const verifyInput = useRef();
  // 인증완료시
  const [verifyComplete, setVerifyComplete] = useState(false);

  // 이메일 전송 함수
  const onEmailSubmit = async (e) => {
    e.preventDefault();

    try {
      const verifyCode = await sendEmail(formData.email);
      setIsEmailSended(true);
    } catch (err) {
      console.log(err);
    }
  };

  // 이메일 인증함수
  const onVerifySubmit = async (e) => {
    e.preventDefault();

    try {
      const verifyCode = await verifyEmail(formData.email, verifyInput.current);
      if (verifyCode.data.status === 200) {
        setVerifyComplete(true);
        alert("인증되었습니다.");
      } else if (verifyCode.data.status === 400) {
        alert("인증번호를 다시 입력하세요.");
      }
    } catch (err) {
      alert("인증번호를 다시 입력하세요.");
    }
  };

  // 이메일 입력 관리
  const {
    value: emailValue,
    handelInputChange: handleEmailChange,
    handleInputBlur: handleEmailBlur,
    handleKeyDown: handleEmailKeyDown, // ✅ Enter 감지
    isChecking: isCheckingEmail, // ✅ 중복 확인 중 상태
    extraError: emailError, // ✅ 중복 에러 메시지
    hasError: emailHasError,
  } = useInput(
    formData,
    setFormData,
    "email",
    (value) => isEmail(value || "") && isNotEmpty(value),
    isEmailDuplicate, // ✅ 이메일 중복 검사 함수
    setIsEmailValid
  );

  // 비밀번호 입력 관리
  const {
    value: passwordValue,
    handelInputChange: handlePasswordChange,
    handleInputBlur: handlePasswordBlur,
    hasError: passwordHasError,
  } = useInput(formData, setFormData, "password", (value) =>
    hasMinLength(value, 3)
  );

  // 비밀번호 입력 확인
  const [passwordCheck, setPasswordCheck] = useState("");

  const handlePasswordCheckChange = (e) => {
    setPasswordCheck(e.target.value);
  };

  const passwordCheckHasError =
    passwordValue !== passwordCheck && passwordCheck.length > 0;

  // 모든 입력이 유효하면 '다음' 버튼 활성화
  const [isFormValid, setIsFormValid] = useState(false);
  useEffect(() => {
    setIsFormValid(
      isNotEmpty(formData.email) &&
        isNotEmpty(formData.password) &&
        isNotEmpty(passwordCheck) &&
        !emailHasError &&
        !passwordHasError &&
        !passwordCheckHasError &&
        verifyComplete
    );
  }, [
    formData,
    passwordCheck,
    emailHasError,
    passwordHasError,
    passwordCheckHasError,
    verifyComplete,
  ]);

  const onBack = () => {
    navigate(-1);
    setFormData({
      email: "",
      nickname: "",
      name: "",
      password: "",
      phone: "",
      zonecode: "",
      autoRoadAddress: "",
      addressDetail: "",
    });
  };
  return (
    <>
      <TopNavigationBar3 title="회원가입" onBack={onBack} />
      <div className="flex flex-col items-center px-10">
        {/* 회원가입 제목 */}

        <div className="w-full max-w-md min-h-[calc(100vh-160px)] pt-20">
          {/* 이메일 입력 + 인증 버튼 */}
          <div className="flex gap-2 mb-4">
            <Input
              label="이메일"
              id="email"
              type="email"
              name="email"
              value={emailValue}
              onChange={handleEmailChange}
              onBlur={handleEmailBlur}
              onKeyDown={handleEmailKeyDown} // ✅ Enter 감지 추가
              error={emailError}
              disabled={verifyComplete}
            />
            <div className="pt-7">
              <Button2 onClick={onEmailSubmit} disabled={!isEmailValid}>
                입력
              </Button2>
            </div>
          </div>

          {/* 인증번호 입력 */}
          <div className="flex gap-2 mb-4">
            <Input
              label="인증번호"
              id="verify"
              type="text"
              name="verify"
              onChange={(e) => (verifyInput.current = e.target.value)}
            />
            <div className="pt-7">
              <Button2 onClick={onVerifySubmit} disabled={!isEmailSended}>
                인증
              </Button2>
            </div>
          </div>

          {/* 비밀번호 입력 */}
          <div className="mb-4">
            <Input
              label="비밀번호"
              id="password"
              type="password"
              name="password"
              value={passwordValue}
              onChange={handlePasswordChange}
              onBlur={handlePasswordBlur}
              error={
                passwordHasError && "비밀번호는 최소 6자 이상이어야 합니다."
              }
            />
          </div>

          {/* 비밀번호 확인 입력 */}
          <div className="mb-4">
            <Input
              label="비밀번호 확인"
              id="passwordCheck"
              type="password"
              name="passwordCheck"
              value={passwordCheck}
              onChange={handlePasswordCheckChange}
              error={passwordCheckHasError && "비밀번호가 일치하지 않습니다!"}
            />
          </div>
        </div>
        <Button1 type="button" disabled={!isFormValid} onClick={onNext}>
          다음
        </Button1>
      </div>
      {/* 다음 버튼 */}
    </>
  );
};

export default Signup1;
