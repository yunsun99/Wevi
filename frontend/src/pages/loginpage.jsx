import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { userState } from "@/atoms/userState";
import {
  isEmail,
  isNotEmpty,
  hasMinLength,
} from "@/components/Inputs/validation";
import { handleLogin } from "@/api/auth";
import { useInput } from "@/components/Inputs/useInput.js";
import logo from "@/assets/logo.png";
import Input from "@/components/Inputs/Input_gray";
import Button1 from "@/components/Buttons/Button1";

export default function LoginPage() {
  const [error, setError] = useState(null); // 로그인 실패 메시지
  const setUser = useSetRecoilState(userState); // Recoil 상태 업데이트
  const navigate = useNavigate(); // 페이지 이동

  // 이메일 입력 관리
  const {
    value: emailValue,
    handelInputChange: handleEmailChange,
    handleInputBlur: handleEmailBlur,
    hasError: emailHasError,
  } = useInput("", (value) => isEmail(value) && isNotEmpty(value));

  // 비밀번호 입력 관리
  const {
    value: passwordValue,
    handelInputChange: handlePasswordChange,
    handleInputBlur: handlePasswordBlur,
    hasError: passwordHasError,
  } = useInput("", (value) => hasMinLength(value));

  // 로그인 요청 함수
  const onLoginSubmit = async (e) => {
    e.preventDefault();
    setError(null); // 기존 에러 초기화

    try {
      const userCode = await handleLogin(emailValue, passwordValue);
      setUser(userCode);
      if (userCode == 200) {
        navigate("/");
      }
    } catch (err) {
      setError(err.message); // ✅ 서버에서 받은 오류 메시지 표시
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[100vh] bg-gray-100">
      {/* 로고 */}
      <img src={logo} alt="WEVI Logo" className="w-32 mb-6" />

      {/* 입력 폼 */}
      <form onSubmit={onLoginSubmit} className="w-90">
        <div className="w-full max-w-sm p-6 rounded-lg">
          <Input
            label="이메일"
            id="email"
            type="email"
            name="email"
            onBlur={handleEmailBlur}
            onChange={handleEmailChange}
            value={emailValue}
            error={emailHasError && "이메일을 입력해주세요."}
          />

          <Input
            id="password"
            label="비밀번호"
            type="password"
            name="password"
            onBlur={handlePasswordBlur}
            onChange={handlePasswordChange}
            value={passwordValue}
            error={passwordHasError && "비밀번호를 입력해주세요."}
          />

          {/* 에러 메시지 */}
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

          {/* 로그인 버튼 */}
          <Button1 type="submit">로그인</Button1>

          {/* 회원가입 문구 */}
          <p className="text-center text-gray-600 mt-4 text-sm">
            처음이신가요?
          </p>
        </div>
      </form>
    </div>
  );
}
