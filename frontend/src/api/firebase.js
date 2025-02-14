import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { useRecoilState } from "recoil";
import { isNotificationState } from "../atoms/notificationState";

export const firebaseConfig = {
  apiKey: import.meta.env.VITE_APIKEY,
  authDomain: import.meta.env.VITE_AUTHDOMAIN,
  projectId: import.meta.env.VITE_PROJECTID,
  storageBucket: import.meta.env.VITE_STORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGINGSENDERID,
  appId: import.meta.env.VITE_APPID,
  measurementId: import.meta.env.VITE_MEASUREMENTID,
};

export const vapidKey = import.meta.env.VITE_VAPIDKEY;

const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);

// FCM 토큰 가져오기
export const requestFCMToken = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      const token = await getToken(messaging, {
        vapidKey: vapidKey,
      });
      console.log("FCM Token:", token);
      console.log("가가");
      return token;
    } else {
      console.log("Notification permission denied");
      return null;
    }
  } catch (error) {
    console.error("Error getting FCM token:", error);
    return null;
  }
};

// ✅ 포그라운드 메시지 수신
export const onForegroundMessage = (callback) => {
  onMessage(messaging, (payload) => {
    console.log("포그라운드 메시지 수신:", payload);
    if (callback) callback(payload);
  });
};

// ✅ 서비스 워커 등록 (Recoil 상태 업데이트는 컴포넌트에서 처리)
export const registerServiceWorker = async () => {
  if ("serviceWorker" in navigator) {
    try {
      const registration = await navigator.serviceWorker.register(
        "/firebase-messaging-sw.js"
      );
      console.log("Service Worker 등록 성공:", registration);
      return registration;
    } catch (error) {
      console.error("Service Worker 등록 실패:", error);
      throw error;
    }
  } else {
    console.error("Service Worker가 브라우저에서 지원되지 않습니다.");
  }
};
