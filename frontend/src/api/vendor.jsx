import axios from "axios";
import { api } from "./auth";

export async function getVendorInfo(vendorId) {
  try {
    const response = await api.get(`/api/vendors/${vendorId}`);
    if (response.status === 200) {
      const data = response.data.data;
      console.log(data);
      return data;
    } else {
      return;
    }
  } catch (error) {
    console.log(error);
    return error.response ? error.response.status : 500;
  }
}

export async function getVendorReviews(vendorId) {
  try {
    const response = await api.get(`/api/vendors/${vendorId}/reviews`);
    if (response.status === 200) {
      const data = response.data.data;
      console.log(data);
      return data;
    } else {
      return;
    }
  } catch (error) {
    console.log(error);
    return error.response ? error.response.status : 500;
  }
}

export async function addVendorReview(vendorId, reviewData) {
  try {
    const response = await api.post(
      `/api/vendors/${vendorId}/reviews`,
      reviewData
    );
    if (response.status === 200) {
      console.log("리뷰 등록 성공:", response.data);
      return response.data;
    }
  } catch (error) {
    console.error("리뷰 등록 실패:", error);
    return error.response ? error.response.status : 500;
  }
}
