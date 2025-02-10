import { atom } from "recoil";

export const userState = atom({
  key: "userState",
  default: {
    key: false,
    code: null,
  },
});

export const signupState = atom({
  key: "signupState",
  default: {
    email: "",
    nickname: "",
    name: "",
    password: "",
    phone: "",
    zonecode: "",
    autoRoadAddress: "tmp",
    addressDetail: "",
  },
});
