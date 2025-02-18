import TopNavigationBar from "../components/Navigators/TopNavigationBar2";
import ListView from "@/components/ListView/ListView";
import { useRecoilState } from "recoil";
import {
  isNotificationState,
  notificationState,
} from "../atoms/notificationState";
import { useEffect, useRef } from "react";
import { axiosNotification, axiosReadNotification } from "../api/notification";
import CardNotification from "../components/Cards/CardNotification";

export default function Notification() {
  const [alarm, setAlarm] = useRecoilState(notificationState);
  const [isNotification, setIsNotification] =
    useRecoilState(isNotificationState);

  const alarmRef = useRef(alarm); // ✅ 최신 `alarm` 값을 저장하는 `useRef`

  useEffect(() => {
    setIsNotification(false);
    const loadAlarms = async () => {
      try {
        const data = await axiosNotification();
        console.log("🔔 알림 데이터 로드:", data);
        const reverseData = [...data].reverse();
        setAlarm(reverseData);
        alarmRef.current = reverseData; // ✅ 최신 `alarm`을 `useRef`에 저장
      } catch (error) {
        console.error("❌ 알림 데이터를 불러오는 중 오류 발생:", error);
      }
    };

    loadAlarms();

    return () => {
      console.log("👋 페이지를 떠남! 알림 상태 초기화 또는 정리");

      // ✅ 최신 `alarm`을 보장하기 위해 `useRef`에서 값 가져오기
      const notificationIds = Array.isArray(alarmRef.current)
        ? alarmRef.current.map((item) => item.notificationId)
        : [];

      console.log("📌 전송할 notificationIds:", notificationIds);

      if (notificationIds.length > 0) {
        axiosReadNotification(notificationIds);
      }
    };
  }, []);

  return (
    <>
      <TopNavigationBar title="알림" />
      <ListView data={alarm} CardComponent={CardNotification} />
    </>
  );
}
