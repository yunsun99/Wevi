import { atom } from "recoil";
import dayjs from "dayjs"; // 날짜 변환 라이브러리

export const scheduleState = atom({
  key: "scheduleState",
  default: {
    date: dayjs().format("YYYY-MM-DD"), // 현재 날짜를 "YYYY-MM-DD" 형식으로 변환
  },
});
