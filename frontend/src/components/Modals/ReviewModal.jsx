import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { addVendorReview } from "../../api/vendor";

export default function ReviewModal({ onClose, vendorId }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);
  const [content, setContent] = useState("");

  const handleSubmit = async () => {
    if (rating === 0 || !content.trim()) {
      alert("리뷰와 별점을 입력해주세요.");
      return;
    }

    const reviewData = { content, rating };
    try {
      const result = await addVendorReview(vendorId, reviewData);
      // result가 객체라면 성공으로 간주합니다. (addVendorReview에서 201 상태일 경우 response.data를 반환합니다.)
      if (result && typeof result === "object") {
        alert("리뷰가 성공적으로 작성되었습니다!");
        onClose();
      } else {
        alert("리뷰 작성에 실패했습니다.");
      }
    } catch (error) {
      // console.error("Error submitting review:", error);
      alert("리뷰 작성 중 오류가 발생했습니다.");
    }
  };

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
          <label htmlFor="review" className="block text-lg font-semibold mb-2">
            리뷰 작성
          </label>

          {/* 별점 선택 */}
          <div className="flex mb-4">
            {[...Array(5)].map((_, index) => {
              const currentRating = index + 1;
              return (
                <FaStar
                  key={index}
                  size={30}
                  className="cursor-pointer"
                  color={
                    currentRating <= (hover || rating) ? "#ffc107" : "#e4e5e9"
                  }
                  onClick={() => setRating(currentRating)}
                  onMouseEnter={() => setHover(currentRating)}
                  onMouseLeave={() => setHover(null)}
                />
              );
            })}
          </div>

          <textarea
            id="review"
            placeholder="소감을 말씀해주세요"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-4 border rounded-lg h-32 focus:outline-none focus:ring focus:ring-green-300"
          ></textarea>

          <button
            onClick={handleSubmit}
            className={`mt-4 w-full ${
              rating === 0 ? "bg-gray-100" : "bg-green-500"
            } text-white py-2 rounded-lg`}
            disabled={rating === 0} // 별점이 0점이면 버튼 비활성화
          >
            작성 완료
          </button>
        </div>
      </div>
    </div>
  );
}
