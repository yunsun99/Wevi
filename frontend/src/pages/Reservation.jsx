import { useLocation } from "react-router-dom";
import CardReservation from "../components/Cards/CardReservation";
import BottomNavigationBar from "../components/Navigators/BottomNavigationBar";
import TopNavigationBar from "../components/Navigators/TopNavigationBar";
import { useEffect, useState } from "react";
import TopNavigationBar2 from "../components/Navigators/TopNavigationBar2";
import { getConsultationInfo, getContractInfo } from "../api/schedule";
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
