import { atom } from "recoil";

export const notificationState = atom({
  key: "notificationState",
  default: {
    selectedCategory: "웨딩홀",
  },
});

export const isNotificationState = atom({
  key: "isNotiicationState",
  default: false,
});
