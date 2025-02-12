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

  const handleDateClick = (date) => {
    setSelectedDate((prevState) => ({
      ...prevState,
      date: dayjs(date).format("YYYY-MM-DD"),
    }));
  };

  const [scheduleData, setScheduleData] = useState();

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
      <CalendarComponent
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        handleDateClick={handleDateClick}
      />
      <div className="flex w-screen flex-col h-[500px] overflow-y-auto bg-white rounded-lg shadow-md">
        <ScheduleList
          selectedDate={selectedDate}
          sortedScheduleData={sortedScheduleData}
        />
      </div>
      <BottomNavigationBar />
    </>
  );
}
