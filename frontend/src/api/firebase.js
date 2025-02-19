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
  const unsubscribe = onMessage(messaging, (payload) => {
    console.log("포그라운드 메시지 수신:", payload);
    if (callback) callback(payload);
  });

  return unsubscribe;
};

// ✅ 서비스 워커 등록 (Recoil 상태 업데이트는 컴포넌트에서 처리)
let isServiceWorkerRegistered = false; // 중복 방지 플래그

export const registerServiceWorker = async () => {
  if (!("serviceWorker" in navigator)) {
    console.error("❌ 서비스 워커가 지원되지 않습니다.");
    return;
  }

  if (isServiceWorkerRegistered) return; // 이미 등록된 경우 중복 방지
  isServiceWorkerRegistered = true;

  try {
    const registration = await navigator.serviceWorker.register(
      "/firebase-messaging-sw.js"
    );
    console.log("✅ 서비스 워커 등록 성공:", registration);
  } catch (error) {
    console.error("❌ 서비스 워커 등록 실패:", error);
  }
};
