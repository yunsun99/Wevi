import React from "react";

export default function VendorReview() {
  const reviews = [
    {
      id: 1,
      username: "갓실버제",
      profileImage: "/path/to/profile.png",
      reviewText:
        "오늘 데이트하러 와서 미리 예약하고 왔는데, 2인 플래터 먹구 비빔면까지 같이 먹었어요! 근데 직원분도 너무 친절하게 들어올 때부터 설명 잘 해주시고, 다음에는 다른 플래터 먹으러...",
      images: [
        "/path/to/image1.jpg",
        "/path/to/image2.jpg",
      ],
    },
    {
      id: 2,
      username: "갓실버제",
      profileImage: "/path/to/profile.png",
      reviewText:
        "오늘 데이트하러 와서 미리 예약하고 왔는데, 2인 플래터 먹구 비빔면까지 같이 먹었어요! 근데 직원분도 너무 친절하게 들어올 때부터 설명 잘 해주시고, 다음에는 다른 플래터 먹으러...",
      images: [
        "/path/to/image1.jpg",
        "/path/to/image2.jpg",
      ],
    },
  ];

  return (
    <div className="bg-gray-50 p-4">
      {/* 제목과 리뷰 쓰기 버튼 */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold">리뷰</h3>
        <button className="text-blue-500 text-sm flex items-center">
          ✏️ 리뷰 쓰기
        </button>
      </div>

      {/* 리뷰 리스트 */}
      {reviews.map((review) => (
        <div key={review.id} className="bg-white shadow-md p-4 mb-4">
          {/* 프로필 섹션 */}
          <div className="flex items-center mb-4">
            <img
              src={review.profileImage}
              alt="프로필 이미지"
              className="w-10 h-10 rounded-full mr-3"
            />
            <p className="text-sm font-bold">{review.username}</p>
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
          <p className="text-sm text-gray-700">{review.reviewText}</p>
        </div>
      ))}
    </div>
  );
}
