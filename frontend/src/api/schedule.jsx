import axios from "axios";
// import logo from "@/assets/logo.png";

const api = axios.create({
  baseURL: "http://localhost:8080",
  "Content-Type": "application/json",
  withCredentials: true,
});

// 일정 정보 불러오기기
export async function getSchedules() {
  try {
    const response = await api.get("/api/schedules");
    if (response.status === 200) {
      // response.data.profileImage = logo;
      const data = response.data.data;
      return data;
    } else {
      return;
    }
  } catch (error) {
    console.log(error);
    return error.response ? error.response.status : 500;
  }
}

// 예약리스트트 불러오기기
export async function getConsultationList() {
  try {
    // const response = await api.get("/api/schedules/consultations");
    // if (response.status === 200) {
    //   // response.data.profileImage = logo;
    //   const data = response.data;
    //   return data;
    // } else {
    //   return;
    // }
    return consultationlist;
  } catch (error) {
    console.log(error);
    return error.response ? error.response.status : 500;
  }
}

// 예약 정보 불러오기기
export async function getConsultationInfo(id) {
  try {
    // const response = await api.get(`/api/schedules/consultation/${id}`);
    // if (response.status === 200) {
    //   // response.data.profileImage = logo;
    //   const data = response.data;
    //   return data;
    // } else {
    //   return;
    // }

    return consultationdata;
  } catch (error) {
    console.log(error);
    return error.response ? error.response.status : 500;
  }
}
// 계약 정보 불러오기기
export async function getContractInfo(id) {
  try {
    // const response = await api.get(`/api/schedules/contract/${id}`);
    // if (response.status === 200) {
    //   // response.data.profileImage = logo;
    //   const data = response.data;
    //   return data;
    // } else {
    //   return;
    // }

    return contractdata;
  } catch (error) {
    console.log(error);
    return error.response ? error.response.status : 500;
  }
}

const scheduledata = [
  {
    id: 1,
    startDate: "2025-02-10",
    startTime: "19:00",
    endDate: "2025-02-10",
    endTime: "21:00",
    title: "웨딩홀 점검",
    createdAt: null,
    updatedAt: null,
    dtype: "consultation",
    categoryName: "weddinghall",
    contractId: null,
    vendorName: "라벤더 웨딩홀",
  },
  {
    id: 4,
    startDate: "2025-02-10",
    startTime: "19:00",
    endDate: "2025-02-10",
    endTime: "21:00",
    title: "드레스 가봉",
    createdAt: null,
    updatedAt: null,
    dtype: "middle_process",
    categoryName: "dress",
    contractId: 2,
    vendorName: "라벤더 웨딩홀",
  },
  {
    id: 5,
    startDate: "2025-02-10",
    startTime: "19:00",
    endDate: "2025-02-10",
    endTime: "21:00",
    title: "사진셀렉 및 후보정",
    createdAt: null,
    updatedAt: null,
    dtype: "consultation",
    categoryName: "studio",
    contractId: null,
    vendorName: "라벤더 웨딩홀",
  },
  {
    id: 6,
    startDate: "2025-02-10",
    startTime: "19:00",
    endDate: "2025-02-10",
    endTime: "21:00",
    title: "헤어메이크업 계약",
    createdAt: null,
    updatedAt: null,
    dtype: "contract",
    categoryName: "hairmakeup",
    contractId: null,
    vendorName: "라벤더 웨딩홀",
  },
  {
    id: 2,
    startDate: "2025-02-15",
    startTime: "23:00",
    endDate: "2025-02-16",
    endTime: "01:00",
    title: "웨딩 계약",
    createdAt: null,
    updatedAt: null,
    dtype: "contract",
    categoryName: "weddinghall",
    contractId: null,
    vendorName: "라벤더 웨딩홀",
  },
  {
    id: 3,
    startDate: "2025-02-20",
    startTime: "22:00",
    endDate: "2025-02-21",
    endTime: "00:00",
    title: "기타 일정",
    createdAt: null,
    updatedAt: null,
    dtype: "other_schedule",
    categoryName: "weddinghall",
    contractId: null,
    vendorName: "라벤더 웨딩홀",
  },
  {
    id: 9,
    startDate: "2025-02-20",
    startTime: "22:00",
    endDate: "2025-02-21",
    endTime: "00:00",
    title: "중간과정",
    createdAt: null,
    updatedAt: null,
    dtype: "middle_process",
    categoryName: "weddinghall",
    contractId: 1,
    vendorName: "라벤더 웨딩홀",
  },
];

