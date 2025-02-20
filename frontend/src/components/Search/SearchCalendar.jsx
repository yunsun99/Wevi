import React, { useState, useRef, useEffect, useCallback } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // 스타일 import
import { useRecoilState } from "recoil";
import { searchDateState } from "../../atoms/searchState";
import { useParams } from "react-router-dom";
import icon_calendar from "../../assets/icons/icon_calendar.png";
import "../../DatePicker.css";
import { ko } from "date-fns/locale"; // 한글 로케일 불러오기
import icon_close from "../../assets/icons/icon_close.png";

export default function SearchCalendar() {
  const { category } = useParams();
  const [searchDate, setSearchDate] = useRecoilState(searchDateState);
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const datePickerRef = useRef(null);

  useEffect(() => {
    setSearchDate({ date: "" }); // Recoil 상태 초기화
  }, [category]);

  // 날짜 변경 핸들러
  const handleDateChange = (date) => {
    setSearchDate((prev) => ({
      ...prev,
      date: date.toISOString().split("T")[0], // ISO 형식으로 저장 (YYYY-MM-DD)
    }));
    setIsCalendarVisible(false); // 날짜 선택 후 캘린더 닫기
  };

  // 달력 토글
  const toggleCalendar = () => {
    setTimeout(() => {
      setIsCalendarVisible((prev) => !prev);
    }, 0);
  };

  // ✅ 날짜 초기화 핸들러 (X 버튼 클릭 시)
  const handleClearDate = (e) => {
    e.stopPropagation(); // 부모 이벤트 방지
    setSearchDate({ date: "" }); // 날짜 초기화
  };

  // 바깥 클릭 감지하여 달력 닫기
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
        <span className="flex-1 bg-transparent px-4 text-sm text-gray-400">
          {searchDate.date || "상담 날짜"} {/* 문자열 렌더링 가능 */}
        </span>
        {/* ✅ X 버튼 (날짜 초기화 버튼) */}
        <button
          className="absolute right-8 text-gray-500 hover:text-gray-700"
          onClick={handleClearDate}
          aria-label="Clear date"
        >
          <img src={icon_close} alt="Clear" className="h-5 w-5" />
        </button>
      </div>

      {isCalendarVisible && (
        <div ref={datePickerRef} className="absolute z-10 shadow-lg rounded-lg">
          <DatePicker
            selected={searchDate.date ? new Date(searchDate.date) : null}
            onChange={handleDateChange}
            dateFormat="yyyy-MM-dd"
            locale={ko} // 한글 로케일 적용
            // showDayMonthYearPicker
            showMonthDropdown
            showYearDropdown
            dropdownMode="select" // 드롭다운 모드 활성화
            className="w-full p-2 border rounded-md focus:outline-none"
            inline
          />
        </div>
      )}
    </>
  );
}
