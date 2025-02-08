import Button1 from "../components/Buttons/Button1";

export default function SignUpDetail() {
  function handleLogin() {
    console.log("a");
  }
  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-gray-200">
      <div className="w-screen sm:max-w-sm md:max-w-md lg:max-w-lg bg-white shadow-md rounded-lg p-6 space-y-6">
        <h1 className="text-xl font-bold text-gray-800 text-center">
          회원가입
        </h1>

        {/* 입력 필드 */}
        <div className="space-y-4">
          <input
            type="text"
            placeholder="닉네임"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
          <input
            type="text"
            placeholder="이름"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
          <input
            type="tel"
            placeholder="휴대폰 번호"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
          <input
            type="text"
            placeholder="주소"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
        </div>

        {/* 회원가입 완료 버튼 */}
        <Button1 onClick={handleLogin}>웨돋 로그인</Button1>
      </div>
    </div>
  );
}
