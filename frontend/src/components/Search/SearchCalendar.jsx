import React, { useState, useRef, useEffect, useCallback } from "react";
import icon_calendar from "../../assets/icons/icon_calendar.png";
import { useRecoilState } from "recoil";
import { searchDateState } from "../../atoms/searchState";
import { useParams } from "react-router-dom";

export default function SearchCalendar() {
  const { category } = useParams();
  const [searchDate, setSearchDate] = useRecoilState(searchDateState);
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const datePickerRef = useRef(null);

  useEffect(() => {
    setSearchDate({ date: "" }); // ✅ Recoil 상태 초기화
  }, [category]);

  // 🔹 날짜 변경 핸들러 (이전 값과 다를 때만 업데이트)
  const handleDateChange = useCallback(
    (e) => {
      const newDate = e.target.value;
      if (newDate !== searchDate) {
        setSearchDate((prev) => ({
          ...prev,
          date: newDate,
        })); // ✅ searchDate를 문자열로 저장
      }
      setIsCalendarVisible(false);
    },
    [searchDate, setSearchDate]
  );

  // 🔹 달력 토글 (닫힘 이벤트보다 먼저 실행되도록 setTimeout 사용)
  const toggleCalendar = () => {
    setTimeout(() => {
      setIsCalendarVisible((prev) => !prev);
    }, 0);
  };

  // 🔹 바깥 클릭 감지하여 달력 닫기
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        datePickerRef.current &&
        !datePickerRef.current.contains(event.target)
      ) {
        setIsCalendarVisible(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <div
        className="flex items-center w-full bg-gray-100 rounded-[10px] p-2 mb-4 cursor-pointer"
        onClick={toggleCalendar}
      >
        <div className="flex items-center justify-center h-8 w-8 bg-white rounded-full shadow-sm">
          <img src={icon_calendar} alt="Calendar Icon" className="h-5 w-5" />
        </div>
        <span className="flex-1 bg-transparent px-4 text-sm text-gray-700">
          {searchDate.date || "날짜 선택"} {/* ✅ 문자열 렌더링 가능 */}
        </span>
      </div>

      {isCalendarVisible && (
        <div
          ref={datePickerRef}
          className="absolute z-10 bg-white shadow-lg p-4 rounded-lg w-60"
        >
          <input
            type="date"
            value={searchDate || ""} // ✅ 기본값 처리
            onChange={handleDateChange}
            className="w-full p-2 border rounded-md focus:outline-none"
            autoFocus
          />
        </div>
      )}
    </>
  );
}
