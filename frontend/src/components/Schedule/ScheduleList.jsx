import React, { useEffect, useRef, useMemo } from "react";
import ListView from "../ListView/ListView.jsx"; // 경로 확인!
import CardSchedule from "../Cards/CardSchedule.jsx";
import dayjs from "dayjs";
import CardListView from "../ListView/CardListView.jsx";

const ScheduleList = ({ selectedDate, sortedScheduleData }) => {
  const listRef = useRef(null);
  const itemRefs = useRef({}); // 각 날짜별 ref 저장

  // ✅ 날짜별로 그룹화된 데이터를 생성
  const groupedScheduleData = useMemo(() => {
    if (!sortedScheduleData) return {};

    return sortedScheduleData.reduce((acc, schedule) => {
      const formattedDate = dayjs(schedule.startDate).format("YYYY-MM-DD"); // 날짜 포맷 통일
      if (!acc[formattedDate]) {
        acc[formattedDate] = [];
      }
      acc[formattedDate].push(schedule);
      return acc;
    }, {});
  }, [sortedScheduleData]);

  // ✅ selectedDate 변경 시 해당 날짜로 스크롤 이동
  useEffect(() => {
    const formattedSelectedDate = dayjs(selectedDate.date).format("YYYY-MM-DD");
    if (formattedSelectedDate && itemRefs.current[formattedSelectedDate]) {
      itemRefs.current[formattedSelectedDate].scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [selectedDate]);

  return (
    <>
      <div ref={listRef} className="w-screen h-[86vh]">
        {Object.entries(groupedScheduleData).map(([date, schedules]) => {
          const formattedDate = dayjs(date).format("M월 D일");

          return (
            <div
              key={date}
              ref={(el) => (itemRefs.current[date] = el)} // 각 날짜별 요소 저장
              className="w-screen"
            >
              <h1 className="ml-4 pt-4 text-lg font-bold">{formattedDate}</h1>
              <CardListView data={schedules} CardComponent={CardSchedule} />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ScheduleList;
