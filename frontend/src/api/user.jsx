import axios from "axios";
import logo from "@/assets/logo.png";
import profileImage from "@/assets/characters/couple_link.png";
import { api } from "./auth";

// 마이페이지 정보 불러오기기
export async function getUserInfo() {
  try {
    const response = await api.get(`/api/customers`);
    if (response.status === 200) {
      response.data.profileImage = logo;
      const data = response.data.data;
      return data;
    } else {
      return {};
    }
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
}

// 커플연동 상태 불러오기
export async function getCoupleLinkState() {
  try {
    const response = await api.get(`/api/customers`);
    if (response.status === 200) {
      response.data.profileImage = logo;
      const data = response.data.data;
      console.log(data);
      return getLinkType(data);
    } else {
      return {};
    }
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
}

function getLinkType(data) {
  console.log(data);
  if (!data) return { type: -1 }; // 데이터가 없을 경우 예외 처리

  if (data.sentRequestId) {
    return { ...data, type: 1 }; // 기다리는 중
  } else if (data.receivedRequestId) {
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

// AI 상담 내역 파일 업로드드
export async function upLoadConsultation(file, scheduleId) {
  try {
    const formData = new FormData();
    formData.append("file", file); // 'file' 필드에 파일 추가

    const response = await api.post(`/api/ai/analyze/${scheduleId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (response.status === 200) {
      console.log(response.data);
      console.log(response.status);
      return response.data;
    } else {
      console.log(response.status);
      return {};
    }
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
}

// AI 상담 요약 전체 내역 조회
export async function getConsultationAnalyzeInfo() {
  try {
    const response = await api.get(`/api/ai/analyze`);
    console.log(response.status);
    if (response.status === 200) {
      const data = response.data.data;
      console.log(data);
      return data;
    } else {
      return {};
    }
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
}
