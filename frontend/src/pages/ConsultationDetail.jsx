import { useLocation, useParams } from "react-router-dom";
import CardReservation from "../components/Cards/CardReservation";
import BottomNavigationBar from "../components/Navigators/BottomNavigationBar";
import TopNavigationBar from "../components/Navigators/TopNavigationBar";
import { useEffect, useState } from "react";
import TopNavigationBar2 from "../components/Navigators/TopNavigationBar2";
import { getConsultationInfo } from "../api/schedule";
export default function ConsultationDetail() {
  const { id } = useParams();
  const [consultationData, setConsultationData] = useState();

  useEffect(() => {
    const axiosConsultationInfo = async () => {
      try {
        const consultationInfo = await getConsultationInfo(id);
        setConsultationData(consultationInfo);
      } catch (err) {
        console.log(err); // ✅ 서버에서 받은 오류 메시지 표시
      }
    };
    axiosConsultationInfo();
  }, [id]);

  /**
   상담일정 데이터 예시
    {
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
    

   */
  return (
    <>
      <TopNavigationBar2 title="상담" />
      {consultationData === undefined ? (
        <p>⏳ 데이터 불러오는 중...</p> // ✅ 로딩 표시 추가
      ) : (
        <CardReservation data={consultationData} category="consultation" />
      )}
      <BottomNavigationBar />
    </>
  );
}
