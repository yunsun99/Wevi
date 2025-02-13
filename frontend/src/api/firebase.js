import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

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

// // 포그라운드에서 메시지 수신
// onMessage(messaging, (payload) => {
//   console.log("Message received: ", payload);
// });

// 포그라운드 메시지 수신
export const onForegroundMessage = (callback) => {
  onMessage(messaging, (payload) => {
    console.log("Message received: ", payload);
    if (callback) callback(payload);
  });
};

// 서비스 워커 등록 (백그라운드 메시지 수신용)
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/firebase-messaging-sw.js")
    .then((registration) => {
      console.log("Service Worker registered: ", registration);
    })
    .catch((error) => {
      console.error("Service Worker registration failed: ", error);
    });
}
