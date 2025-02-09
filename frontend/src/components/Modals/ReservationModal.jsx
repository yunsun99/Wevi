import React from "react";

export default function ReservationModal({ onClose}) {
  function handleSubmit(){
    console.log("axios로 보낸 다음에 등록처리가 완료되면 등록완료 모달? 혹은 꺼지고 등록완료 화면 실패하면 실패화면")
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.50)]">
      <div className="bg-white rounded-lg shadow-lg w-4/5 max-w-lg p-6 relative">
        {/* 모달 닫기 버튼 */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
        >
          ✕
        </button>

        {/* 모달 내용 */}
        <div>
          {/* 웨딩홀 이미지 */}
          <img
            src="/path/to/weddinghall.jpg" // 실제 이미지 경로를 넣어주세요
            alt="웨딩홀 이미지"
            className="w-full rounded-lg mb-4"
          />

          {/* 웨딩홀 이름 */}
          <h3 className="text-xl font-bold mb-4">박성근웨딩홀</h3>

          {/* 상담 일시 */}
          <div className="mb-4">
            <h4 className="text-md font-semibold">상담 일시</h4>
            <p className="text-lg font-bold text-gray-700">
              2025/1/31(금) 오후 1:00
            </p>
          </div>

          {/* 요청사항 입력란 */}
          <div className="mb-4">
            <label
              htmlFor="request"
              className="block text-md font-semibold mb-2"
            >
              요청사항
            </label>
            <textarea
              id="request"
              placeholder="요청사항을 입력하세요"
              className="w-full p-4 border rounded-lg h-24 focus:outline-none focus:ring focus:ring-green-300"
            ></textarea>
          </div>

          {/* 안내 문구 */}
          <p className="text-sm text-gray-500 mb-4">
            날짜와 시간을 선택하면 상담이 자동 확정됩니다.
          </p>

          {/* 동의하고 예약 버튼 */}
          <button
            onClick={handleSubmit}
            className="w-full bg-green-500 text-white py-3 rounded-lg font-bold hover:bg-green-600"
          >
            동의하고 예약금 결제하기
          </button>
        </div>
      </div>
    </div>
  );
}
