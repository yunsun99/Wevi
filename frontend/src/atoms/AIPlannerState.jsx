import { atom } from "recoil";

export const questionIndexState = atom({
  key: "questionIndexState",
  default: 0,
});

export const plannerState = atom({
  key: "formDataState",
  default: {
    venueStyle: "",
    studioStyle: "",
    dressStyle: "",
    makeupStyle: "",
  },
});

export const AIquestions = [
  "원하시는 분위기를 알려주세요", // 5번 (자동 2초 후 다음)
  "예식장 분위기는 어떤게 좋으세요?",
  "스튜디오 분위기는 어떤게 좋으세요?",
  "드레스 분위기는 어떤게 좋으세요?",
  "헤어/메이크업 분위기는 어떤게 좋으세요?",
];
