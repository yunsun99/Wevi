import React from "react";
import dayjs from "dayjs";
import dress_schedule from "../../assets/backgroundImages_Schedule/dress_schedule.jpg";
import hairmakeup_schedule from "../../assets/backgroundImages_Schedule/hairmakeup_schedule.png";
import studio_schedule from "../../assets/backgroundImages_Schedule/studio_schedule.png";
import weddinghall_schedule from "../../assets/backgroundImages_Schedule/weddinghall_schedule.png";
import { useNavigate } from "react-router-dom";

export default function CardSchedule({ data }) {
  const categoryBackgroundMap = {
    weddinghall: weddinghall_schedule,
    dress: dress_schedule,
    makeup: hairmakeup_schedule,
    studio: studio_schedule,
  };

  const backgroundImageURL =
    categoryBackgroundMap[data.categoryName] || "default_schedule";

  const navigate = useNavigate();
  function handleClick() {
    /**
     * middle_process -> 중간과정 -> contact_id로 요청
     * contract -> 계약 -> id로 요청
     * consultation -> 상담 -> id로 요청
     * other_schedule -> 사용자 정의 -> 사용자 정의 페이지로 요청?
     */
    if (!data.dtype) {
      if (data.contractDate) {
        return navigate(`/contractDetail/${data.scheduleId}`);
      } else {
        return navigate(`/consultationDetail/${data.scheduleId}`);
      }
    } else {
      if (data.dtype === "middle_process") {
        return navigate(`/contractDetail/${data.scheduleId}`);
      } else if (data.dtype === "contract") {
        return navigate(`/contractDetail/${data.scheduleId}`);
      } else if (data.dtype === "consultation") {
        return navigate(`/consultationDetail/${data.scheduleId}`);
      } else {
        return navigate(`/otherDetail/${data.scheduleId}`);
      }
    }
  }
  return (
    <>
      <div
        className="relative bg-gray-800 h-30 shadow-md overflow-hidden"
        style={{
          backgroundImage: `url(${backgroundImageURL})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        onClick={handleClick}
      >
        {/* 반투명 오버레이 */}
        <div className="absolute inset-0 bg-black opacity-30"></div>

        {/* 카드 내용 */}
        <div className="relative p-4 text-white">
          <h2 className="text-sm font-bold">{data.title}</h2>
          <p className="text-xs">{data.vendorName}</p>
          <p className="text-xs">
            {data.startTime} - {data.endTime}
          </p>
        </div>

        {/* 화살표 아이콘 */}
        <div className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white">
          <span>{">"}</span>
        </div>
      </div>
    </>
  );
}
