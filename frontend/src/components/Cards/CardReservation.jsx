import React, { useEffect, useState } from "react";
import image from "../../assets/example_weddinghall.png";
import { getVendorInfo } from "../../api/vendor";
import { useNavigate } from "react-router-dom";
import { cancelReservation } from "../../api/schedule";

export default function CardReservation({ data, category }) {
  const [vendorData, setVendorData] = useState();
  const navigate = useNavigate();

  console.log(data);
  const now = new Date();
  const reservationDateTime = new Date(`${data.startDate}T${data.startTime}`);
  const isPastReservation =
    now.toDateString() > reservationDateTime.toDateString();

  function goSearchDetail(category, id) {
    navigate(`/searchDetail/${category}?id=${id}`);
  }

  async function handleCancel() {
    if (!data.scheduleId) {
      alert("예약 ID가 없습니다.");
      return;
    }

    const isSuccess = await cancelReservation(data.scheduleId);
    // let isSuccess = true;
    if (isSuccess === true) {
      alert("예약이 취소되었습니다.");
      navigate(-1);
    } else {
      alert("예약 취소에 실패했습니다. 다시 시도해주세요.");
    }
  }
  useEffect(() => {
    if (!data.vendorId) {
      console.log("실패");
      return;
    }
    const axiosVendorInfo = async () => {
      try {
        const vendorInfo = await getVendorInfo(data.vendorId);
        setVendorData(vendorInfo);
      } catch (err) {
        console.log(err); // ✅ 서버에서 받은 오류 메시지 표시
      }
    };
    axiosVendorInfo();
  }, [data.vendorId]);
  useEffect(() => {
    console.log(vendorData);
  }, [vendorData]);

  return (
    <div className="h-[86vh]">
      <div className="bg-white rounded-lg p-4">
        {/* 이미지 및 타이틀 */}
        <div
          className="bg-white rounded-lg shadow-md overflow-hidden mb-4"
          onClick={() => goSearchDetail(data.categoryName, data.vendorId)}
        >
          {/* 업체 이미지 */}
          <div className="relative">
            {vendorData && vendorData.images.length > 0 ? (
              <img
                src={vendorData.images[0].imageUrl}
                alt={vendorData.vendorName}
                className="w-full h-40 object-cover"
              />
            ) : (
              <div className="w-full h-40 bg-gray-200 flex items-center justify-center text-gray-500">
                사진이 없습니다
              </div>
            )}
          </div>

          {/* 업체 정보 */}
          <div className="p-4">
            <h2 className="text-lg font-bold">{data.vendorName}</h2>
            <p className="text-sm text-gray-500 mt-1">
              {data.vendorAutoRoadAddress}
            </p>
            <p className="text-sm text-gray-500">{`전화번호: ${data.vendorPhone}`}</p>
          </div>
        </div>

        {/* 예약 상세 정보 */}
        <div className="mb-4 text-gray-600 grid grid-cols-4 gap-y-2">
          <p className="text-sm font-semibold">예약번호:</p>
          <p className="text-base col-span-3">
            {data.reservationId || "정보 없음"}
          </p>

          <p className="text-sm font-semibold">일정:</p>
          <p className="text-base col-span-3">{data.startDate}</p>

          <p className="text-sm font-semibold">담당자:</p>
          <p className="text-base col-span-3">
            {data.managerName || "정보 없음"}
          </p>

          <p className="text-sm font-semibold">상품:</p>
          <p className="text-base col-span-3">{data.title}</p>
        </div>

        {/* 구분선 */}
        <hr className="border-gray-300 my-4" />

        {/* 고객 정보 */}
        <div className="mb-4 text-gray-600 grid grid-cols-4 gap-y-2">
          <p className="text-sm font-semibold">예약자:</p>
          <p className="text-base col-span-3">{data.customerName}</p>

          <p className="text-sm font-semibold">연락처:</p>
          <p className="text-base col-span-3">{data.customerPhone}</p>

          <p className="text-sm font-semibold">요청사항:</p>
          <p className="text-base leading-relaxed col-span-3">
            {data.request || "없음"}
          </p>
        </div>

        {/* 버튼 */}
        {category === "contract" ? (
          <div className="mb-4">
            {/* 구분선 */}
            <hr className="border-gray-300 my-4" />
            <div className="mb-4 text-gray-600 grid grid-cols-2 gap-y-2">
              <p className="text-sm font-semibold">결제금액:</p>
              <p className="text-base text-lg font-bold">
                {" "}
                {data.price.toLocaleString()}원
              </p>
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            <button
              className={`w-full h-[6vh] mt-4 text-md font-bold px-6 py-2 rounded-lg ${
                isPastReservation
                  ? "bg-gray-400 text-white cursor-not-allowed" // 🔹 예약 시간이 지났으면 회색 (비활성화)
                  : "bg-red-500 text-white hover:bg-red-600" // 🔹 예약 가능하면 빨간색 (활성화)
              }`}
              disabled={isPastReservation} // 🔹 버튼 비활성화
              onClick={handleCancel}
            >
              예약 취소
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
