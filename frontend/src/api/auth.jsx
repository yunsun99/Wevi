import axios from "axios";
import { setRecoil } from "recoil-nexus";
import { isAuthenticatedState } from "../atoms/userState";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASEURL,
  withCredentials: true,
});

export async function handleLogin(email, password) {
  try {
    const formData = new FormData();
    formData.append("username", email);
    formData.append("password", password);

    const response = await api.post(`/api/auth/login`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.status; // 성공 시 응답 코드 반환 (예: 200)
  } catch (error) {
    alert("아이디와 비밀번호를 확인해주세요.");
    return error.response ? error.response.status : 500;
  }
}

export async function isEmailDuplicate(email) {
  if (!email || typeof email !== "string") {
    console.error("❌ 유효하지 않은 이메일 값:", email);
    return 400;
  }

  try {
    const response = await api.post(
      `/api/users/existEmail`,
      { email },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data.status;
  } catch (error) {
    console.error(
      "❌ API 요청 실패:",
      error.response ? error.response.data : error
    );
    return error.response ? error.response.status : 500;
  }
}

export async function sendEmail(email) {
  try {
    const response = await api.post(
      `/api/users/sendEmail`,
      {
        email,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (error) {
    console.log(error);
    return error.response ? error.response.status : 500;
  }
}

export async function verifyEmail(email, verificationCode) {
  console.log(email);
  console.log(verificationCode);
  try {
    const response = await api.post(
      `/api/users/verifyEmail`,
      {
        email,
        verificationCode,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (error) {
    console.log(error);
    return error.response ? error.response.status : 500;
  }
}

export async function handleSignUp(formData) {
  try {
    const jsonData = JSON.stringify(formData);
    console.log(formData);

    const response = await api.post(`/api/customers/signup`, jsonData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.status; // 성공 시 응답 코드 반환 (예: 200)
  } catch (error) {
    console.log(error);
    return error.response ? error.response.status : 500;
  }
}

export async function handleLogout() {
  try {
    const response = await api.post(`/api/auth/logout`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.status; // 성공 시 응답 코드 반환 (예: 200)
  } catch (error) {
    console.log(error);
    return error.response ? error.response.status : 500;
  }
}

export async function sendFCMToken(token) {
  try {
    const response = await api.post(`/api/users/fcm-token`, token, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.status;
  } catch (error) {
    console.log(error);
    return error.response ? error.response.status : 500;
  }
}

// 인터셉터 설정
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      setRecoil(isAuthenticatedState, false); // 로그아웃 처리
    }
    return Promise.reject(error);
  }
);
