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
    return Promise.reject(error);
  }
}

// 예약 취소하기
export async function cancelReservation(scheduleId) {
  try {
    const response = await api.delete(
      `/api/schedules/consultation/${scheduleId}`
    );
    if (response.status === 200) {
      console.log("예약 취소 성공", response.data);
      return true; // 성공 시 true 반환
    } else {
      console.log("예약 취소 실패");
      return false;
    }
  } catch (error) {
    console.error("예약 취소 요청 실패", error);
    return error.response ? error.response.status : 500;
  }
}

// 예약가능 날짜 조회하기
export async function getAvailableDates({ vendorId, year, month }) {
  try {
    const response = await api.get(
      `api/vendors/consultation/available-dates?vendorId=${vendorId}&year=${year}&month=${month}`
    );
    if (response.status === 200) {
      const data = response.data.data;
      console.log("성공공");
      return data;
    } else {
      console.log("실패");

      return;
    }
  } catch (error) {
    console.log("대대실패");

    console.log(error);
    return error.response ? error.response.status : 500;
  }
}

// 예약 가능 시간조회하기기
export async function getAvailableTimes({ vendorId, year, month, day }) {
  try {
    const response = await api.get(
      `api/vendors/consultation/available-times?vendorId=${vendorId}&year=${year}&month=${month}&day=${day}`
    );
    if (response.status === 200) {
      const data = response.data.data;
      console.log("성공공");
      return data;
    } else {
      console.log("실패");

      return;
    }
  } catch (error) {
    console.log("대대실패");

    console.log(error);
    return error.response ? error.response.status : 500;
  }
}

// 예약등록하기
export async function addConsultation({ selectedDate, request, vendorId }) {
  try {
    // ✅ 서버에 맞는 데이터 형식으로 변환
    const payload = {
      startDate: selectedDate.date, // YYYY-MM-DD 형식
      startTime: selectedDate.time, // HH:mm 형식
      title: "상담 예약", // 고정된 타이틀
      request: request || "", // 기본 요청사항
      vendorId: Number(vendorId), // 웨딩홀 ID
    };
    // console.log(payload);
    // console.log("📡 Sending Data:", payload); // ✅ 디버깅 로그

    // ✅ API 요청
    const response = await api.post(
      `/api/schedules/consultation/add`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("✅ 예약 성공:", response);
    return response.data.status; // 성공 시 응답 코드 반환 (200)
  } catch (error) {
    console.error("❌ 예약 실패:", error);
    return 400; // 오류 코드 반환
  }
}
