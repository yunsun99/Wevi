import { forwardRef } from "react";

const CardCalendar = forwardRef(({ schedule }, ref) => {
  return (
    <div
      ref={ref}
      className="relative bg-white rounded-lg shadow-md overflow-hidden"
    >
      {/* 배경 이미지 */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: schedule.image ? `url(${schedule.image})` : "none", // 이미지가 없을 경우 처리
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.3, // 배경 투명도
        }}
      ></div>

      {/* 콘텐츠 */}
      <div className="relative p-4">
        <div className="flex">
          {/* 썸네일 이미지 */}
          <img
            src={schedule.image}
            alt={schedule.title}
            className="h-16 w-16 rounded-lg object-cover"
          />
          <div className="flex-1 pl-4">
            <h3 className="text-lg font-bold">{schedule.title}</h3>
            <p className="text-gray-500">{schedule.location}</p>
            <p className="text-gray-700 font-semibold">{schedule.time}</p>
          </div>
        </div>
        <div className="flex justify-between mt-4">
          <button className="px-4 py-2 bg-gray-200 rounded-full">
            업체 상세보기
          </button>
          <button className="px-4 py-2 bg-gray-200 rounded-full">
            업체 예약하기
          </button>
        </div>
      </div>
    </div>
  );
});

CardCalendar.displayName = "CardCalendar";

export default CardCalendar;
