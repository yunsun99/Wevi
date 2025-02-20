import React, { useState, useEffect } from "react";
import dayjs from "dayjs"; // 날짜 처리 라이브러리
import { useRecoilState } from "recoil";
import { searchDateState } from "../../atoms/searchState";
import ReservationModal from "../Modals/ReservationModal";
import { getAvailableTimes } from "../../api/schedule"; // ✅ API 요청 함수 추가

export default function CalendarTimeSelect({ vendorId }) {
  const [selectedDate, setSelectedDate] = useRecoilState(searchDateState);
  const [availableTimes, setAvailableTimes] = useState([]); // ✅ API로 가져온 시간 데이터
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ✅ 선택한 날짜가 변경될 때 API 요청하여 시간 데이터 가져오기
  useEffect(() => {
    const fetchAvailableTimes = async () => {
      if (!selectedDate.date) return; // 선택된 날짜가 없으면 요청 안함

      try {
        const year = dayjs(selectedDate.date).year();
        const month = dayjs(selectedDate.date).month() + 1;
        const day = dayjs(selectedDate.date).date();

        console.log(
          `⏰ Fetching available times: vendorId=${vendorId}, date=${selectedDate.date}`
        );

        const response = await getAvailableTimes({
          vendorId,
          year,
          month,
          day,
        });
        console.log(response.availableTime);
        if (response.availableTime) {
          setAvailableTimes(response.availableTime);
        } else {
          setAvailableTimes([]); // 데이터가 없을 경우 빈 배열 처리
        }
      } catch (err) {
        console.error("API 요청 중 에러 발생:", err);
        setAvailableTimes([]); // 에러 발생 시 빈 배열 유지
      }
    };

    fetchAvailableTimes();
  }, [selectedDate.date, vendorId]);

  // ✅ 시간 선택 핸들러
  const handleTimeClick = (time, available) => {
    if (!available) return; // ❌ 비활성화된 시간은 선택 불가능
    setSelectedDate((prevState) => ({
      ...prevState,
      time: time,
    }));
  };

  // ✅ 오전/오후 시간 분리
  const morningTimes = availableTimes.filter(
    (t) => parseInt(t.time.split(":")[0], 10) < 12
  );
  const afternoonTimes = availableTimes.filter(
    (t) => parseInt(t.time.split(":")[0], 10) >= 12
  );

  function handleReservation() {
    setIsModalOpen(true);
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
                {morningTimes.map(({ time, available }) => (
                  <button
                    key={time}
                    onClick={() => handleTimeClick(time, available)}
                    className={`p-2 border rounded transition ${
                      available
                        ? selectedDate.time === time
                          ? "bg-[#609966] text-white"
                          : "bg-gray-100 hover:bg-gray-200 border-gray-400"
                        : "bg-gray-300 border-gray-300 text-gray-500 cursor-not-allowed opacity-50"
                    }`}
                    disabled={!available} // ❌ 선택 불가능한 시간 버튼 비활성화
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
                {afternoonTimes.map(({ time, available }) => (
                  <button
                    key={time}
                    onClick={() => handleTimeClick(time, available)}
                    className={`p-2 border rounded transition ${
                      available
                        ? selectedDate.time === time
                          ? "bg-[#609966] text-white"
                          : "bg-gray-100 border-gray-400 hover:bg-gray-200"
                        : "bg-gray-300 border-gray-300 text-gray-500 cursor-not-allowed opacity-50"
                    }`}
                    disabled={!available}
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
            ? "bg-[#609966] text-white cursor-pointer"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
        onClick={handleReservation}
        disabled={!selectedDate.date || !selectedDate.time}
      >
        다음
      </button>

      {/* 예약 모달 */}
      {isModalOpen && (
        <ReservationModal
          onClose={() => setIsModalOpen(false)}
          selectedDate={selectedDate} // ✅ 선택된 날짜 및 시간 전달
          vendorId={vendorId} // ✅ vendorId 전달
        />
      )}
    </>
  );
}
