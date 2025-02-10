import React from "react";
import dayjs from "dayjs";
import dress_schedule from "../../assets/backgroundImages_Schedule/dress_schedule.jpg";
import hairmakeup_schedule from "../../assets/backgroundImages_Schedule/hairmakeup_schedule.png";
import studio_schedule from "../../assets/backgroundImages_Schedule/studio_schedule.png";
import weddinghall_schedule from "../../assets/backgroundImages_Schedule/weddinghall_schedule.png";

const schedules = [
  {
    title: "스튜디오 드레스 가봉",
    location: "아뜰리에 드레스",
    time: "10:00 - 12:00",
    image: "https://via.placeholder.com/150", // 여기에 이미지 URL 삽입C
  },
  {
    title: "웨딩촬영 메이크업",
    location: "아뜰리에 드레스",
    time: "10:00 - 12:00",
    image: "https://via.placeholder.com/150", // 여기에 이미지 URL 삽입
  },
  {
    title: "상담예약",
    location: "박성근웨딩홀",
    time: "10:00 - 12:00",
    image: "https://via.placeholder.com/150", // 여기에 이미지 URL 삽입
  },
];

export default function CardSchedule({ data }) {
  const date = data.startDate;
  const formattedDate = dayjs(date).format("M월 D일"); // "2월 25일"로 변환
  return (
    <>
      {/* 날짜 */}
      <h1 className="text-lg font-bold mb-4">{formattedDate}</h1>

      {/* 예약 카드 리스트 */}
      <div className="space-y-4">
        <div className="bg-white rounded-lg shadow-md overflow-hidden flex items-center">
          {/* 이미지 */}
          <img
            src={dress_schedule}
            alt={data.title}
            className="w-1/3 object-cover h-full"
          />
          {/* 내용 */}
          <div className="flex-1 p-4">
            <h2 className="text-sm font-bold">{data.title}</h2>
            <p className="text-xs text-gray-500">{data.startDate}</p>
            <p className="text-xs text-gray-500">{data.startTime}</p>
          </div>
          {/* 화살표 아이콘 */}
          <div className="p-4">
            <span className="text-gray-500">{">"}</span>
          </div>
        </div>
      </div>
    </>
  );
}
