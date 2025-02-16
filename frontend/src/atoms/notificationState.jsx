import { atom } from "recoil";

export const notificationState = atom({
  key: "notificationState",
  default: {},
});

export const isNotificationState = atom({
  key: "isNotiicationState",
  default: false,
});
