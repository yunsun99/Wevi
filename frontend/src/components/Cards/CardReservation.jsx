import React from "react";
import image from "../../assets/example_weddinghall.png";

export default function CardReservation({ data, category }) {
  console.log(data);
  const now = new Date();
  const reservationDateTime = new Date(`${data.startDate}T${data.startTime}`);
  const isPastReservation = now > reservationDateTime;
  function handleCancle() {
    // 예약 취소
    console.log("캔슬완");
  }
  return (
    <div className="h-[86vh]">
      <div className="bg-white rounded-lg shadow-md p-4">
        {/* 이미지 및 타이틀 */}
        <div className="items-center mb-4">
          <img
            src={image}
            alt={data.title}
            className="w-1/3 h-24 object-cover rounded-lg"
          />
          <div className="ml-4 flex-1">
            <h2 className="text-lg font-bold">{data.vendorName}</h2>
            <p className="text-sm text-gray-500">
              {data.vendorAutoRoadAddress}
            </p>
            <p className="text-sm text-gray-500">{`전화번호: ${data.vendorPhone}`}</p>
          </div>
        </div>

        {/* 예약 상세 정보 */}
        <div className="mb-4">
          <p className="text-sm">
            <span className="font-bold">예약번호:</span>
          </p>
          <p className="text-sm">
            <span className="font-bold">일정:</span> {data.startDate}
          </p>
          {/* <p className="text-sm">
          <span className="font-bold">담당자:</span> {data.customerName}
        </p> */}
          <p className="text-sm">
            <span className="font-bold">상품:</span> {data.title}
          </p>
        </div>

        {/* 고객 정보 */}
        <div className="mb-4">
          <p className="text-sm">
            <span className="font-bold">예약자:</span> {data.customerName}
          </p>
          <p className="text-sm">
            <span className="font-bold">연락처:</span> {data.customerPhone}
          </p>
          {category === "contract" ? (
            <p className="text-sm">
              <span className="font-bold">계약내용:</span> {data.detail}
            </p>
          ) : (
            <p className="text-sm">
              <span className="font-bold">요청사항:</span> {data.request}
            </p>
          )}
        </div>

        {/* 버튼 */}
        {category === "contract" ? (
          <div className="mb-4">
            <p className="text-sm">
              <span className="font-bold">결제금액:</span>{" "}
              {data.price.toLocaleString()}원
            </p>
          </div>
        ) : (
          <div className="flex justify-center">
            <button
              className={`px-6 py-2 rounded-lg ${
                isPastReservation
                  ? "bg-gray-400 text-white cursor-not-allowed" // 🔹 예약 시간이 지났으면 회색 (비활성화)
                  : "bg-red-500 text-white hover:bg-red-600" // 🔹 예약 가능하면 빨간색 (활성화)
              }`}
              disabled={isPastReservation} // 🔹 버튼 비활성화
              onClick={handleCancle}
            >
              예약 취소
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
