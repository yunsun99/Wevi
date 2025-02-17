import { atom } from "recoil";

export const questionIndexState = atom({
  key: "questionIndexState",
  default: 0,
});

export const plannerState = atom({
  key: "formDataState",
  default: {
    location: "",
    venueType: "",
    budget: "",
    venueStyle: "",
    studioStyle: "",
    dressStyle: "",
    makeupStyle: "",
  },
});

export const AIquestions = [
  "지금부터 제가 하는 질문에 답하시면 예식장, 스드메를 추천해드릴게요!", // 1번 (자동 2초 후 다음)
  "우선, 지역은 어디가 좋으신가요? (ex. 서울시 ㅇㅇ구)",
  "예식장은 실내 / 야외 중 어떤 것이 좋으신가요? (ex. 실내)",
  "생각해둔 전체 예산이 있으신가요?",
  "그럼 이제부턴 원하시는 분위기를 알아볼게요.", // 5번 (자동 2초 후 다음)
  "예식장 분위기는 어떤게 좋으세요? 1. 우아 2. 화려 3. 수수 4. ???",
  "스튜디오 분위기는 어떤게 좋으세요? 1. 우아 2. 화려 3. 수수 4. ???",
  "드레스 분위기는 어떤게 좋으세요? 1. 우아 2. 화려 3. 수수 4. ???",
  "헤어/메이크업 분위기는 어떤게 좋으세요? 1. 우아 2. 화려 3. 수수 4. ???",
];
