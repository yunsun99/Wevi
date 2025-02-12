import React, { useState, useRef } from "react";
import icon_calendar from "../../assets/icons/icon_calendar.png";
import { useRecoilState } from "recoil";
import { searchDateState } from "../../atoms/searchState";

export default function SearchCalendar() {
  const [searchDate, setSearchDate] = useRecoilState(searchDateState);
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const datePickerRef = useRef(null);

  const handleDateChange = (e) => {
    setSearchDate((prevState) => ({
      ...prevState,
      date: e.target.value,
    }));
    setIsCalendarVisible(false);
  };

  const toggleCalendar = () => {
    setIsCalendarVisible(!isCalendarVisible);
  };

  return (
    <>
      <div
        className="flex items-center w-full bg-gray-100 rounded-[10px] p-2 mb-4 cursor-pointer"
        onClick={toggleCalendar}
        ref={datePickerRef}
      >
        <div className="flex items-center justify-center h-8 w-8 bg-white rounded-full shadow-sm">
          <img src={icon_calendar} alt="Calendar Icon" className="h-5 w-5" />
        </div>
        <span className="flex-1 bg-transparent px-4 text-sm text-gray-700">
          {searchDate ? searchDate : "날짜 선택"}
        </span>
      </div>

      {isCalendarVisible && (
        <div className="absolute z-10 bg-white shadow-lg p-4 rounded-lg w-60">
          <input
            type="date"
            value={searchDate || ""}
            onChange={handleDateChange}
            className="w-full p-2 border rounded-md focus:outline-none"
          />
        </div>
      )}
    </>
  );
}
