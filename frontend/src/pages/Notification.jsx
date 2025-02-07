import TopNavigationBar from "../components/Navigators/TopNavigationBar2";
import ListView from "@/components/ListView/ListView";
import { useRecoilState } from "recoil";
import { notificationState } from "../atoms/notificationState";
import { useEffect } from "react";
import { axiosNotification } from "../api/notification";
import CardNotification from "../components/Cards/CardNotification";

export default function Notification() {
  const [alarm, setAlarm] = useRecoilState(notificationState);

  useEffect(() => {
    const loadAlarms = async () => {
      try {
        const data = await axiosNotification();
        setAlarm(data);
      } catch (error) {
        console.error("알림 데이터를 불러오는 중 오류 발생:", error);
      }
    };
    loadAlarms();
  }, []);
  return (
    <>
      <TopNavigationBar title="알림" />
      <ListView data={alarm} CardComponent={CardNotification} />
    </>
  );
}
