import axios from "axios";
import { api } from "./auth";

// 일정 정보 불러오기기
export async function getSchedules() {
  try {
    const response = await api.get("/api/schedules");
    if (response.status === 200) {
      // response.data.profileImage = logo;
      const data = response.data.data;
      return data;
    } else {
      return;
    }
  } catch (error) {
    return Promise.reject(error);
  }
}

// 예약리스트트 불러오기기
export async function getConsultationList() {
  try {
    const response = await api.get("/api/schedules/consultations");
    if (response.status === 200) {
      const data = response.data.data;
      console.log(data);
      return data;
    } else {
      return;
    }
  } catch (error) {
    console.log(error);
    return error.response ? error.response.status : 500;
  }
}

// 예약 정보 불러오기기
export async function getConsultationInfo(id) {
  try {
    const response = await api.get(`/api/schedules/consultation/${id}`);
    if (response.status === 200) {
      const data = response.data.data;
      return data;
    } else {
      return;
    }
  } catch (error) {
    console.log(error);
    return error.response ? error.response.status : 500;
  }
}

// 계약리스트트 불러오기기
export async function getContractList() {
  try {
    const response = await api.get("/api/schedules/contracts");
    if (response.status === 200) {
      const data = response.data.data;
      console.log(data);
      console.log("성공공");
      return data;
    } else {
      console.log("실패");
      return;
    }
  } catch (error) {
    console.log("대실패");
    console.log(error);
    return error.response ? error.response.status : 500;
  }
}

// 계약 정보 불러오기기
export async function getContractInfo(id) {
  try {
    const response = await api.get(`/api/schedules/contract/${id}`);
    if (response.status === 200) {
      const data = response.data.data;
      return data;
    } else {
      return;
    }
  } catch (error) {
    console.log(error);
    return error.response ? error.response.status : 500;
  }
}

// 계약 정보 불러오기기
export async function getProgressList() {
  try {
    const response = await api.get("/api/schedules/progress");
    if (response.status === 200) {
      const data = response.data.data;
      return data;
    } else {
      return;
    }
  } catch (error) {
    console.log(error);
    return error.response ? error.response.status : 500;
  }
}
