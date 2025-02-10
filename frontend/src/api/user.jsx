import axios from "axios";
import logo from "@/assets/logo.png";

const api = axios.create({
  baseURL: "http://localhost:8080",
  "Content-Type": "application/json",
  withCredentials: true,
});

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

    return data;
  } catch (error) {
    console.log(error);
    return error.response ? error.response.status : 500;
  }
}

const data = {
  userId: 1,
  email: "test@test.com",
  nickname: "박성근짱캡",
  name: "박성근",
  profileImage: logo,
  spouseId: "",
};
