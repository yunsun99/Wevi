import { atom } from "recoil";

export const userState = atom({
  key: "userState",
  default: {
    isLoggedIn: false,
    userData: JSON.parse(localStorage.getItem("user")) || null,
    code: 0,
  },
});
