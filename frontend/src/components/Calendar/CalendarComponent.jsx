import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import dayjs from "dayjs";
import "react-calendar/dist/Calendar.css";
import { getAvailableDates } from "../../api/schedule";

export default function CalendarComponent({
  selectedDate,
  setSelectedDate,
  handleDateClick,
  vendorId,
}) {
  // ✅ 현재 보고 있는 연도와 월을 상태로 관리
  const [currentYear, setCurrentYear] = useState(dayjs().year());
  const [currentMonth, setCurrentMonth] = useState(dayjs().month() + 1);
  const [validAvailableDate, setValidAvailableDate] = useState([]);

  // ✅ API에서 상담 가능 날짜 가져오기 (현재 달 + 이전 달 + 다음 달)
  const fetchAvailableDates = async () => {
    try {
      console.log(
        `📅 Fetching available dates: vendorId=${vendorId}, year=${currentYear}, month=${currentMonth}`
      );

      // 이전 달 & 다음 달 계산
      const prevMonth = currentMonth === 1 ? 12 : currentMonth - 1;
      const nextMonth = currentMonth === 12 ? 1 : currentMonth + 1;
      const prevYear = currentMonth === 1 ? currentYear - 1 : currentYear;
      const nextYear = currentMonth === 12 ? currentYear + 1 : currentYear;

      // ✅ 현재 달, 이전 달, 다음 달의 데이터를 병렬 요청
      const [prevData, currentData, nextData] = await Promise.all([
        getAvailableDates({ vendorId, year: prevYear, month: prevMonth }),
        getAvailableDates({ vendorId, year: currentYear, month: currentMonth }),
        getAvailableDates({ vendorId, year: nextYear, month: nextMonth }),
      ]);

      // ✅ 받아온 데이터를 하나의 배열로 합침
      const combinedData = [
        ...(Array.isArray(prevData.availableDate)
          ? prevData.availableDate
          : []),
        ...(Array.isArray(currentData.availableDate)
          ? currentData.availableDate
          : []),
        ...(Array.isArray(nextData.availableDate)
          ? nextData.availableDate
          : []),
      ];

      setValidAvailableDate(combinedData);
    } catch (err) {
      console.error("API 요청 중 에러 발생:", err);
    }
  };

  // ✅ 연도 또는 월이 변경될 때 API 다시 호출
  useEffect(() => {
    fetchAvailableDates();
  }, [currentYear, currentMonth]);

  // ✅ 선택된 날짜가 없으면 기본값을 오늘 날짜로 설정
  useEffect(() => {
    if (!selectedDate.date) {
      setSelectedDate((prevState) => ({
        ...prevState,
        date: dayjs().format("YYYY-MM-DD"),
      }));
    }
  }, [setSelectedDate, selectedDate.date]);

  // ✅ 선택 불가능한 날짜 확인 함수
  const isDateDisabled = ({ date, view }) => {
    if (view !== "month") return false; // ✅ 연도 선택 시 비활성화 적용 안 함
    const formattedDate = dayjs(date).format("YYYY-MM-DD");
    const foundDate = validAvailableDate.find((d) => d.date === formattedDate);
    return foundDate ? !foundDate.available : true;
  };

  return (
    <div className="flex bg-[#f4f9f5] justify-center items-center rounded-lg shadow-md mb-4 h-auto">
      <Calendar
        locale="en-US"
        onChange={handleDateClick}
        onActiveStartDateChange={({ activeStartDate }) => {
          const newYear = dayjs(activeStartDate).year();
          const newMonth = dayjs(activeStartDate).month() + 1;
          setCurrentYear(newYear);
          setCurrentMonth(newMonth);
        }}
        value={selectedDate.date || new Date()}
        className="custom-calendar flex-1 w-full"
        formatShortWeekday={(locale, date) =>
          ["일", "월", "화", "수", "목", "금", "토"][dayjs(date).day()]
        }
        formatDay={(locale, date) => dayjs(date).date()}
        formatMonthYear={(locale, date) => dayjs(date).format("YYYY. MM")}
        tileDisabled={({ date, view }) => isDateDisabled({ date, view })}
        tileClassName={({ date, view }) => {
          if (view !== "month") return "";
          const formattedDate = dayjs(date).format("YYYY-MM-DD");
          const foundDate = validAvailableDate.find(
            (d) => d.date === formattedDate
          );

          if (foundDate && !foundDate.available) {
            console.log(`❌ 비활성화 날짜: ${formattedDate}`);
            return "text-gray-400 bg-gray-200 line-through opacity-60 pointer-events-none cursor-not-allowed";
          }
          return "text-black";
        }}
      />
    </div>
  );
}
