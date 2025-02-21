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
        // console.log(err); // ✅ 서버에서 받은 오류 메시지 표시
      }
    };
    axiosConsultationInfo();
  }, [id]);

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
