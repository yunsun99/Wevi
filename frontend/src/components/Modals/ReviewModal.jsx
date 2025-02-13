import React from "react";

export default function ReviewModal({ onClose }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-[rgba(0,0,0,0.50)]">
      <div className="bg-white rounded-lg w-4/5 md:w-1/2 p-6 relative">
        {/* 모달 닫기 버튼 */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
        >
          ✕
        </button>

        {/* 모달 내용 */}
        <div>
          {/* <img
            src="/path/to/image.jpg" // 이미지 경로를 넣어주세요
            alt="웨딩홀"
            className="rounded-lg mb-4 w-full"
          /> */}
          {/* <h3 className="text-xl font-bold mb-4">박성근웨딩홀</h3> */}

          <label htmlFor="review" className="block text-lg font-semibold mb-2">
            리뷰작성
          </label>
          <textarea
            id="review"
            placeholder="소감을 말씀해주세요"
            className="w-full p-4 border rounded-lg h-32 focus:outline-none focus:ring focus:ring-green-300"
          ></textarea>

          <button
            onClick={() => {
              alert("리뷰가 작성되었습니다!"); // 리뷰 작성 로직 추가
              onClose(); // 모달 닫기
            }}
            className="mt-4 w-full bg-green-500 text-white py-2 rounded-lg"
          >
            작성 완료
          </button>
        </div>
      </div>
    </div>
  );
}
