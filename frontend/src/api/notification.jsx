import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true,
});

export async function axiosNotification() {
  try {
    // const response = await api.get(`/api/auth/login`, {
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // });

    return data;
  } catch (error) {
    console.log(error);
    return error.response ? error.response.status : 500;
  }
}

const data = [
  {
    notificationId: 1,
    userId: 1,
    message: "2025년 12월 2일 예식장 리허설",
    vendor: "더채플앳청담_강남",
    type: 5,
    createdAt: "2025-12-02", // ✅ 2025-12-02 (Unix Timestamp, ms 단위)
  },
  {
    notificationId: 2,
    userId: 2,
    message: "2025년 2월 25일 2시 계약",
    vendor: "더채플앳청담_강남",
    type: 4,
    createdAt: "2024-08-30", // ✅ 2024-08-30
  },
  {
    notificationId: 3,
    userId: 3,
    message: "2025년 2월 25일 2시 상담",
    vendor: "더채플앳청담_강남",
    type: 3,
    createdAt: "2025-02-25", // ✅ 2025-02-25
  },
  {
    notificationId: 4,
    userId: 4,
    message: "하트 딩딩",
    vendor: "",
    type: 1,
    createdAt: "2024-05-02", // ✅ 2024-05-02
  },
  {
    notificationId: 5,
    userId: 4,
    message: "수락",
    vendor: "",
    type: 2,
    createdAt: "2024-05-02", // ✅ 2024-05-02
  },
];
