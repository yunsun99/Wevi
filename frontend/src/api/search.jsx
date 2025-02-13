import axios from "axios";
import { api } from "./auth";

export async function getSearchData(data) {
  try {
    // // 경로 수정 필요
    // const response = await api.post(`/api/auth/login`, data, {
    //   headers: {
    //     "Content-Type": "multipart/form-data",
    //   },
    // });
    // if (response.status === 200) {
    //   return response.data;
    // } else {
    //   return;
    // }
    // console.log(data);
    if (data.searchText === "아") {
      return [services[data.category][0]];
    }
    return services[data.category];
  } catch (error) {
    console.log(error);
    return error.response ? error.response.status : 500;
  }
}

import example_weddinghall from "@/assets/example_weddinghall.png";
import example_dress from "@/assets/backgroundImages/dress.png";

const services = {
  weddinghall: [
    {
      id: 1,
      name: "웨스턴 베니비스 영등포",
      region: "서울시 강남구 선릉로 757",
      priceRange: "12,441,000원 ~ 37,128,000원",
      image: example_weddinghall,
    },
    {
      id: 2,
      name: "압구정 스튜디오",
      region: "서울시 강남구 선릉로 757",
      priceRange: "12,441,000원 ~ 37,128,000원",
      image: example_weddinghall,
    },
  ],
  dress: [
    {
      id: 1,
      name: "웨스턴 베니비스 영등포",
      region: "서울시 강남구 선릉로 757",
      priceRange: "12,441,000원 ~ 37,128,000원",
      image: example_dress,
    },
    {
      id: 2,
      name: "압구정 스튜디오",
      region: "서울시 강남구 선릉로 757",
      priceRange: "12,441,000원 ~ 37,128,000원",
      image: example_dress,
    },
  ],
  makeup: [
    {
      id: 1,
      name: "웨스턴 베니비스 영등포",
      region: "서울시 강남구 선릉로 757",
      priceRange: "12,441,000원 ~ 37,128,000원",
      image: example_dress,
    },
    {
      id: 2,
      name: "압구정 스튜디오",
      region: "서울시 강남구 선릉로 757",
      priceRange: "12,441,000원 ~ 37,128,000원",
      image: example_dress,
    },
  ],
};
