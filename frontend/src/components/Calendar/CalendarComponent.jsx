import React, { useState, useRef, useEffect } from "react";
import Calendar from "react-calendar";
import dayjs from "dayjs"; // 날짜 처리 라이브러리
import "../../Calendar.css"; // 커스터마이징 CSS

export default function CalendarComponent({
  selectedDate,
  setSelectedDate,
  handleDateClick,
}) {
  // ✅ 컴포넌트가 마운트될 때 `searchState.date` 값을 불러와 설정
  useEffect(() => {
    if (!selectedDate.date) {
      setSelectedDate((prevState) => ({
        ...prevState,
        date: dayjs().format("YYYY-MM-DD"), // 기본값을 오늘 날짜로 설정
      }));
    }
  }, [setSelectedDate, selectedDate.date]);

  // ✅ 선택된 날짜가 변경될 때 로그 확인 (디버깅용)
  useEffect(() => {
    console.log("Updated selectedDate:", selectedDate);
  }, [selectedDate]);

  return (
    <>
      <div className="bg-white rounded-lg shadow-md p-4 mb-4">
        <Calendar
          locale="en-US" // 일요일 시작
          onChange={handleDateClick}
          value={selectedDate.date || new Date()} // 선택된 날짜를 캘린더에 반영
          className="custom-calendar"
          formatShortWeekday={(locale, date) =>
            ["일", "월", "화", "수", "목", "금", "토"][dayjs(date).day()]
          } // 요일 표시
          formatDay={(locale, date) => dayjs(date).date()} // "일" 제거
          formatMonthYear={(locale, date) => dayjs(date).format("YYYY. MM")} // 상단 제목: "2025. 02" 형식으로 표시
        />
      </div>
    </>
  );
}
