import axios from "axios";
import { api } from "./auth";

export async function getSearchData(data) {
  const reqData = filterData(data);
  // console.log(data);
  // console.log(reqData);
  try {
    const response = await api.get(
      `/api/vendors/search`,
      {
        params: reqData,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200) {
      // console.log(response.data.data.content);
      return response.data.data.content;
    } else {
      return;
    }
  } catch (error) {
    // console.log(error);
    return error.response ? error.response.status : 500;
  }
}

const categoryMap = {
  weddinghall: 1,
  dress: 3,
  studio: 2,
  makeup: 4,
};

function filterData(data) {
  if (data.categoryDefault) {
    return { categoryId: categoryMap[data.categoryDefault] };
  }
  const transformedData = {
    categoryId: categoryMap[data.category] || null, // category → categoryId (매핑된 숫자)
    // searchDate: data.searchDate, // 날짜 및 시간 그대로 유지
    vendorName: data.searchText, // 검색어 그대로 유지
  };

  if (data.searchFilter.sido !== 0) {
    transformedData.doId = data.searchFilter.sido;
  }

  // ✅ sigunguId가 0이 아닐 경우에만 추가
  if (data.searchFilter.sigungu !== 0) {
    transformedData.sigunguId = data.searchFilter.sigungu;
  }
  if (data.searchDate.date) {
    [transformedData.year, transformedData.month, transformedData.day] =
      data.searchDate.date.split("-").map(Number);
  }
  if (data.searchFilter.inoutside === "inside") {
    transformedData.isIndoor = false;
  } else if (data.searchFilter.inoutside === "outside") {
    transformedData.isIndoor = true;
  }

  // if (data.searchFilter.price === "ASC") {
  //   transformedData.isIndoor = true;
  // } else if (data.searchFilter.inoutside === "outside") {
  //   transformedData.isIndoor = false;
  // }

  return transformedData;
}

// 시도 데이터 수집
export async function axiosSidoData() {
  try {
    const response = await api.get("/api/vendors/dolist");
    if (response.data.success) {
      return response.data.data;
    }
  } catch (error) {
    // console.error("시도 목록 불러오기 실패:", error);
    return [];
  }
}

// 시군구 데이터 수집
export async function axiosSigunguData(selectedDoId) {
  try {
    const response = await api.get(`/api/vendors/sigungulist/${selectedDoId}`);
    if (response.data.success) {
      return response.data.data;
    }
  } catch (error) {
    // console.error("시군구 목록 불러오기 실패:", error);
    setSigunguList([]);
  }
}
