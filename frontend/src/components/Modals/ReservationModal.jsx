import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import "dayjs/locale/ko"; // 한국어 요일 적용
import weekday from "dayjs/plugin/weekday";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { getVendorInfo } from "../../api/vendor";
import weddinghall_default from "../../assets/weddinghall_default.png";
import { addConsultation } from "../../api/schedule";
import { useNavigate } from "react-router-dom";

dayjs.extend(weekday);
dayjs.extend(localizedFormat);
dayjs.locale("ko");

export default function ReservationModal({ onClose, selectedDate, vendorId }) {
  const [vendorData, setVendorData] = useState();
  const [request, setRequest] = useState(""); // ✅ 요청사항 상태 추가
  const navigate = useNavigate();
  async function handleSubmit() {
    // ✅ 필수 데이터 확인
    if (!selectedDate.date || !selectedDate.time || !vendorId) {
      alert("❌ 날짜, 시간, 웨딩홀 정보를 확인해주세요.");
      return;
    }
    // ✅ API 요청
    const status = await addConsultation({ selectedDate, request, vendorId });
    // console.log(status);
    // ✅ 응답 결과 처리
    if (status === 200 || status === 201) {
      alert("✅ 예약이 완료되었습니다!");
      onClose(); // 모달 닫기
      navigate("/consultationList");
    } else {
      alert("❌ 예약이 이미 마감되었습니다.");
      onClose();
      window.location.reload(); // ✅ 페이지 새로고침
    }
  }

  useEffect(() => {
    if (!vendorId) {
      return;
    }
    const axiosVendorInfo = async () => {
      try {
        const venderInfo = await getVendorInfo(vendorId);
        setVendorData(venderInfo);
      } catch (err) {
        // console.log(err); // ✅ 서버에서 받은 오류 메시지 표시
      }
    };
    axiosVendorInfo();
  }, [vendorId]);

  useEffect(() => {
    // console.log(vendorData);
  }, [vendorData]);

  // ✅ 날짜 및 시간 포맷 변환
  const formattedDate = dayjs(selectedDate.date).format("YYYY/M/DD(ddd)");
  const hour = parseInt(selectedDate.time.split(":")[0], 10);
  const minute = selectedDate.time.split(":")[1];
  const period = hour < 12 ? "오전" : "오후";
  const formattedTime = `${period} ${hour % 12 || 12}:${minute}`;

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
          <div className="relative w-full h-full pt-4 pb-4">
            {/* 상단 이미지 vendor image */}
            {vendorData && vendorData.images && vendorData.images.length > 0 ? (
              <img
                src={vendorData.images[0].imageUrl}
                alt="웨딩홀 이미지"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="relative w-full h-full">
                {/* 디폴트 이미지 */}
                <img
                  src={weddinghall_default}
                  alt="웨딩홀 기본 이미지"
                  className="w-full h-[30.654vh] object-cover"
                />
                {/* 이미지 위에 텍스트 */}
                <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white px-4 py-2 rounded-md text-sm">
                  이미지가 없습니다.
                </span>
              </div>
            )}
            {/* 이미지 위에 웨딩홀 이름 넣기 */}
            {vendorData?.vendorName && (
              <div className="absolute bottom-4 bg-opacity-50 text-white text-lg font-bold px-2 py-2 rounded-md">
                {vendorData.vendorName}
              </div>
            )}
          </div>
          {/* 상담 일시 */}
          <div className="border-b pb-4 mb-4">
            <h4 className="text-md font-semibold mb-2">상담 일시</h4>
            <p className="text-lg font-bold text-[#A68E60]">
              {formattedDate} {formattedTime}
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
              value={request} // ✅ 입력값 상태 반영
              onChange={(e) => setRequest(e.target.value)} // ✅ 상태 업데이트
              className="w-full p-4 border border-[#A68E60] rounded-lg h-24 placeholder-[#A68E60] focus:outline-none focus:ring focus:ring-[#A68E60]/50"
            ></textarea>
          </div>

          {/* 안내 문구 */}
          <p className="text-sm text-gray-500 mb-4 text-center">
            날짜와 시간을 선택하면 상담이 자동 확정됩니다.
          </p>

          {/* 동의하고 예약 버튼 */}
          <button
            onClick={handleSubmit}
            className="w-full bg-[#609966] text-white py-3 rounded-lg font-bold hover:bg-[#4e7c53]"
          >
            예약하기
          </button>
        </div>
      </div>
    </div>
  );
}
