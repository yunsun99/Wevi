import { atom } from "recoil";

export const userState = atom({
  key: "userState",
  default: {
    key: false,
    code: null,
  },
});

export const isAuthenticatedState = atom({
  key: "isAuthenticatedState",
  default: true, // 기본값: 로그인 상태로 가정
});

export const signupState = atom({
  key: "signupState",
  default: {
    email: "",
    nickname: "",
    name: "",
    password: "",
    phone: "",
    zonecode: "tmp",
    autoRoadAddress: "tmp",
    addressDetail: "tmp",
  },
});

export const initialFormData = {
  email: "",
  nickname: "",
  name: "",
  password: "",
  phone: "",
  zonecode: "tmp",
  autoRoadAddress: "tmp",
  addressDetail: "tmp",
};
