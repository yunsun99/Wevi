import logo from "@/assets/logo.png";
import Button1 from "../components/Buttons/Button1";

export default function SignupCompletePage() {
  return (
    <div className="m-5 w-[90%] flex flex-col h-screen items-center justify-center">
      {/* 로고 및 브랜드 텍스트 */}
      <div className="flex flex-col items-center justify-end h-2/5">
        <img src={logo} alt="WEVI Logo" className="w-50 mb-4" />
      </div>

      {/* 회원가입 완료 메시지 */}
      <div className="flex flex-col items-center justify-center h-1/5 text-center font-pretendard">
        <p className="text-lg font-medium text-gray-700">
          회원가입이 완료되었습니다!
        </p>
        <p className="text-gray-500 mt-2">로그인해서 서비스를 이용해주세요.</p>
      </div>

      {/* 돌아가기 버튼 */}
      <div className="flex flex-col items-center h-2/5 w-full">
        <Button1 type="button" className="w-10/12">
          돌아가기
        </Button1>
      </div>
    </div>
  );
}
