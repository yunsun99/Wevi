import axios from "axios";
import { api } from "./auth";

// 예약 정보 불러오기기
export async function getConsultationInfo(url) {
  try {
    // const response = await api.get(url);
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
export async function getContractInfo(url) {
  try {
    // const response = await api.get(url);
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
