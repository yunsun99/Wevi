import { useLocation, useParams } from "react-router-dom";
import CardReservation from "../components/Cards/CardReservation";
import BottomNavigationBar from "../components/Navigators/BottomNavigationBar";
import TopNavigationBar from "../components/Navigators/TopNavigationBar";
import { useEffect, useState } from "react";
import TopNavigationBar2 from "../components/Navigators/TopNavigationBar2";
import { getConsultationInfo, getContractInfo } from "../api/schedule";
export default function ContractDetail() {
  const { id } = useParams();
  const [contractData, setContractData] = useState();

  useEffect(() => {
    const axiosContractInfo = async () => {
      try {
        const contractInfo = await getContractInfo(id);
        setContractData(contractInfo);
      } catch (err) {
        // console.log(err); // ✅ 서버에서 받은 오류 메시지 표시
      }
    };
    axiosContractInfo();
  }, [id]);

  /**

    계약 데이터 예시

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

    

   */
  return (
    <>
      <TopNavigationBar2 title="계약" />
      {contractData === undefined ? (
        <p>⏳ 데이터 불러오는 중...</p> // ✅ 로딩 표시 추가
      ) : (
        <CardReservation data={contractData} category="contract" />
      )}
      <BottomNavigationBar />
    </>
  );
}
