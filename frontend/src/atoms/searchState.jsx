import { atom, selector } from "recoil";

export const selectedCategoryState = atom({
  key: "selectedCategoryState",
  default: "weddinghall",
});

export const searchTextState = atom({
  key: "searchTextState",
  default: "",
});

export const searchDateState = atom({
  key: "searchDateState",
  default: {
    date: "",
    time: "",
  },
});

export const searchFilterState = atom({
  key: "searchFilterState",
  default: {
    sido: "",
    sigungu: "",
    price: "",
    inoutside: "",
  },
});

// 검색 결과 상태
export const searchResultsState = atom({
  key: "searchResultsState",
  default: [],
});

export const searchDetailState = atom({
  key: "searchDetailState",
  default: {
    selectedCategory: "informtaion",
    vendorSimpleInformation: "",
    vendorInformation: "",
    vendor360View: "",
    vendorMagazine: "",
    vendorOptionPrice: "",
    vendorVisitInformation: "",
    vendorBusinessInformation: "",
  },
});

export const searchDetailDateState = atom({
  key: "searchDetailDateState",
  default: {},
});
