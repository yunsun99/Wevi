import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export async function handleLogin(email, password) {
  try {
    const formData = new FormData();
    formData.append("username", email);
    formData.append("password", password);

    // 로그인 요청
    const response = await api.post(`/api/auth/login`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true,
    });

    console.log("로그인 응답:", response.data);

    // 세션 쿠키가 유지되는지 확인
    console.log("현재 쿠키:", document.cookie);

    // API 호출에 Authorization 헤더 추가 (필요 시)
    // const response = await api.get("/api/user");

    console.log("리스폰스 데이터:", response.data);
    return response.status;
  } catch (error) {
    console.log("에러 발생:", error.response?.data || error.message);
  }
}
