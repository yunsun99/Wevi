import React, { useRef, useState } from "react";
import dayjs from "dayjs";
import dress_schedule from "../../assets/backgroundImages_Schedule/dress_schedule.jpg";
import hairmakeup_schedule from "../../assets/backgroundImages_Schedule/hairmakeup_schedule.png";
import studio_schedule from "../../assets/backgroundImages_Schedule/studio_schedule.png";
import weddinghall_schedule from "../../assets/backgroundImages_Schedule/weddinghall_schedule.png";
import { useLocation, useNavigate } from "react-router-dom";
import { upLoadConsultation } from "../../api/user";

export default function CardSchedule({ data }) {
  // console.log(data);
  const location = useLocation(); // ✅ 현재 경로 가져오기
  const isConsultationListPage = location.pathname === "/consultationList"; // ✅ 특정 경로 확인

  const categoryBackgroundMap = {
    weddinghall:
      "https://my-vendor-images.s3.ap-northeast-2.amazonaws.com/weddinghall_schedule.png",
    dress:
      "https://my-vendor-images.s3.ap-northeast-2.amazonaws.com/dress_schedule.jpg",
    makeup:
      "https://my-vendor-images.s3.ap-northeast-2.amazonaws.com/hairmakeup_schedule.png",
    studio:
      "https://my-vendor-images.s3.ap-northeast-2.amazonaws.com/studio_schedule.png",
  };
  //
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
  const fileInputRef = useRef(null);
  async function goSummary(event) {
    try {
      const [fileHandle] = await window.showOpenFilePicker({
        types: [
          {
            description: "M4A 오디오 파일",
            accept: {
              "audio/x-m4a": [".m4a"], // .m4a 파일만 허용
            },
          },
        ],
        excludeAcceptAllOption: true, // "모든 파일" 옵션 제거
        multiple: false, // 한 개의 파일만 선택 가능
      });

      const file = await fileHandle.getFile();
      console.log("선택한 파일:", file.name);
      uploadFile(file, data.scheduleId);
    } catch (error) {
      console.error("파일 선택 취소 또는 오류:", error);
    }
  }

  function handleFileChange(event) {
    const file = event.target.files[0];
    if (file) {
      uploadFile(file);
    }
  }

  async function uploadFile(file, scheduleId) {
    try {
      const response = await upLoadConsultation(file, scheduleId);
      if (response.ok) {
        console.log("파일 업로드 성공!");
      } else {
        console.error("파일 업로드 실패");
      }
      window.location.reload();
    } catch (error) {
      console.error("파일 업로드 중 오류 발생:", error);
      alert("파일 업로드에 실패했어요. 나중에 다시 시도해주세요.");
    }
  }
  // console.log(data);
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
        {/* 화살표 아이콘 */}
        <div className="absolute top-1/5 right-4 transform -translate-y-1/2 text-white">
          <span className="text-sm text-gray-300">
            {data.customerId === data.loginUserId
              ? `${data.customerName}님 예약`
              : "상대방 예약"}
          </span>
        </div>
        <div className="absolute top-25 right-4 transform -translate-y-1/2 text-white">
          {isConsultationListPage ? (
            <>
              <button
                className="text-sm text-white bg-gray-700 rounded-lg px-4"
                onClick={(event) => {
                  event.stopPropagation(); // 상위 div의 클릭 이벤트 전파 막기
                  goSummary();
                }}
                disabled={
                  data.status === "COMPLETED" || data.status === "PROCESSING"
                }
              >
                {data.status === "COMPLETED"
                  ? "상담 분석 완료"
                  : data.status === "PROCESSING"
                  ? "분석 중"
                  : "AI 상담 분석 요청하기"}
              </button>
              {/* 숨겨진 파일 입력 */}
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
            </>
          ) : null}
        </div>
      </div>
    </>
  );
}
