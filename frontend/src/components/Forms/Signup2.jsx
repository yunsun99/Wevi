import Input from "@/components/Inputs/Input_gray";
import Button1 from "@/components/Buttons/Button1";
import Button2 from "@/components/Buttons/Button2";
import { isNotEmpty } from "@/components/Inputs/validation";
import { useInput } from "@/components/Inputs/useInput.js";
import { useEffect, useState } from "react";
import TopNavigationBar3 from "../Navigators/TopNavigationBar3";
import { handleSignUp } from "../../api/auth";
import { useNavigate } from "react-router-dom";

const Signup2 = ({ formData, setFormData, onPrevious }) => {
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  // 닉네임 입력 관리
  const {
    value: nickNameValue,
    handelInputChange: handleNickNameChange,
    handleInputBlur: handleNickNameBlur,
    hasError: nickNameHasError,
  } = useInput(formData, setFormData, "nickname", (value) => isNotEmpty(value));

  // 이름 입력 관리
  const {
    value: nameValue,
    handelInputChange: handleNameChange,
    handleInputBlur: handleNameBlur,
    hasError: nameHasError,
  } = useInput(formData, setFormData, "name", (value) => isNotEmpty(value));

  // 휴대전화 입력 관리
  const {
    value: phoneValue,
    handlePhoneChange: handlePhoneChange,
    handleInputBlur: handlePhoneBlur,
    hasError: phoneHasError,
  } = useInput(formData, setFormData, "phone", (value) => isNotEmpty(value));

  // 주소 입력 관리리
  const {
    value: zonecodeValue,
    handelInputChange: handlezonecodeChange,
    handleInputBlur: handlezonecodeBlur,
    hasError: zonecodeHasError,
  } = useInput(formData, setFormData, "zonecode", (value) => isNotEmpty(value));

  // 주소 디테일 입력 관리
  const {
    value: addressDetailValue,
    handelInputChange: handleAddressDetailChange,
    handleInputBlur: handleAddressDetailBlur,
    hasError: addressDetailHasError,
  } = useInput(formData, setFormData, "addressDetail", (value) =>
    isNotEmpty(value)
  );

  // 모든 입력이 유효하면 '다음' 버튼 활성화
  const [isFormValid, setIsFormValid] = useState(false);
  useEffect(() => {
    setIsFormValid(
      isNotEmpty(formData.nickname) &&
        isNotEmpty(formData.name) &&
        isNotEmpty(formData.phone) &&
        isNotEmpty(formData.zonecode) &&
        isNotEmpty(formData.addressDetail) &&
        !nickNameHasError &&
        !nameHasError &&
        !phoneHasError &&
        !zonecodeHasError &&
        !addressDetailHasError
    );
  }, [
    formData,
    nickNameHasError,
    nameHasError,
    phoneHasError,
    zonecodeHasError,
    addressDetailHasError,
  ]);

  // 회원가입 요청 함수
  const onSignUpSubmit = async (e) => {
    e.preventDefault();

    try {
      const userCode = await handleSignUp(formData);
      setError(userCode);
      if (userCode === 200) {
        navigate("/");
      }
    } catch (err) {
      setError(err.message); // ✅ 서버에서 받은 오류 메시지 표시
    }
  };
  return (
    <>
      <TopNavigationBar3 title="회원가입" onBack={onPrevious} />
      <div className="flex flex-col items-center px-10">
        {/* 회원가입 제목 */}

        <div className="w-full max-w-md min-h-[calc(100vh-160px)] pt-20">
          {/* 닉네임 */}
          <div className="mb-4">
            <Input
              label="닉네임"
              id="nickname"
              type="text"
              name="nickname"
              value={nickNameValue}
              onChange={handleNickNameChange}
              onBlur={handleNickNameBlur}
              error={nickNameHasError && "필수 입력 사항입니다."}
            />
          </div>
          <div className="mb-4">
            <Input
              label="이름"
              id="name"
              type="text"
              name="name"
              value={nameValue}
              onChange={handleNameChange}
              onBlur={handleNameBlur}
              error={nameHasError && "필수 입력 사항입니다."}
            />
          </div>

          <div className="mb-4">
            <Input
              label="휴대전화"
              id="phone"
              type="tel"
              name="phone"
              value={phoneValue}
              onChange={handlePhoneChange}
              onBlur={handlePhoneBlur}
              error={phoneHasError && "필수 입력 사항입니다다."}
            />
          </div>

          <div className="flex gap-2 mb-4">
            <Input
              label="주소"
              id="zonecode"
              type="number"
              name="zonecode"
              value={zonecodeValue}
              onChange={handlezonecodeChange}
              onBlur={handlezonecodeBlur}
              error={zonecodeHasError && "필수 입력 사항입니다."}
            />
            <div className="pt-7">
              <Button2>인증</Button2>
            </div>
          </div>

          <div className="mb-4">
            <Input
              label="주소"
              id="addressDetail"
              type="text"
              name="addressDetail"
              value={addressDetailValue}
              onChange={handleAddressDetailChange}
              onBlur={handleAddressDetailBlur}
              error={addressDetailHasError && "필수 입력 사항입니다."}
            />
          </div>
        </div>
        {/* 다음 버튼 */}
        <Button1 type="button" disabled={!isFormValid} onClick={onSignUpSubmit}>
          가입 완료
        </Button1>
      </div>
    </>
  );
};

export default Signup2;
