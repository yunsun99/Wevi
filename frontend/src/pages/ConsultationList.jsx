import { useEffect, useState } from "react";
import BottomNavigationBar from "../components/Navigators/BottomNavigationBar";
import TopNavigationBar2 from "../components/Navigators/TopNavigationBar2";
import { getConsultationList } from "../api/schedule";
import ScheduleList from "../components/Schedule/ScheduleList";

export default function ConsultationList() {
  const [consultationList, setConsultationList] = useState();
  useEffect(() => {
    const axiosConsultaionList = async () => {
      try {
        const consultationList = await getConsultationList();
        setConsultationList(consultationList);
      } catch (err) {
        console.log(err);
      }
    };
    axiosConsultaionList();
  }, []);

  useEffect(() => {
    console.log(consultationList);
  }, [consultationList]);
  return (
    <>
      <TopNavigationBar2 title="상담 내역" />
      <ScheduleList selectedDate={0} sortedScheduleData={consultationList} />
      <BottomNavigationBar />
    </>
  );
}
