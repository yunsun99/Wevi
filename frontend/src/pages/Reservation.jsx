import { useLocation } from "react-router-dom";
import CardReservation from "../components/Cards/CardReservation";
import BottomNavigationBar from "../components/Navigators/BottomNavigationBar";
import TopNavigationBar from "../components/Navigators/TopNavigationBar";
import { useEffect, useState } from "react";
import { getConsultationInfo, getContractInfo } from "../api/reservation";
import TopNavigationBar2 from "../components/Navigators/TopNavigationBar2";
export default function Reservation() {
  const [reservationData, setReservationData] = useState();
  const tempdata = useLocation().state;

  useEffect(() => {
    if (tempdata.category === "consultation") {
      const axiosReservationInfo = async () => {
        try {
          const consultationInfo = await getConsultationInfo(tempdata.url);
          setReservationData(consultationInfo);
        } catch (err) {
          console.log(err); // ✅ 서버에서 받은 오류 메시지 표시
        }
      };
      axiosReservationInfo();
    } else if (tempdata.category === "contract") {
      const axiosReservationInfo = async () => {
        try {
          const contractInfo = await getContractInfo(tempdata.url);
          setReservationData(contractInfo);
        } catch (err) {
          console.log(err); // ✅ 서버에서 받은 오류 메시지 표시
        }
      };
      axiosReservationInfo();
    }
  }, [tempdata]);

  /**
   상담일정 데이터 예시
{
    "status": 201,
    "success": true,
    "message": "일정 상세 조회 성공",
    "data": {
        "id": 1,
        "startDate": "2025-02-10",
        "startTime": "19:00",
        "endDate": "2025-02-10",
        "endTime": "21:00",
        "title": "웨딩 촬영 상담",
        "createdAt": null,
        "updatedAt": null,
        "request": "드레스 선택과 메이크업 상담을 원합니다.",
        "customerId": 1,
        "customerName": "정윤선",
        "customerPhone": "01012345678",
        "vendorId": 2,
        "vendorName": "라벤더 웨딩홀",
        "vendorAutoRoadAddress": "서울특별시 서초구 강남대로 123",
        "vendorPhone": "02-1234-5678"
		}
}

    계약 데이터 예시
    {
    "status": 201,
    "success": true,
    "message": "일정 상세 조회 성공",
    "data": {
        "id": 2,
        "startDate": "2025-02-15",
        "startTime": "23:00",
        "endDate": "2025-02-16",
        "endTime": "01:00",
        "title": "웨딩 계약",
        "createdAt": "2025-02-16T01:00:00",
        "updatedAt": "2025-02-16T01:00:00",
        "price": 5000000,
        "contractDate": "2025-02-20T22:00:00",
        "detail": "웨딩 촬영 및 드레스 대여 포함",
        "customerId": 1,
        "customerName": "정윤선",
        "customerPhone": "010-1234-5678",
        "vendorId": 2,
        "vendorName": "영등포 웨딩샵",
        "vendorAutoRoadAddress": "서울특별시 영등포구 여의대로 24",
        "vendorPhone": "02-1234-5678"
		}   
}
    

   */
  return (
    <>
      <TopNavigationBar2
        title={tempdata.category === "contract" ? "계약" : "상담"}
      />
      {reservationData === undefined ? (
        <p>⏳ 데이터 불러오는 중...</p> // ✅ 로딩 표시 추가
      ) : (
        <CardReservation data={reservationData} category={tempdata.category} />
      )}
      <BottomNavigationBar />
    </>
  );
}
