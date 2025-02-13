import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8080",
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
    console.log(error);
    return error.response ? error.response.status : 500;
  }
}

export async function emailCertification(email) {
  try {
    const response = await api.post(
      `/api/user/profile`,
      {
        email: email,
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.status;
  } catch (error) {
    console.log(error);
    return error.response ? error.response.status : 500;
  }
}

export async function handleSignUp(formData) {
  try {
    const jsonData = JSON.stringify(formData);
    console.log(formData);

    const response = await api.post(`/api/user/signup`, jsonData, {
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

// 인증 상태를 업데이트하는 함수
export const setupInterceptors = (setIsAuthenticated) => {
  api.interceptors.response.use(
    (response) => {
      console.log(response.status);
      return response;
    }, // 정상 응답 그대로 반환
    (error) => {
      if (error.response.status === 401 || error.response.status === 403) {
        console.log(error.response.status);
        setIsAuthenticated(false); // 로그아웃 처리
      }
      return Promise.reject(error);
    }
  );
};
