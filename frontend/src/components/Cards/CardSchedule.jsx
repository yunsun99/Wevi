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
    hairmakeup: hairmakeup_schedule,
    studio: studio_schedule,
  };

  const backgroundImageURL =
    categoryBackgroundMap[data.category] || "default_schedule";

  const navigate = useNavigate();
  function handleClick() {
    // 전달할 데이터
    const reservationData = {
      image: "https://via.placeholder.com/150",
      title: "박성근 웨딩홀 덕명점",
      address: "서울특별시 목동서로2길 22",
      phone: "010-2230-3939",
      reservationNumber: "RS32482718335",
      schedule: "2025. 2. 13(목) 오후 9:00",
      manager: "고소롱",
      product: "상담 예약",
      customer: "정윤선",
      customerPhone: "010-4170-7002",
      request: "남편이랑 같이 방문예정이에요!!!!!!!!!!!!!!!!",
    };

    /**
     * middle_process -> 중간과정 -> contact_id로 요청
     * contract -> 계약 -> id로 요청
     * consultation -> 상담 -> id로 요청
     * other_schedule -> 사용자 정의 -> 사용자 정의 페이지로 요청?
     */
    let APIid;
    if (data.dtype === "middle_process") {
      // navigate로 이동하며 데이터 전달
      // middle_process면 axios보낼 때 contractId로 요청
      APIid = data.contractId;
      // /api/schedules/contract/{contractId}
      return navigate("/reservation", {
        state: {
          url: "/api/schedules/contract/" + APIid,
          category: "contract",
        },
      });
    } else if (data.dtype === "contract") {
      APIid = data.id;
      // /api/schedules/contract/{contractId}
      return navigate("/reservation", {
        state: {
          url: "/api/schedules/contract/" + APIid,
          category: "contract",
        },
      });
    } else if (data.dtype === "consultation") {
      APIid = data.id;
      // /api/schedules/consultation/{scheduleId}
      return navigate("/reservation", {
        state: {
          url: "/api/schedules/consultation/" + APIid,
          category: "consultation",
        },
      });
    } else {
      APIid = data.id;
      return navigate("/otherschedule", { state: APIid });
    }
  }
  return (
    <div
      className="relative bg-gray-800 rounded-lg shadow-md overflow-hidden"
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
  );
}
