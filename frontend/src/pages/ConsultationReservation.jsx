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

  // ✅ 현재 연도/월이 변경될 때 API 호출
  // useEffect(() => {
  //   const fetchAvailableDates = async () => {
  //     try {
  //       console.log(
  //         `📅 Fetching available dates: vendorId=${vendorId}, year=${currentYear}, month=${currentMonth}`
  //       );

  //       const availableData = await getAvailableDates({
  //         vendorId,
  //         year: currentYear,
  //         month: currentMonth,
  //       });

  //       setAvailableDate(availableData);
  //     } catch (err) {
  //       console.error("API 요청 중 에러 발생:", err);
  //     }
  //   };

  //   fetchAvailableDates();
  // }, [currentYear, currentMonth]); // ✅ 연도와 월이 변경될 때 API 호출

  return (
    <>
      <TopNavigationBar2 title={"예약하기"} />
      <div className="h-[94vh] bg-white rounded-lg shadow-md p-4">
        <h3 className="text-xl font-bold">상담가능 날짜</h3>
        <CalendarComponent
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          handleDateClick={handleDateClick}
          // availableDate={availableDate}
          vendorId={vendorId}
          setCurrentYear={setCurrentYear} // ✅ 현재 연도 상태 전달
          setCurrentMonth={setCurrentMonth} // ✅ 현재 월 상태 전달
        />
        <CalendarTimeSelect vendorId={vendorId} />
      </div>
    </>
  );
}
