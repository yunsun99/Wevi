import { useEffect, useState } from "react";
import BottomNavigationBar from "../components/Navigators/BottomNavigationBar";
import TopNavigationBar2 from "../components/Navigators/TopNavigationBar2";
import { getConsultationList } from "../api/schedule";
import ScheduleList from "../components/Schedule/ScheduleList";
import dayjs from "dayjs";
export default function ConsultationList() {
  const [consultationList, setConsultationList] = useState();
  useEffect(() => {
    const axiosConsultaionList = async () => {
      try {
        const consultationData = await getConsultationList();
        // ✅ `startDate`(날짜) → `startTime`(시간) 기준으로 정렬
        const sortedData = consultationData.sort((a, b) => {
          const dateA = dayjs(
            `${a.startDate} ${a.startTime}`,
            "YYYY-MM-DD HH:mm"
          );
          const dateB = dayjs(
            `${b.startDate} ${b.startTime}`,
            "YYYY-MM-DD HH:mm"
          );

          return dateA - dateB; // 오름차순 정렬
        });

        setConsultationList(sortedData);
      } catch (err) {
        // console.log(err);
      }
    };
    axiosConsultaionList();
  }, []);

  useEffect(() => {
    // console.log(consultationList);
  }, [consultationList]);
  return (
    <>
      <TopNavigationBar2 title="상담 내역" />
      <div className="h-[86vh] overflow-auto ">
        {consultationList && consultationList.length > 0 ? (
          <ScheduleList
            selectedDate={0}
            sortedScheduleData={consultationList}
          />
        ) : (
          <p className="text-gray-500 text-center">상담 내역이 없습니다.</p>
        )}
      </div>
      <BottomNavigationBar />
    </>
  );
}
