import axios from "axios";

const api = axios.create({
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
