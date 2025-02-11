import axios from "axios";
import logo from "@/assets/logo.png";
import profileImage from "@/assets/characters/couple_link.png";

const api = axios.create({
  baseURL: "http://localhost:8080",
  "Content-Type": "application/json",
  withCredentials: true,
});

// 마이페이지 정보 불러오기기
export async function getUserInfo() {
  try {
    // const response = await api.get(`/api/customers`);
    // if (response.status === 200) {
    //   response.data.profileImage = logo;
    //   const data = response.data;
    //   return data;
    // } else {
    //   return;
    // }

    return mypageData;
  } catch (error) {
    console.log(error);
    return error.response ? error.response.status : 500;
  }
}

// 커플연동 상태 불러오기
export async function getCoupleLinkState() {
  try {
    // const response = await api.get(`/api/customers`);
    // if (response.status === 200) {
    //   response.data.profileImage = logo;
    //   const data = response.data;
    //   return data;
    // } else {
    //   return;
    // }
    const linkData = getLinkType(mypageData);
    return linkData;
  } catch (error) {
    console.log(error);
    return error.response ? error.response.status : 500;
  }
}

function getLinkType(data) {
  if (!data) return { type: -1 }; // 데이터가 없을 경우 예외 처리

  if (data.sentRequest !== undefined) {
    return { ...data, type: 1 }; // 기다리는 중
  } else if (data.receivedRequest !== undefined) {
    return { ...data, type: 2 }; // 수신자가 수락 또는 거절 가능
  } else {
    return { ...data, type: 0 }; // 커플 입력 창
  }
}

const mypageData = {
  userId: 1,
  email: "test@test.com",
  nickname: "박성근짱캡",
  name: "박성근",
  profileImage: logo,
  spouseId: 1,
  sentRequest: undefined,
  receivedRequest: 1,
  profileImage: profileImage,
};
