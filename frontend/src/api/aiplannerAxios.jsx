import { useRecoilState } from "recoil";
import { api } from "./auth";
import { plannerState } from "../atoms/AIPlannerState";

// AI 플래너 추천 요청
export async function requestAIplanner(formData) {
  try {
    // ✅ 서버에 맞는 데이터 형식으로 변환
    const payload = {
      weddingHallRequest: formData.venueStyle || "아무거나", // YYYY-MM-DD 형식
      studioRequest: formData.studioStyle || "아무거나", // HH:mm 형식
      dressRequest: formData.dressStyle || "아무거나", // 고정된 타이틀
      makeUpRequest: formData.makeupStyle || "아무거나", // 기본 요청사항
    };
    // console.log(payload);
    // console.log("📡 Sending Data:", payload); // ✅ 디버깅 로그

    // ✅ API 요청
    const response = await api.post(`/api/ai/recommend`, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    // console.log("✅ 플래너 요청 성공:", response);

    return response.data.data; // 성공 시 응답 코드 반환 (200)
  } catch (error) {
    // console.error("❌ 플래너 요청 실패:", error);
    return 400; // 오류 코드 반환
  }
}
