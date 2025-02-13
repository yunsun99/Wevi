import React from "react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import dress_schedule from "../../assets/backgroundImages_Schedule/dress_schedule.jpg";
import hairmakeup_schedule from "../../assets/backgroundImages_Schedule/hairmakeup_schedule.png";
import studio_schedule from "../../assets/backgroundImages_Schedule/studio_schedule.png";
import weddinghall_schedule from "../../assets/backgroundImages_Schedule/weddinghall_schedule.png";

export default function CardContract({ data }) {
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
    if (!data.dtype) {
      if (data.price) {
        return navigate(`/contractDetail/${data.scheduleId}`);
      } else {
        return navigate(`/consultationDetail/${data.scheduleId}`);
      }
    } else {
      if (data.dtype === "middle_process") {
        return navigate(`/contractDetail/${data.contractId}`);
      } else if (data.dtype === "contract") {
        return navigate(`/contractDetail/${data.scheduleId}`);
      } else if (data.dtype === "consultation") {
        return navigate(`/consultationDetail/${data.scheduleId}`);
      } else {
        return navigate(`/otherDetail/${data.scheduleId}`);
      }
    }
  }
  let formattedName;
  if (data.categoryName === "weddinghall") {
    formattedName = "웨딩홀";
  } else if (data.categoryName === "dress") {
    formattedName = "드레스";
  } else if (data.categoryName === "studio") {
    formattedName = "스튜디오";
  } else if (data.categoryName === "makeup") {
    formattedName = "헤어/메이크업";
  }
  return (
    <div
      className="relative bg-gray-800 shadow-md h-[10rem] overflow-hidden cursor-pointer"
      style={{
        backgroundImage: `url(${backgroundImageURL})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      onClick={handleClick}
    >
      {/* 반투명 오버레이 */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* 업체 상세보기 버튼 */}
      <button className="absolute top-4 right-4 bg-gray-900 bg-opacity-70 text-white px-3 py-1 text-xs rounded-full">
        업체 상세보기
      </button>
      <button className="absolute top-12 right-4 bg-gray-900 bg-opacity-70 text-white px-3 py-1 text-xs rounded-full">
        업체 예약하기
      </button>

      {/* 카드 내용 */}
      <div className="relative p-4 text-white">
        <h2 className="text-lg font-bold">{formattedName}</h2>
        <p className="text-sm opacity-80">{data.vendorName}</p>
        <p className="text-sm mt-1">지역: {data.vendorAutoRoadAddress}</p>
        <p className="text-sm">
          금액: {data.price ? `${data.price.toLocaleString()}원` : "상담 문의"}
        </p>

        {/* 분위기 태그 */}
        {data.tags && (
          <div className="mt-2 flex flex-wrap gap-1">
            {data.tags.map((tag, index) => (
              <span
                key={index}
                className="bg-white bg-opacity-20 text-xs px-2 py-1 rounded-md"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
