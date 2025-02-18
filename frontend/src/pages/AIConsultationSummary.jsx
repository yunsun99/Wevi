import { useState, useEffect } from "react";
import TopNavigationBar from "@/components/Navigators/TopNavigationBar2";
import BottomNavigationBar from "@/components/Navigators/BottomNavigationBar";

export default function AIConsultationSummary() {
  const [summaryData, setSummaryData] = useState(null);

  const responseData = {
    status: 200,
    success: true,
    message: "Audio summary status founded successfully.",
    data: [
      {
        loginUserId: 1,
        scheduleId: 1,
        scheduleTitle: "웨딩 촬영 상담",
        categoryId: 2,
        categoryName: "studio",
        audioSummaryId: 1,
        status: "COMPLETED",
        summaryResult:
          '{\n         "날짜": "20/05/24 14:00",\n         "업체명": "박성근 웨딩홀",\n         "홀명": "컨벤션홀",\n         "위치": "정보 없음",\n         "가능 날짜": "2024년 5월 20일 가능",\n         "홀_유형": "컨벤션홀",\n         "최대인원": "300명",\n         "대관료": "200만 원",\n         "예식_방식": "단독홀",\n         "식사_형태": "뷔페",\n         "1인당_식사_비용": "5만원",\n         "최소_보장_인원": "200명",\n         "포함_서비스": ["플라워 장식", "조명 연출"],\n         "계약금": "50만 원",\n         "환불_규정": "1개월 전 100% 환불, 2주 전 50% 환불",\n         "기타사항": ["주차 100대 무료", "평일 예식 10% 할인", "3개월 내 계약시 대관료 10% 할인"]\n     }',
      },
    ],
  };

  useEffect(() => {
    if (
      !responseData.data.length ||
      responseData.data[0].summaryResult === "파싱 오류"
    ) {
      console.log("❌ SummaryResult가 없습니다.");
      return;
    }

    console.log("✅ SummaryResult 있음");
    const parsedData = JSON.parse(responseData.data[0].summaryResult);
    console.log(parsedData);
    setSummaryData(parsedData); // ✅ useState를 사용해 상태 업데이트
  }, []);

  return (
    <>
      <TopNavigationBar title="AI 상담 요약" />
      {summaryData ? (
        <>
          <div>{summaryData["1인당_식사_비용"]}</div>
          <div>{summaryData["가능 날짜"]}</div>
          <div>{summaryData["계약금"]}</div>
          <div>{summaryData["기타사항항"]}</div>
          <div>{summaryData["날짜"]}</div>
          <div>{summaryData["대관료"]}</div>
          <div>{summaryData["식사_형태"]}</div>
          <div>{summaryData["업체명"]}</div>
          <div>{summaryData["예식_방식"]}</div>
          <div>{summaryData["위치"]}</div>
          <div>{summaryData["최대인원"]}</div>
          <div>{summaryData["최소_보장_인원"]}</div>
          <div>{summaryData["포함_서비스"]}</div>
          <div>{summaryData["홀_유형"]}</div>
          <div>{summaryData["홀명"]}</div>
          <div>{summaryData["환불_규정"]}</div>
        </>
      ) : (
        <span>데이터 없음</span>
      )}
      <BottomNavigationBar />
    </>
  );
}
