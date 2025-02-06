import React, { useState, useRef } from "react";
import icon_search from "../../assets/icons/icon_search.png";
import icon_aisearch4 from "../../assets/icons/icon_AIsearch.png";
import icon_calendar from "../../assets/icons/icon_calendar.png";
import { Link } from "react-router-dom";
import Region from "../../data/regiondata";

function SearchBar() {
  // 날짜 상태 관리
  const [selectedDate, setSelectedDate] = useState("");
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const datePickerRef = useRef(null); // 날짜 입력창의 위치를 참조하기 위한 ref

  // 날짜 변경 핸들러
  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
    setIsCalendarVisible(false); // 날짜 선택 후 캘린더 숨기기
  };

  // 캘린더 모달을 토글하는 함수
  const toggleCalendar = () => {
    setIsCalendarVisible(!isCalendarVisible);
  };

  // 캘린더 모달 위치를 계산하는 함수
  const getCalendarPosition = () => {
    if (datePickerRef.current) {
      const rect = datePickerRef.current.getBoundingClientRect();
      return { top: rect.bottom + window.scrollY, left: rect.left };
    }
    return { top: 0, left: 0 };
  };

  return (
    <section className="bg-white shadow-md p-4">
      <div className="flex items-center w-full bg-gray-100 rounded-[10px] p-2 mb-4">
        {/* Google 아이콘 */}
        <div className="flex items-center justify-center h-8 w-8 bg-white rounded-full shadow-sm">
          <img src={icon_search} alt="Google Icon" className="h-5 w-5" />
        </div>

        {/* 검색 입력창 */}
        <input
          type="text"
          placeholder="검색"
          className="flex-1 bg-transparent px-4 text-sm text-gray-700 focus:outline-none"
        />
      </div>

      <div
        className="flex items-center w-full bg-gray-100 rounded-[10px] p-2 mb-4 cursor-pointer"
        onClick={toggleCalendar}
        ref={datePickerRef} // 날짜 입력창 위치를 참조
      >
        {/* 캘린더 아이콘 */}
        <div className="flex items-center justify-center h-8 w-8 bg-white rounded-full shadow-sm">
          <img src={icon_calendar} alt="Calendar Icon" className="h-5 w-5" />
        </div>

        {/* 날짜 표시 */}
        <span className="flex-1 bg-transparent px-4 text-sm text-gray-700">
          {selectedDate ? selectedDate : "날짜 선택"}
        </span>
      </div>

      {/* 커스텀 캘린더 모달 */}
      {isCalendarVisible && (
        <div
          className="absolute z-10 bg-white shadow-lg p-4 rounded-lg w-60"
          style={{
            top: `${getCalendarPosition().top}px`,
            left: `${getCalendarPosition().left}px`,
          }}
        >
          <input
            type="date"
            value={selectedDate}
            onChange={handleDateChange}
            className="w-full p-2 border rounded-md focus:outline-none"
          />
        </div>
      )}

      <div className="flex gap-4 mb-4 overflow-x-auto">
        <Region key="region" />
        <select className="border border-[#D1D1D1] text-[#6E6E6E] p-2 rounded-full flex-shrink-0">
          <option>실내</option>
          <option>야외</option>
        </select>
        <select className="border border-[#D1D1D1] text-[#6E6E6E] p-2 rounded-full flex-shrink-0">
          <option>가격</option>
          <option>컨벤션</option>
          <option>하우스</option>
        </select>
        <select className="border border-[#D1D1D1] text-[#6E6E6E] p-2 rounded-full flex-shrink-0">
          <option>가격</option>
          <option>컨벤션</option>
          <option>하우스</option>
        </select>
      </div>
    </section>
  );
}

export default SearchBar;
