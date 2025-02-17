import Input from "@/components/Inputs/Input_gray";
import Button1 from "@/components/Buttons/Button1";
import Button2 from "@/components/Buttons/Button2";
import {
  isEmail,
  isNotEmpty,
  hasMinLength,
} from "@/components/Inputs/validation";
import { useInput } from "@/components/Inputs/useInput.js";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TopNavigationBar3 from "../Navigators/TopNavigationBar3";
import { isEmailDuplicate } from "../../api/auth";

const Signup1 = ({ formData, setFormData, onNext }) => {
  const navigate = useNavigate(); // 페이지 이동

  const [isEmailValid, setIsEmailValid] = useState(false);

  // 인증버튼 관리
  const onValidSubmit = async (e) => {
    e.preventDefault();
    setError(null); // 기존 에러 초기화

    try {
      const userCode = await handleLogin(formData.username, formData.password);
      setUser(userCode);
      const currentToken = await requestFCMToken();
      await sendFCMToken(currentToken);
      if (userCode === 200) {
        setRecoil(isAuthenticatedState, true);
        navigate("/");
      }
    } catch (err) {
      setError(err.message); // ✅ 서버에서 받은 오류 메시지 표시
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
        !passwordCheckHasError
    );
  }, [
    formData,
    passwordCheck,
    emailHasError,
    passwordHasError,
    passwordCheckHasError,
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
            />
            <div className="pt-7">
              <Button2 disabled={!isEmailValid}>인증</Button2>
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
