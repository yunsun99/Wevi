import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import dayjs from "dayjs"; // 날짜 처리 라이브러리
import TopNavigationBar2 from "../components/Navigators/TopNavigationBar2";
import VendorImage from "../components/Vendors/VendorImage";
// import "react-calendar/dist/Calendar.css"; // 기본 CSS
import "../Calendar.css"; // 커스터마이징 CSS
import { useRecoilState } from "recoil";
import CalendarComponent from "../components/Calendar/CalendarComponent";
import CalendarTimeSelect from "../components/Calendar/CalendarTimeSelect";
import { searchDateState } from "../atoms/searchState";
import { useLocation } from "react-router-dom";
//
export default function ConsultationReservation() {
  const [selectedDate, setSelectedDate] = useRecoilState(searchDateState); // 초기값을 현재 날짜로 설정

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const vendorId = searchParams.get("id"); // 쿼리 파라미터에서 id 값 가져오기

  const handleDateClick = (date) => {
    setSelectedDate((prevState) => ({
      ...prevState,
      date: dayjs(date).format("YYYY-MM-DD"),
      time: null,
    }));
  }; // 현재 선택된 날짜를 업데이트
  return (
    <>
      <TopNavigationBar2 title={"예약하기"} />
      {/* <VendorImage /> */}
      <div className="bg-white rounded-lg shadow-md mt-4 p-4">
        <h3 className="text-xl font-bold">상담가능 날짜</h3>
        <CalendarComponent
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          handleDateClick={handleDateClick}
        />
        <CalendarTimeSelect />
      </div>
    </>
  );
}
