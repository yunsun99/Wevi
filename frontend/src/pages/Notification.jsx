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
        const formattedData = data.map(formatNotificationData);
        setAlarm(formattedData);
      } catch (error) {
        console.error("알림 데이터를 불러오는 중 오류 발생:", error);
      }
    };
    loadAlarms();
  }, []);

  function formatNotificationData(data) {
    let title = "";
    let message = data.message;
    let id = data.notificationId;

    switch (data.type) {
      case 1:
        title = "연인 연동";
        message = `${data.message}님으로부터 연동 신청이 왔습니다.`;
        break;
      case 2:
        title = "연인 연동";
        message = `연동이 ${data.message}되었습니다.`;
        break;
      case 3:
        title = "연인이 일정을 추가하였습니다.";
        break;
      case 4:
      case 5:
        title = data.vendor;
        break;
      default:
        title = "알림";
    }

    return { ...data, title, message, id };
  }

  return (
    <>
      <TopNavigationBar title="알림" />
      <ListView data={alarm} CardComponent={CardNotification} />
    </>
  );
}
