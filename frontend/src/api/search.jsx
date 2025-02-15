import axios from "axios";
import { api } from "./auth";

export async function getSearchData(data) {
  const reqData = filterData(data);
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
      console.log(response.data.data.content);
      return response.data.data.content;
    } else {
      return;
    }
  } catch (error) {
    console.log(error);
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
    doId: data.searchFilter.sido, // sido → doId
    sigunguId: data.searchFilter.sigungu, // sigungu → sigunguId
    categoryId: categoryMap[data.category] || null, // category → categoryId (매핑된 숫자)
    // searchDate: data.searchDate, // 날짜 및 시간 그대로 유지
    vendorName: data.searchText, // 검색어 그대로 유지
  };

  if (data.searchFilter.inoutside === "inside") {
    transformedData.isIndoor = true;
  } else if (data.searchFilter.inoutside === "outside") {
    transformedData.isIndoor = false;
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
    const response = await api.get("http://localhost:8080/api/vendors/dolist");
    if (response.data.success) {
      return response.data.data;
    }
  } catch (error) {
    console.error("시도 목록 불러오기 실패:", error);
    return [];
  }
}

// 시군구 데이터 수집
export async function axiosSigunguData(selectedDoId) {
  try {
    const response = await api.get(
      `http://localhost:8080/api/vendors/sigungulist/${selectedDoId}`
    );
    if (response.data.success) {
      return response.data.data;
    }
  } catch (error) {
    console.error("시군구 목록 불러오기 실패:", error);
    setSigunguList([]);
  }
}
