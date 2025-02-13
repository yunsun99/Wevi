import { atom } from "recoil";

export const vendorState = atom({
  key: "vendorState",
  default: {
    vendorId: "",
    reviews: [],
  },
});
