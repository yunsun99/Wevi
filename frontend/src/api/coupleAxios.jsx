import { api } from "./auth";

// 요청보내기
export async function axiosCoupleRequests(spouseEmail) {
  console.log(spouseEmail);
  try {
    const response = await api.post(
      `/api/couple-requests`,
      JSON.stringify(spouseEmail),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.status; // 성공 시 응답 코드 반환 (예: 200)
  } catch (error) {
    console.log(error);
    return error.response ? error.response.status : 500;
  }
}

// 요청 수락/거절절
export async function axiosCoupleReceive(status) {
  console.log(status);
  try {
    const response = await api.patch(
      `/api/couple-requests`,
      JSON.stringify({ status }),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.status; // 성공 시 응답 코드 반환 (예: 200)
  } catch (error) {
    console.log(error);
    return error.response ? error.response.status : 500;
  }
}

// 요청 취소
export async function axiosCoupleRequestDelete(coupleRequestId) {
  console.log(coupleRequestId);
  try {
    const response = await api.request({
      method: "DELETE", // ✅ DELETE 요청
      url: `/api/couple-requests/cancel`,
      data: { coupleRequestId }, // ✅ Request Body로 데이터 전송
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.status; // 성공 시 응답 코드 반환 (예: 200)
  } catch (error) {
    console.log(error);
    return error.response ? error.response.status : 500;
  }
}

// 연동 해제
export async function axiosCoupleDelete() {
  try {
    const response = await api.delete(`/api/couple-requests/disconnect`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.status; // 성공 시 응답 코드 반환 (예: 200)
  } catch (error) {
    console.log(error);
    return error.response ? error.response.status : 500;
  }
}
