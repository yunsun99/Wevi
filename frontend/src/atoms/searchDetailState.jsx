import { atom } from "recoil";

export const searchDetailState = atom({
  key: "searchDetailState",
  default: {
    selectedCategory: "informtaion",
    vendorSimpleInformation:"",
    vendorInformation:"",
    vendor360View:"",
    vendorMagazine:"",
    vendorOptionPrice:"",
    vendorVisitInformation:"",
    vendorBusinessInformation:"",
  },
});
