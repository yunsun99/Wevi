importScripts(
  "https://www.gstatic.com/firebasejs/10.10.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.10.0/firebase-messaging-compat.js"
);

const firebaseConfig = {
  apiKey: "AIzaSyAy3EbUT1eN3wThLG8Yv2JXYv-wpSonvek",
  authDomain: "wevi-9131d.firebaseapp.com",
  projectId: "wevi-9131d",
  storageBucket: "wevi-9131d.firebasestorage.app",
  messagingSenderId: "857264428936",
  appId: "1:857264428936:web:caf47a27fc0fe532ca8c3d",
  measurementId: "G-456SWCDR59",
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  // self.registration.showNotification(payload.notification.title, {
  //   body: payload.notification.body,
  //   icon: "/LOGO.png",
  //   data: {
  //     url: payload.data?.click_action,
  //   },
  // });
});

self.addEventListener("notificationclick", (event) => {
  if (event.defaultPrevented) return; // 중복 방지
  event.preventDefault();
  console.log("수정안됨");
  event.notification.close();
  event.waitUntil(clients.openWindow("http://localhost:5173/notification"));
});
