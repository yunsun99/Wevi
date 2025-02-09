import React, { useState } from "react";
import Calendar from "react-calendar";
import TopNavigationBar2 from "../components/Navigators/TopNavigationBar2";
import VendorImage from "../components/Vendors/VendorImage";
// import "react-calendar/dist/Calendar.css"; // 기본 CSS
import "../Calendar.css"; // 커스터마이징 CSS

export default function ConsultationReservation() {
  const [selectedDate, setSelectedDate] = useState(new Date()); // 초기값을 현재 날짜로 설정
  const [selectedTime, setSelectedTime] = useState(null);

  const sundayToSaturday = ["일", "월", "화", "수", "목", "금", "토"];

  // 예제 데이터: 날짜별로 가능한 시간대
  const scheduleData = [
    {
      date: "2025-02-08",
      times: ["09:00", "09:30", "10:00", "10:30", "11:00", "13:00", "14:00"],
    },
    { date: "2025-02-09", times: ["09:30", "10:00", "14:30", "15:30"] },
    { date: "2025-02-10", times: ["09:00", "10:30", "13:30", "15:00"] },
  ];

  const handleDateClick = (date) => {
    setSelectedDate(date); // 현재 선택된 날짜를 업데이트
    setSelectedTime(null); // 시간 초기화
  };

  const handleTimeClick = (time) => {
    setSelectedTime(time);
  };

  // 선택된 날짜에 해당하는 시간대 필터링
  const availableTimes =
    scheduleData.find(
      (schedule) =>
        schedule.date === new Date(selectedDate.getTime() + 9 * 60 * 60 * 1000)
          .toISOString()
          .split("T")[0]
    )?.times || [];

  // 오전과 오후로 시간대 구분
  const morningTimes = availableTimes.filter((time) =>
    parseInt(time.split(":")[0], 10) < 12
  );
  const afternoonTimes = availableTimes.filter((time) =>
    parseInt(time.split(":")[0], 10) >= 12
  );

  // 한국 표준시(KST)로 날짜 형식 변환
  const formatDateToKST = (date) =>
    new Date(date.getTime() + 9 * 60 * 60 * 1000).toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });

  return (
    <>
      <TopNavigationBar2 title={"예약하기"} />
      <VendorImage />

      <div className="bg-white rounded-lg shadow-md mt-4 p-4">
        <h3 className="text-xl font-bold">상담가능 날짜</h3>

        {/* 캘린더 */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-4">
          <Calendar
            // locale="en-US"
            onChange={handleDateClick}
            value={selectedDate} // 선택된 날짜를 캘린더에 반영
            className="custom-calendar"
            formatDay={(locale, date) =>
                new Date(date).getDate() // "일" 글자를 제거하여 숫자만 표시
              }
          />
        </div>

        {/* 시간 선택 */}
        {selectedDate && (
          <div className="p-4 bg-white rounded-lg shadow-md">
            {/* <h3 className="text-lg font-bold mb-2">
              {formatDateToKST(selectedDate)} 상담 가능 시간대
            </h3> */}
            {/* 오전 시간 */}
            {morningTimes.length > 0 && (
              <>
                <h4 className="text-md font-semibold mt-4">오전</h4>
                <div className="grid grid-cols-4 gap-2">
                  {morningTimes.map((time) => (
                    <button
                      key={time}
                      onClick={() => handleTimeClick(time)}
                      className={`p-2 border rounded ${
                        selectedTime === time
                          ? "bg-green-500 text-white"
                          : "bg-gray-100"
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </>
            )}

            {/* 오후 시간 */}
            {afternoonTimes.length > 0 && (
              <>
                <h4 className="text-md font-semibold mt-4">오후</h4>
                <div className="grid grid-cols-4 gap-2">
                  {afternoonTimes.map((time) => (
                    <button
                      key={time}
                      onClick={() => handleTimeClick(time)}
                      className={`p-2 border rounded ${
                        selectedTime === time
                          ? "bg-green-500 text-white"
                          : "bg-gray-100"
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </>
            )}

            {/* 시간대가 없을 때 */}
            {morningTimes.length === 0 && afternoonTimes.length === 0 && (
              <p className="text-sm text-gray-500 col-span-4">
                선택한 날짜에는 상담 가능한 시간이 없습니다.
              </p>
            )}
          </div>
        )}

        {/* 다음 버튼 */}
        <button
          className={`mt-4 w-full p-3 rounded-lg ${
            selectedDate && selectedTime
              ? "bg-green-500 text-white cursor-pointer"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          onClick={() => {
            if (selectedDate && selectedTime) {
              alert(
                `선택된 날짜: ${formatDateToKST(selectedDate)}, 시간: ${selectedTime}`
              );
            }
          }}
          disabled={!selectedDate || !selectedTime} // 하나라도 false면 비활성화
        >
          다음
        </button>
      </div>
    </>
  );
}
