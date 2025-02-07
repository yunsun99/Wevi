import { atom } from "recoil";

export const searchState = atom({
  key: "searchState",
  default: {
    selectedCategory: "웨딩홀",
  },
});
