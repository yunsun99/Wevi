import { atom } from "recoil";

export const searchState = atom({
  key: "searchState",
  default: {
    selectedCategory: "weddinghall",
    inoutside: "",
    price: "",
    region: "",
    subarea: "",
    date: "",
    time: "",
  },
});
