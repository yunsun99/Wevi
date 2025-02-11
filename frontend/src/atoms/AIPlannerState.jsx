import { atom } from "recoil";

export const plannerState = atom({
  key: "plannerState",
  default: {
    location: "",
    inoutSide: "",
    price: "",
    hall: "",
    studio: "",
    dress: "",
    makeUp: "tmp",
  },
});

import example_weddinghall from "@/assets/example_weddinghall.png";

const data = [
  {
    id: 1,
    category: "웨딩홀",
    title: "웨스턴베니비스",
    date: "2025년 5월 25일",
    price: "19,420,000원",
    tags: "#화려함 #웅장함 #주차장",
    image: example_weddinghall,
  },
  {
    id: 2,
    category: "메이크업",
    title: "마리앙끌레르",
    date: "2025년 5월 25일",
    price: "1,280,000원",
    tags: "#수수함 #고급진 #친절함",
    image: example_weddinghall,
  },
  {
    id: 3,
    category: "드레스",
    title: "에비뉴 준호",
    date: "2025년 5월 25일",
    price: "3,720,000원",
    tags: "#독특함 #친절함 #밝은",
    image: example_weddinghall,
  },
  {
    id: 4,
    category: "드레스",
    title: "에비뉴 준호",
    date: "2025년 5월 25일",
    price: "3,720,000원",
    tags: "#독특함 #친절함 #밝은",
    image: example_weddinghall,
  },
  {
    id: 5,
    category: "드레스",
    title: "에비뉴 준호",
    date: "2025년 5월 25일",
    price: "3,720,000원",
    tags: "#독특함 #친절함 #밝은",
    image: example_weddinghall,
  },
];
