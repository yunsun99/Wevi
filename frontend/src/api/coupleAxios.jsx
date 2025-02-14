import { api } from "./auth";

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
