import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

export const firebaseConfig = {
  apiKey: "AIzaSyAy3EbUT1eN3wThLG8Yv2JXYv-wpSonvek",
  authDomain: "wevi-9131d.firebaseapp.com",
  projectId: "wevi-9131d",
  storageBucket: "wevi-9131d.firebasestorage.app",
  messagingSenderId: "857264428936",
  appId: "1:857264428936:web:caf47a27fc0fe532ca8c3d",
  measurementId: "G-456SWCDR59",
};

export const vapidKey =
  "BJ0a9VYPiJM0jbJ05HSlzy-OruFo2jZ58OnUUWe3YjVm22mgtonBpOkSCaZ59RIKQ_IIC0rHKBLmDVuDxNJ2jSY";

const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);

// FCM 토큰 가져오기
export const requestFCMToken = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      const token = await getToken(messaging, {
        vapidKey:
          "BJ0a9VYPiJM0jbJ05HSlzy-OruFo2jZ58OnUUWe3YjVm22mgtonBpOkSCaZ59RIKQ_IIC0rHKBLmDVuDxNJ2jSY",
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
