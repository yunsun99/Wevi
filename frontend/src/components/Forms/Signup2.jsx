import Input from "@/components/Inputs/Input_gray";
import Button1 from "@/components/Buttons/Button1";
import Button2 from "@/components/Buttons/Button2";
import { isNotEmpty } from "@/components/Inputs/validation";
import { useInput } from "@/components/Inputs/useInput.js";
import { useEffect, useState } from "react";
import TopNavigationBar3 from "../Navigators/TopNavigationBar3";
import { handleSignUp } from "../../api/auth";
import { useNavigate } from "react-router-dom";
import useDaumPostcodeScript from "./useDaumPostcodeScript ";

const Signup2 = ({ formData, setFormData, onPrevious }) => {
  useDaumPostcodeScript();
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
    handelInputChange: handlePhoneChange,
    handleInputBlur: handlePhoneBlur,
    hasError: phoneHasError,
  } = useInput(formData, setFormData, "phone", (value) => isNotEmpty(value));

  // 주소 (우편번호) 입력 관리
  const {
    value: autoRoadAddressValue,
    handelInputChange: handleautoRoadAddressChange,
    handleInputBlur: handleautoRoadAddressBlur,
    hasError: autoRoadAddressHasError,
  } = useInput(formData, setFormData, "autoRoadAddress", (value) =>
    isNotEmpty(value)
  );

  // 주소 디테일 입력 관리
  const {
    value: addressDetailValue,
    handelInputChange: handleAddressDetailChange,
    handleInputBlur: handleAddressDetailBlur,
    hasError: addressDetailHasError,
  } = useInput(formData, setFormData, "addressDetail", (value) =>
    isNotEmpty(value)
  );

  // 모든 입력이 유효하면 '가입 완료' 버튼 활성화
  const [isFormValid, setIsFormValid] = useState(false);
  useEffect(() => {
    setIsFormValid(
      isNotEmpty(formData.nickname) &&
        isNotEmpty(formData.name) &&
        isNotEmpty(formData.phone) &&
        isNotEmpty(formData.autoRoadAddress) &&
        isNotEmpty(formData.addressDetail) &&
        !nickNameHasError &&
        !nameHasError &&
        !phoneHasError &&
        !autoRoadAddressHasError &&
        !addressDetailHasError
    );
  }, [
    formData,
    nickNameHasError,
    nameHasError,
    phoneHasError,
    autoRoadAddressHasError,
    addressDetailHasError,
  ]);

  // 회원가입 요청 함수
  const onSignUpSubmit = async (e) => {
    e.preventDefault();

    try {
      const userCode = await handleSignUp(formData);
      setError(userCode);
      if (userCode === 200 || userCode === 201) {
        navigate("/");
      }
    } catch (err) {
      setError(err.message); // 서버에서 받은 오류 메시지 표시
    }
  };

  // 주소 검색 함수 (Daum 우편번호 서비스 활용)
  const openAddressSearch = () => {
    new window.daum.Postcode({
      oncomplete: function (data) {
        // data 객체에 zonecode, roadAddress, jibunAddress 등이 포함되어 있습니다.
        // 예: 도로명 주소를 기본으로 사용
        console.log(data);
        setFormData((prev) => ({
          ...prev,
          zonecode: data.zonecode,
          autoRoadAddress: data.roadAddress,
        }));
      },
    }).open();
  };
  useEffect(() => {
    console.log(formData);
  }, [formData]);
  return (
    <>
      <TopNavigationBar3 title="회원가입" onBack={onPrevious} />
      <div className="flex flex-col items-center px-10">
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
            {/**전화번호 입력 형식 맞추기 010-0000-0000 */}
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
              id="autoRoadAddress"
              type="text"
              name="zonecode"
              value={autoRoadAddressValue}
              onChange={handleautoRoadAddressChange}
              onBlur={handleautoRoadAddressBlur}
              error={autoRoadAddressHasError && "필수 입력 사항입니다."}
            />
            <div className="pt-7">
              <Button2 onClick={openAddressSearch}>주소</Button2>
            </div>
          </div>
          <div className="mb-4">
            <Input
              label="상세 주소"
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
        <Button1 type="button" disabled={!isFormValid} onClick={onSignUpSubmit}>
          가입 완료
        </Button1>
      </div>
    </>
  );
};

export default Signup2;
// {
// 	"email": "test@test.com",
// 	"nickname": "쟈몽",
// 	"name": "정윤선",
// 	"password": "1234",
// 	"phone": "01041707002",
// 	"zonecode": "07979",
// 	"autoRoadAddress": "서울 양천구 목동서로2길 22",
// 	"addressDetail": "103동 1504호"
// }
