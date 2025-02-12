import { useState, useRef } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import TopNavigationBar from "../components/Navigators/TopNavigationBar.jsx";
import scheduleData from "../scheduleData.js";
import CardCalendar from "../components/Cards/CardCalendar.jsx";
import BottomNavigationBar from "../components/Navigators/BottomNavigationBar.jsx";
import CalendarComponent from "../components/Calendar/CalendarComponent.jsx";
import { scheduleState } from "../atoms/schedulState.jsx";
import { useRecoilState } from "recoil";
import dayjs from "dayjs";
import ScheduleList from "../components/Cards/CardSchedule.jsx";
import ListView from "../components/ListView/ListView.jsx";
import CardSchedule from "../components/Cards/CardSchedule.jsx";

export default function Schedule() {
  const [selectedDate, setSelectedDate] = useRecoilState(scheduleState); // 초기값을 현재 날짜로 설정
  const handleDateClick = (date) => {
    setSelectedDate((prevState) => ({
      ...prevState,
      date: dayjs(date).format("YYYY-MM-DD"),
    }));
  }; // 현재 선택된 날짜를 업데이트
  const schedules = [
    {
      id: 1,
      startDate: "2025-02-10",
      startTime: "19:00",
      endDate: "2025-02-10",
      endTime: "21:00",
      title: "웨딩홀 점검",
      createdAt: null,
      updatedAt: null,
      dtype: "consultation",
      category: "weddinghall",
      contractId: null,
      vendorName: "라벤더 웨딩홀",
    },
    {
      id: 4,
      startDate: "2025-02-10",
      startTime: "19:00",
      endDate: "2025-02-10",
      endTime: "21:00",
      title: "드레스 가봉",
      createdAt: null,
      updatedAt: null,
      dtype: "middle_process",
      category: "dress",
      contractId: 2,
      vendorName: "라벤더 웨딩홀",
    },
    {
      id: 5,
      startDate: "2025-02-10",
      startTime: "19:00",
      endDate: "2025-02-10",
      endTime: "21:00",
      title: "사진셀렉 및 후보정",
      createdAt: null,
      updatedAt: null,
      dtype: "consultation",
      category: "studio",
      contractId: null,
      vendorName: "라벤더 웨딩홀",
    },
    {
      id: 6,
      startDate: "2025-02-10",
      startTime: "19:00",
      endDate: "2025-02-10",
      endTime: "21:00",
      title: "헤어메이크업 계약",
      createdAt: null,
      updatedAt: null,
      dtype: "contract",
      category: "hairmakeup",
      contractId: null,
      vendorName: "라벤더 웨딩홀",
    },
    {
      id: 2,
      startDate: "2025-02-15",
      startTime: "23:00",
      endDate: "2025-02-16",
      endTime: "01:00",
      title: "웨딩 계약",
      createdAt: null,
      updatedAt: null,
      dtype: "contract",
      category: "weddinghall",
      contractId: null,
      vendorName: "라벤더 웨딩홀",
    },
    {
      id: 3,
      startDate: "2025-02-20",
      startTime: "22:00",
      endDate: "2025-02-21",
      endTime: "00:00",
      title: "기타 일정",
      createdAt: null,
      updatedAt: null,
      dtype: "other_schedule",
      category: "weddinghall",
      contractId: null,
      vendorName: "라벤더 웨딩홀",
    },
    {
      id: 4,
      startDate: "2025-02-20",
      startTime: "22:00",
      endDate: "2025-02-21",
      endTime: "00:00",
      title: "중간과정",
      createdAt: null,
      updatedAt: null,
      dtype: "middle_process",
      category: "weddinghall",
      contractId: 1,
      vendorName: "라벤더 웨딩홀",
    },
  ];

  const date = selectedDate.date;
  const formattedDate = dayjs(date).format("M월 D일"); // "2월 25일"로 변환
  return (
    <>
      <TopNavigationBar />
      <div className="w-screen min-h-screen">
        <CalendarComponent
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          handleDateClick={handleDateClick}
        />
        <h1 className="text-lg font-bold mb-4">{formattedDate}</h1>

        {/* schedules에서 selectedDate.date와 startDate가 같은 항목만 필터링 */}
        {/* <div className="h-[calc(100vh-32rem)]"> */}
        <ListView
          data={schedules.filter(
            (schedule) => schedule.startDate === selectedDate.date
          )}
          CardComponent={CardSchedule}
        />
        {/* </div> */}
      </div>
      <BottomNavigationBar />
    </>
  );
}
