import React, { useState, useRef, useEffect } from "react";
import Calendar from "react-calendar";
import dayjs from "dayjs"; // 날짜 처리 라이브러리
// import "../../Calendar.css"; // 커스터마이징 CSS

import { useRecoilState } from "recoil";
import { searchDateState } from "../../atoms/searchState";
import ReservationModal from "../Modals/ReservationModal";

export default function CalendarTimeSelect() {
  // 날짜 상태 관리
  const [selectedDate, setSelectedDate] = useRecoilState(searchDateState); // 초기값을 현재 날짜로 설정

  // 예제 데이터: 날짜별로 가능한 시간대
  const scheduleData = [
    {
      date: "2025-02-08",
      times: ["09:00", "09:30", "10:00", "10:30", "11:00", "13:00", "14:00"],
    },
    { date: "2025-02-09", times: ["09:30", "10:00", "14:30", "15:30"] },
    { date: "2025-02-10", times: ["09:00", "10:30", "13:30", "15:00"] },
  ];

  const handleTimeClick = (time) => {
    setSelectedDate((prevState) => ({
      ...prevState,
      time: time,
    })); // 현재 선택된 시간을 업데이트
  };

  // 선택된 날짜에 해당하는 시간대 필터링
  const availableTimes =
    scheduleData.find(
      (schedule) =>
        schedule.date === dayjs(selectedDate.date).format("YYYY-MM-DD")
    )?.times || [];

  // 오전과 오후로 시간대 구분
  const morningTimes = availableTimes.filter(
    (time) => parseInt(time.split(":")[0], 10) < 12
  );
  const afternoonTimes = availableTimes.filter(
    (time) => parseInt(time.split(":")[0], 10) >= 12
  );

  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태

  function handleReservation() {
    setIsModalOpen(true); // 모달 열기
  }

  return (
    <>
      {/* 시간 선택 */}
      {selectedDate.date && (
        <div className="p-4 bg-white rounded-lg shadow-md">
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
                      selectedDate.time === time
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
                      selectedDate.time === time
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
          selectedDate.date && selectedDate.time
            ? "bg-green-500 text-white cursor-pointer"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
        onClick={handleReservation}
        disabled={!selectedDate.date || !selectedDate.time} // 하나라도 false면 비활성화
      >
        다음
      </button>
      {isModalOpen && (
        <ReservationModal onClose={() => setIsModalOpen(false)} />
      )}
    </>
  );
}
