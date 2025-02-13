import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReviewModal from "../Modals/ReviewModal";
import { useRecoilState } from "recoil";
import { vendorState } from "../../atoms/vendorState";

export default function VendorReview() {
  const [reviewData] = useRecoilState(vendorState);
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태

  // 리뷰 쓰기 버튼 핸들러
  function handleReviewWrite() {
    setIsModalOpen(true); // 모달 열기
  }

  return (
    <div className="bg-gray-50 p-4">
      {/* 제목과 리뷰 쓰기 버튼 */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold">리뷰</h3>
        <button
          className="text-blue-500 text-sm flex items-center"
          onClick={handleReviewWrite}
        >
          ✏️ 리뷰 쓰기
        </button>
      </div>

      {/* 리뷰 리스트 */}
      {reviewData.map((review) => (
        <div key={review.reviewId} className="bg-white shadow-md p-4 mb-4">
          {/* 프로필 섹션 */}
          <div className="flex items-center mb-4">
            <img
              src={review.profileImage}
              alt="프로필 이미지"
              className="w-10 h-10 rounded-full mr-3"
            />
            <p className="text-sm font-bold">{review.customerId}</p>
          </div>

          {/* 이미지 섹션 */}
          <div className="flex gap-2 overflow-x-auto mb-4">
            {review.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`리뷰 이미지 ${index + 1}`}
                className="w-24 h-24 object-cover rounded-lg"
              />
            ))}
          </div>

          {/* 리뷰 텍스트 */}
          <p className="text-sm text-gray-700">{review.content}</p>
        </div>
      ))}

      {/* 리뷰 모달 */}
      {isModalOpen && <ReviewModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
}
