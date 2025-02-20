import React, { useState, useEffect } from "react";
import TopNavigationBar2 from "../components/Navigators/TopNavigationBar2";
import CalendarComponent from "../components/Calendar/CalendarComponent";
import CalendarTimeSelect from "../components/Calendar/CalendarTimeSelect";
import { useRecoilState } from "recoil";
import { searchDateState } from "../atoms/searchState";
import { useLocation } from "react-router-dom";
import { getAvailableDates } from "../api/schedule";
import dayjs from "dayjs";
import "../Calendar.css"; // 커스터마이징 CSS

export default function ConsultationReservation() {
  const [selectedDate, setSelectedDate] = useRecoilState(searchDateState);
  // const [availableDate, setAvailableDate] = useState([]); // ✅ 초기값을 빈 배열로 설정
  const [currentYear, setCurrentYear] = useState(dayjs().year()); // ✅ 현재 연도 상태 추가
  const [currentMonth, setCurrentMonth] = useState(dayjs().month() + 1); // ✅ 현재 월 상태 추가 (month()는 0부터 시작)

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const vendorId = searchParams.get("id");

  const handleDateClick = (date) => {
    setSelectedDate((prevState) => ({
      ...prevState,
      date: dayjs(date).format("YYYY-MM-DD"),
      time: null,
    }));
  };

  return (
    <>
      <TopNavigationBar2 title={"예약하기"} />
      <div className="h-[94vh] bg-white rounded-lg shadow-md p-4">
        <h3 className="text-xl font-bold">상담가능 날짜</h3>
        <CalendarComponent
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          handleDateClick={handleDateClick}
          vendorId={vendorId}
          setCurrentYear={setCurrentYear} // ✅ 현재 연도 상태 전달
          setCurrentMonth={setCurrentMonth} // ✅ 현재 월 상태 전달
        />
        <CalendarTimeSelect vendorId={vendorId} />
      </div>
    </>
  );
}