const consultationlist = [
  {
    id: 1,
    startDate: "2025-02-10",
    startTime: "19:00",
    endDate: "2025-02-10",
    endTime: "21:00",
    title: "웨딩 촬영 상담",
    createdAt: null,
    updatedAt: null,
    categoryId: 2,
    categoryName: "dress",
    request: "드레스 선택과 메이크업 상담을 원합니다.",
    customerId: 1,
    customerName: "김싸피",
    customerPhone: "010-1234-5678",
    vendorId: 2,
    vendorName: "라벤더 웨딩홀",
    vendorAutoRoadAddress: "서울특별시 서초구 강남대로 123",
    vendorPhone: "02-1234-5678",
  },
  {
    id: 5,
    startDate: "2025-02-10",
    startTime: "19:00",
    endDate: "2025-02-10",
    endTime: "21:00",
    title: "웨딩 촬영 상담",
    createdAt: null,
    updatedAt: null,
    categoryId: 2,
    categoryName: "studio",
    request: "드레스 선택과 메이크업 상담을 원합니다.",
    customerId: 1,
    customerName: "김싸피",
    customerPhone: "010-1234-5678",
    vendorId: 2,
    vendorName: "라벤더 웨딩홀",
    vendorAutoRoadAddress: "서울특별시 서초구 강남대로 123",
    vendorPhone: "02-1234-5678",
  },
  {
    id: 6,
    startDate: "2025-02-10",
    startTime: "19:00",
    endDate: "2025-02-10",
    endTime: "21:00",
    title: "웨딩 촬영 상담",
    createdAt: null,
    updatedAt: null,
    categoryId: 2,
    categoryName: "weddinghall",
    request: "드레스 선택과 메이크업 상담을 원합니다.",
    customerId: 1,
    customerName: "김싸피",
    customerPhone: "010-1234-5678",
    vendorId: 2,
    vendorName: "라벤더 웨딩홀",
    vendorAutoRoadAddress: "서울특별시 서초구 강남대로 123",
    vendorPhone: "02-1234-5678",
  },
  {
    id: 2,
    startDate: "2025-02-12",
    startTime: "19:00",
    endDate: "2025-02-10",
    endTime: "21:00",
    title: "웨딩 촬영 상담",
    createdAt: null,
    updatedAt: null,
    categoryId: 2,
    categoryName: "hairmakeup",
    request: "드레스 선택과 메이크업 상담을 원합니다.",
    customerId: 1,
    customerName: "김싸피",
    customerPhone: "010-1234-5678",
    vendorId: 2,
    vendorName: "라벤더 웨딩홀",
    vendorAutoRoadAddress: "서울특별시 서초구 강남대로 123",
    vendorPhone: "02-1234-5678",
  },
  {
    id: 3,
    startDate: "2025-02-10",
    startTime: "19:00",
    endDate: "2025-02-10",
    endTime: "21:00",
    title: "웨딩 촬영 상담",
    createdAt: null,
    updatedAt: null,
    categoryId: 2,
    categoryName: "hairmakeup",
    request: "드레스 선택과 메이크업 상담을 원합니다.",
    customerId: 1,
    customerName: "김싸피",
    customerPhone: "010-1234-5678",
    vendorId: 2,
    vendorName: "라벤더 웨딩홀",
    vendorAutoRoadAddress: "서울특별시 서초구 강남대로 123",
    vendorPhone: "02-1234-5678",
  },
  {
    id: 12,
    startDate: "2025-02-20",
    startTime: "22:00",
    endDate: "2025-02-21",
    endTime: "00:00",
    title: "웨딩홀 상담",
    createdAt: null,
    updatedAt: null,
    categoryId: 1,
    categoryName: "dress",

    request: "메이크업 해줘잉.",
    customerId: 1,
    customerName: "김싸피",
    customerPhone: "010-1234-5678",
    vendorId: 2,
    vendorName: "라벤더 웨딩홀",
    vendorAutoRoadAddress: "서울특별시 서초구 강남대로 123",
    vendorPhone: "02-1234-5678",
  },
];

const consultationdata = {
  id: 1,
  startDate: "2025-02-10",
  startTime: "19:00",
  endDate: "2025-02-10",
  endTime: "21:00",
  title: "웨딩 촬영 상담",
  createdAt: null,
  updatedAt: null,
  request: "드레스 선택과 메이크업 상담을 원합니다.",
  customerId: 1,
  customerName: "정윤선",
  customerPhone: "01012345678",
  vendorId: 2,
  vendorName: "라벤더 웨딩홀",
  vendorAutoRoadAddress: "서울특별시 서초구 강남대로 123",
  vendorPhone: "02-1234-5678",
};

const contractdata = {
  id: 2,
  startDate: "2025-02-15",
  startTime: "23:00",
  endDate: "2025-02-16",
  endTime: "01:00",
  title: "웨딩 계약",
  createdAt: "2025-02-16T01:00:00",
  updatedAt: "2025-02-16T01:00:00",
  price: 5000000,
  contractDate: "2025-02-20T22:00:00",
  detail: "웨딩 촬영 및 드레스 대여 포함",
  customerId: 1,
  customerName: "정윤선",
  customerPhone: "010-1234-5678",
  vendorId: 2,
  vendorName: "영등포 웨딩샵",
  vendorAutoRoadAddress: "서울특별시 영등포구 여의대로 24",
  vendorPhone: "02-1234-5678",
};

/**
 * 
 * 일정전체체
    id: 9,
    startDate: "2025-02-20",
    startTime: "22:00",
    endDate: "2025-02-21",
    endTime: "00:00",
    title: "중간과정",
    createdAt: null,
    updatedAt: null,
    dtype: "middle_process",
    category: "weddinghall",
    contractId: 1,
    vendorName: "라벤더 웨딩홀",

  * 상담리스트
    id: 1,
    startDate: "2025-02-10",
    startTime: "19:00",
    endDate: "2025-02-10",
    endTime: "21:00",
    title: "웨딩 촬영 상담",
    createdAt: null,
    updatedAt: null,
    categoryId: 2,
    request: "드레스 선택과 메이크업 상담을 원합니다.",
    customerId: 1,
    customerName: "김싸피",
    customerPhone: "010-1234-5678",
    vendorId: 2,
    vendorName: "라벤더 웨딩홀",
    vendorAutoRoadAddress: "서울특별시 서초구 강남대로 123",
    vendorPhone: "02-1234-5678",
 */
