import { useState, useRef } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import TopNavigationBar from "../components/Navigators/TopNavigationBar.jsx";
import scheduleData from "../scheduleData.js";
import CardCalendar from "../components/Cards/CardCalendar.jsx";
import BottomNavigationBar from "../components/Navigators/BottomNavigationBar.jsx";

export default function Schedule() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [filteredSchedules, setFilteredSchedules] = useState([]); // 선택된 날짜의 일정 저장
  const scheduleRefs = useRef({}); // 날짜별 첫 번째 일정의 ref 저장

  // 날짜 클릭 시 해당 날짜의 일정 필터링
  const handleDateClick = (date) => {
    setSelectedDate(date);

    /** 한국시간으로 변환
     * iso는 세계 시간 기준
     * Sat Feb 08 2025 00:00:00 GMT+0900 (한국 표준시) => 2025-02-08
     */
    const formattedDate = `${date.getFullYear()}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

    // 선택된 날짜에 해당하는 일정 필터링
    const schedulesForDate = scheduleData.filter(
      (schedule) => schedule.date === formattedDate
    );

    // 상태 업데이트
    setFilteredSchedules(schedulesForDate);

    // 해당 날짜의 첫 번째 일정으로 스크롤
    if (scheduleRefs.current[formattedDate]?.length > 0) {
      scheduleRefs.current[formattedDate][0].scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <>
      <TopNavigationBar />
      <div className="min-h-screen bg-gray-100 p-4">
        {/* 📅 캘린더 */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-4">
          <Calendar
            style={{
              width: "100%",
              maxWidth: "1024px",
              margin: "0 auto",
              borderRadius: "8px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}
            className="custom-calendar"
            onChange={handleDateClick}
            value={selectedDate}
            tileClassName={({ date, view }) =>
              view === "month" &&
              scheduleData.some(
                (s) => s.date === date.toISOString().split("T")[0]
              )
                ? "highlight-date"
                : null
            }
          />
        </div>

        {/* 📝 일정 리스트 */}
        <div className="space-y-4">
          {filteredSchedules.length > 0 ? (
            filteredSchedules.map((schedule, index) => (
              <CardCalendar
                key={index}
                schedule={schedule}
                ref={(el) => {
                  if (el) {
                    if (!scheduleRefs.current[schedule.date]) {
                      scheduleRefs.current[schedule.date] = [];
                    }
                    scheduleRefs.current[schedule.date].push(el);
                  }
                }}
              />
            ))
          ) : (
            <p className="text-center text-gray-500">
              선택한 날짜에 일정이 없습니다.
            </p>
          )}
        </div>
      </div>
      <BottomNavigationBar />
    </>
  );
}
