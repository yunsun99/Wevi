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

export default function ConsultationReservation() {
  return (
    <>
      <TopNavigationBar2 title={"예약하기"} />
      <VendorImage />
      <div className="bg-white rounded-lg shadow-md mt-4 p-4">
        <h3 className="text-xl font-bold">상담가능 날짜</h3>
        <CalendarComponent />
        <CalendarTimeSelect />
      </div>
    </>
  );
}
