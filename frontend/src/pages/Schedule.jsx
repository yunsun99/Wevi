import { useState, useEffect, useMemo } from "react";
import TopNavigationBar from "../components/Navigators/TopNavigationBar.jsx";
import BottomNavigationBar from "../components/Navigators/BottomNavigationBar.jsx";
import CalendarComponent from "../components/Calendar/CalendarComponent.jsx";
import { scheduleState } from "../atoms/schedulState.jsx";
import { useRecoilState } from "recoil";
import dayjs from "dayjs";
import { getSchedules } from "../api/schedule.jsx";
import ScheduleList from "../components/Schedule/ScheduleList.jsx";

export default function Schedule() {
  const [selectedDate, setSelectedDate] = useRecoilState(scheduleState);
  const [currentYear, setCurrentYear] = useState(dayjs().year()); // ✅ 현재 연도 상태 추가
  const [currentMonth, setCurrentMonth] = useState(dayjs().month() + 1); // ✅ 현재 월 상태 추가 (month()는 0부터 시작)

  const handleDateClick = (date) => {
    setSelectedDate((prevState) => ({
      ...prevState,
      date: dayjs(date).format("YYYY-MM-DD"),
    }));
  };

  const [scheduleData, setScheduleData] = useState([]);

  useEffect(() => {
    const axiosSchedules = async () => {
      try {
        const scheduleData = await getSchedules();
        setScheduleData(scheduleData);
      } catch (err) {
        console.log(err);
      }
    };
    axiosSchedules();
  }, []);

  useEffect(() => {
    console.log(scheduleData);
  }, [scheduleData]);

  const sortedScheduleData = useMemo(() => {
    if (!scheduleData) return [];
    return [...scheduleData].sort((a, b) => {
      const dateA = new Date(`${a.startDate}T${a.startTime}`);
      const dateB = new Date(`${b.startDate}T${b.startTime}`);
      return dateA - dateB;
    });
  }, [scheduleData]);

  return (
    <>
      <TopNavigationBar />
      <div className="h-[86vh] bg-[f4f9f5]">
        <CalendarComponent
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          handleDateClick={handleDateClick}
          vendorId={""}
          setCurrentYear={setCurrentYear} // ✅ 현재 연도 상태 전달
          setCurrentMonth={setCurrentMonth} // ✅ 현재 월 상태 전달
        />
        <div className="flex w-screen flex-col h-[calc(50vh-0rem)] overflow-y-auto bg-white rounded-lg shadow-md">
          {scheduleData && scheduleData.length > 0 ? (
            <ScheduleList
              selectedDate={selectedDate}
              sortedScheduleData={sortedScheduleData}
            />
          ) : (
            <p className="text-gray-500 text-center">일정이 없습니다.</p>
          )}
        </div>
      </div>
      <BottomNavigationBar />
    </>
  );
}
