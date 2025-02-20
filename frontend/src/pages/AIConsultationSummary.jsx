import { useState, useEffect } from "react";
import TopNavigationBar from "@/components/Navigators/TopNavigationBar2";
import BottomNavigationBar from "@/components/Navigators/BottomNavigationBar";
import { getConsultationAnalyzeInfo } from "../api/user";

export default function AIConsultationSummary() {
  const [summaryData, setSummaryData] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [showComparison, setShowComparison] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("weddinghall"); // 기본값: 전체 보기

  // const responseData = {
  //   status: 200,
  //   success: true,
  //   message: "Audio summary status founded successfully.",
  //   data: [
  //     {
  //       loginUserId: 1,
  //       scheduleId: 1,
  //       scheduleTitle: "웨딩홀 상담",
  //       categoryId: 1,
  //       categoryName: "weddinghall",
  //       audioSummaryId: 1,
  //       status: "COMPLETED",
  //       summaryResult:
  //         '{\n  "날짜": "20/05/24 14:00",\n  "업체명": "박성근 웨딩홀",\n  "홀명": "컨벤션홀",\n  "위치": "서울 강남구",\n  "가능 날짜": "2024년 5월 20일 가능",\n  "홀_유형": "컨벤션홀",\n  "최대인원": "300명",\n  "대관료": "200만 원",\n  "예식_방식": "단독홀",\n  "식사_형태": "뷔페",\n  "1인당_식사_비용": "5만원",\n  "최소_보장_인원": "200명",\n  "포함_서비스": ["플라워 장식", "조명 연출"],\n  "계약금": "50만 원",\n  "환불_규정": "1개월 전 100% 환불, 2주 전 50% 환불",\n  "기타사항": ["주차 100대 무료", "평일 예식 10% 할인", "3개월 내 계약시 대관료 10% 할인"]\n}',
  //     },
  //     {
  //       loginUserId: 1,
  //       scheduleId: 13,
  //       scheduleTitle: "웨딩홀 상담",
  //       categoryId: 1,
  //       categoryName: "weddinghall",
  //       audioSummaryId: 1,
  //       status: "COMPLETED",
  //       summaryResult:
  //         '{\n  "날짜": "20/05/24 14:00",\n  "업체명": "박성근 웨딩홀",\n  "홀명": "컨벤션홀",\n  "위치": "서울 강남구",\n  "가능 날짜": "2024년 5월 20일 가능",\n  "홀_유형": "컨벤션홀",\n  "최대인원": "300명",\n  "대관료": "200만 원",\n  "예식_방식": "단독홀",\n  "식사_형태": "뷔페",\n  "1인당_식사_비용": "5만원",\n  "최소_보장_인원": "200명",\n  "포함_서비스": ["플라워 장식", "조명 연출"],\n  "계약금": "50만 원",\n  "환불_규정": "1개월 전 100% 환불, 2주 전 50% 환불",\n  "기타사항": ["주차 100대 무료", "평일 예식 10% 할인", "3개월 내 계약시 대관료 10% 할인"]\n}',
  //     },
  //     {
  //       loginUserId: 1,
  //       scheduleId: 2,
  //       scheduleTitle: "웨딩홀 계약 상담",
  //       categoryId: 1,
  //       categoryName: "weddinghall",
  //       audioSummaryId: 2,
  //       status: "PROCESSING",
  //       summaryResult:
  //         '{\n  "날짜": "20/06/15 10:00",\n  "업체명": "라망 웨딩홀",\n  "홀명": "그랜드볼룸",\n  "위치": "서울 서초구",\n  "가능 날짜": "2024년 6월 30일 가능",\n  "홀_유형": "호텔식 홀",\n  "최대인원": "500명",\n  "대관료": "300만 원",\n  "예식_방식": "동시 예식",\n  "식사_형태": "한식 코스",\n  "1인당_식사_비용": "7만원",\n  "최소_보장_인원": "250명",\n  "포함_서비스": ["조명 연출", "생화 장식"],\n  "계약금": "70만 원",\n  "환불_규정": "1개월 전 100% 환불, 2주 전 50% 환불",\n  "기타사항": ["발렛 주차 제공", "신부 대기실 무료 제공"]\n}',
  //     },
  //     {
  //       loginUserId: 1,
  //       scheduleId: 3,
  //       scheduleTitle: "웨딩홀 투어",
  //       categoryId: 1,
  //       categoryName: "weddinghall",
  //       audioSummaryId: 3,
  //       status: "FAILED",
  //       summaryResult:
  //         '{\n  "날짜": "20/07/01 14:00",\n  "업체명": "스타 웨딩홀",\n  "홀명": "다이아몬드홀",\n  "위치": "서울 종로구",\n  "가능 날짜": "2024년 7월 10일 가능",\n  "홀_유형": "전통 예식 홀",\n  "최대인원": "250명",\n  "대관료": "150만 원",\n  "예식_방식": "단독홀",\n  "식사_형태": "한정식",\n  "1인당_식사_비용": "6만원",\n  "최소_보장_인원": "150명",\n  "포함_서비스": ["꽃 장식", "음향 시설"],\n  "계약금": "30만 원",\n  "환불_규정": "1개월 전 100% 환불, 2주 전 50% 환불",\n  "기타사항": ["야외 촬영 가능", "특별 할인 프로모션 제공"]\n}',
  //     },
  //     {
  //       loginUserId: 1,
  //       scheduleId: 4,
  //       scheduleTitle: "웨딩 스튜디오 촬영 상담",
  //       categoryId: 2,
  //       categoryName: "studio",
  //       audioSummaryId: 1,
  //       status: "PROCESSING",
  //       summaryResult:
  //         '{\n  "날짜": "20/06/10 10:00",\n  "업체명": "화이트 스튜디오",\n  "위치": "서울 강남구",\n  "촬영 유형": "야외 + 실내",\n  "의상 갯수": "3벌",\n  "촬영 시간": "4시간",\n  "앨범 포함 여부": "예",\n  "계약금": "30만 원",\n  "환불 규정": "2주 전 100% 환불, 1주 전 50% 환불",\n  "기타사항": ["보정본 제공", "드레스 대여 가능"]\n}',
  //     },
  //     {
  //       loginUserId: 1,
  //       scheduleId: 5,
  //       scheduleTitle: "스튜디오 촬영 예약",
  //       categoryId: 2,
  //       categoryName: "studio",
  //       audioSummaryId: 2,
  //       status: "COMPLETED",
  //       summaryResult:
  //         '{\n  "날짜": "20/07/01 15:00",\n  "업체명": "루미네 스튜디오",\n  "위치": "서울 서초구",\n  "촬영 유형": "실내 촬영",\n  "의상 갯수": "2벌",\n  "촬영 시간": "3시간",\n  "앨범 포함 여부": "아니오",\n  "계약금": "20만 원",\n  "환불 규정": "1주 전 100% 환불, 3일 전 50% 환불",\n  "기타사항": ["액자 제공", "신부전용 대기실 제공"]\n}',
  //     },
  //     {
  //       loginUserId: 1,
  //       scheduleId: 14,
  //       scheduleTitle: "스튜디오 촬영 예약",
  //       categoryId: 2,
  //       categoryName: "studio",
  //       audioSummaryId: 2,
  //       status: "COMPLETED",
  //       summaryResult:
  //         '{\n  "날짜": "20/07/01 15:00",\n  "업체명": "루미네 스튜디오",\n  "위치": "서울 서초구",\n  "촬영 유형": "실내 촬영",\n  "의상 갯수": "2벌",\n  "촬영 시간": "3시간",\n  "앨범 포함 여부": "아니오",\n  "계약금": "20만 원",\n  "환불 규정": "1주 전 100% 환불, 3일 전 50% 환불",\n  "기타사항": ["액자 제공", "신부전용 대기실 제공"]\n}',
  //     },
  //     {
  //       loginUserId: 1,
  //       scheduleId: 6,
  //       scheduleTitle: "야외 스냅 촬영",
  //       categoryId: 2,
  //       categoryName: "studio",
  //       audioSummaryId: 3,
  //       status: "FAILED",
  //       summaryResult:
  //         '{\n  "날짜": "20/07/15 13:00",\n  "업체명": "비쥬얼 스튜디오",\n  "위치": "서울 마포구",\n  "촬영 유형": "야외 스냅",\n  "의상 갯수": "1벌",\n  "촬영 시간": "2시간",\n  "앨범 포함 여부": "예",\n  "계약금": "25만 원",\n  "환불 규정": "2주 전 100% 환불, 1주 전 50% 환불",\n  "기타사항": ["헤어 & 메이크업 포함", "전문 포토그래퍼 배정"]\n}',
  //     },
  //     {
  //       loginUserId: 1,
  //       scheduleId: 7,
  //       scheduleTitle: "드레스 피팅 상담",
  //       categoryId: 3,
  //       categoryName: "dress",
  //       audioSummaryId: 1,
  //       status: "PROCESSING",
  //       summaryResult:
  //         '{\n  "날짜": "20/06/15 14:00",\n  "업체명": "로맨틱 드레스샵",\n  "위치": "서울 강남구",\n  "드레스 유형": "A라인, 머메이드",\n  "피팅 가능 개수": "5벌",\n  "렌탈 가격": "100만 원",\n  "맞춤 제작 여부": "가능",\n  "계약금": "30만 원",\n  "환불 규정": "2주 전 100% 환불, 1주 전 50% 환불",\n  "기타사항": ["베일 무료 제공", "신부 화관 대여 가능"]\n}',
  //     },
  //     {
  //       loginUserId: 1,
  //       scheduleId: 8,
  //       scheduleTitle: "웨딩 드레스 선택",
  //       categoryId: 3,
  //       categoryName: "dress",
  //       audioSummaryId: 2,
  //       status: "COMPLETED",
  //       summaryResult:
  //         '{\n  "날짜": "20/07/01 11:00",\n  "업체명": "엘레강스 드레스샵",\n  "위치": "서울 종로구",\n  "드레스 유형": "공주풍, 심플라인",\n  "피팅 가능 개수": "3벌",\n  "렌탈 가격": "120만 원",\n  "맞춤 제작 여부": "가능",\n  "계약금": "40만 원",\n  "환불 규정": "3주 전 100% 환불, 1주 전 50% 환불",\n  "기타사항": ["헤어 악세서리 포함", "드레스 보정 가능"]\n}',
  //     },
  //     {
  //       loginUserId: 1,
  //       scheduleId: 15,
  //       scheduleTitle: "웨딩 드레스 선택",
  //       categoryId: 3,
  //       categoryName: "dress",
  //       audioSummaryId: 2,
  //       status: "COMPLETED",
  //       summaryResult:
  //         '{\n  "날짜": "20/07/01 11:00",\n  "업체명": "엘레강스 드레스샵",\n  "위치": "서울 종로구",\n  "드레스 유형": "공주풍, 심플라인",\n  "피팅 가능 개수": "3벌",\n  "렌탈 가격": "120만 원",\n  "맞춤 제작 여부": "가능",\n  "계약금": "40만 원",\n  "환불 규정": "3주 전 100% 환불, 1주 전 50% 환불",\n  "기타사항": ["헤어 악세서리 포함", "드레스 보정 가능"]\n}',
  //     },
  //     {
  //       loginUserId: 1,
  //       scheduleId: 9,
  //       scheduleTitle: "드레스 촬영용 대여",
  //       categoryId: 3,
  //       categoryName: "dress",
  //       audioSummaryId: 3,
  //       status: "FAILED",
  //       summaryResult:
  //         '{\n  "날짜": "20/07/10 15:00",\n  "업체명": "뷰티 드레스 스튜디오",\n  "위치": "서울 마포구",\n  "드레스 유형": "빈티지, 심플라인",\n  "피팅 가능 개수": "4벌",\n  "렌탈 가격": "90만 원",\n  "맞춤 제작 여부": "불가능",\n  "계약금": "20만 원",\n  "환불 규정": "1개월 전 100% 환불, 2주 전 50% 환불",\n  "기타사항": ["드레스 촬영 패키지 할인 제공", "웨딩 슈즈 포함"]\n}',
  //     },
  //     {
  //       loginUserId: 1,
  //       scheduleId: 10,
  //       scheduleTitle: "메이크업 예약 상담",
  //       categoryId: 4,
  //       categoryName: "makeup",
  //       audioSummaryId: 1,
  //       status: "PROCESSING",
  //       summaryResult:
  //         '{\n  "날짜": "20/06/15 14:00",\n  "업체명": "뷰티 메이크업 스튜디오",\n  "위치": "서울 강남구",\n  "메이크업 스타일": "내추럴",\n  "헤어 스타일": "웨이브 업스타일",\n  "포함 서비스": ["스킨케어", "속눈썹 연장"],\n  "가격": "30만 원",\n  "계약금": "10만 원",\n  "환불 규정": "1주 전 100% 환불, 3일 전 50% 환불",\n  "기타사항": ["신부전용 드레싱룸 제공", "예약제 운영"]\n}',
  //     },
  //     {
  //       loginUserId: 1,
  //       scheduleId: 11,
  //       scheduleTitle: "웨딩 메이크업 시연",
  //       categoryId: 4,
  //       categoryName: "makeup",
  //       audioSummaryId: 2,
  //       status: "COMPLETED",
  //       summaryResult:
  //         '{\n  "날짜": "20/07/01 11:00",\n  "업체명": "엘레강스 메이크업 살롱",\n  "위치": "서울 종로구",\n  "메이크업 스타일": "클래식 웨딩",\n  "헤어 스타일": "롱 웨이브",\n  "포함 서비스": ["프리미엄 스킨케어", "립컬러 맞춤 조정"],\n  "가격": "40만 원",\n  "계약금": "15만 원",\n  "환불 규정": "2주 전 100% 환불, 1주 전 50% 환불",\n  "기타사항": ["전문 아티스트 담당", "웨딩 액세서리 포함"]\n}',
  //     },
  //     {
  //       loginUserId: 1,
  //       scheduleId: 16,
  //       scheduleTitle: "웨딩 메이크업 시연",
  //       categoryId: 4,
  //       categoryName: "makeup",
  //       audioSummaryId: 2,
  //       status: "COMPLETED",
  //       summaryResult:
  //         '{\n  "날짜": "20/07/01 11:00",\n  "업체명": "엘레강스 메이크업 살롱",\n  "위치": "서울 종로구",\n  "메이크업 스타일": "클래식 웨딩",\n  "헤어 스타일": "롱 웨이브",\n  "포함 서비스": ["프리미엄 스킨케어", "립컬러 맞춤 조정"],\n  "가격": "40만 원",\n  "계약금": "15만 원",\n  "환불 규정": "2주 전 100% 환불, 1주 전 50% 환불",\n  "기타사항": ["전문 아티스트 담당", "웨딩 액세서리 포함"]\n}',
  //     },
  //     {
  //       loginUserId: 1,
  //       scheduleId: 12,
  //       scheduleTitle: "스페셜 웨딩 메이크업",
  //       categoryId: 4,
  //       categoryName: "makeup",
  //       audioSummaryId: 3,
  //       status: "FAILED",
  //       summaryResult:
  //         '{\n  "날짜": "20/07/10 15:00",\n  "업체명": "스타 메이크업 스튜디오",\n  "위치": "서울 마포구",\n  "메이크업 스타일": "글램 웨딩",\n  "헤어 스타일": "우아한 번 스타일",\n  "포함 서비스": ["풀 메이크업", "맞춤 속눈썹"],\n  "가격": "50만 원",\n  "계약금": "20만 원",\n  "환불 규정": "3주 전 100% 환불, 1주 전 50% 환불",\n  "기타사항": ["고급 화장품 사용", "웨딩 헤어 악세서리 포함"]\n}',
  //     },
  //   ],
  // };
  const [consultationAnalyzeInfo, setConsultationAnalyzeInfo] = useState();

  useEffect(() => {
    const axiosConsultationAnalyzeInfo = async () => {
      try {
        const consultationAnalyzeData = await getConsultationAnalyzeInfo();
        setConsultationAnalyzeInfo(consultationAnalyzeData);
      } catch (err) {
        console.log(err); // ✅ 서버에서 받은 오류 메시지 표시
      }
    };
    axiosConsultationAnalyzeInfo();
  }, []);

  useEffect(() => {
    console.log(consultationAnalyzeInfo);
  }, [consultationAnalyzeInfo]);

  useEffect(() => {
    if (!consultationAnalyzeInfo || !consultationAnalyzeInfo.length) {
      console.log("❌ SummaryResult가 없습니다.");
      return;
    }

    const parsedData = consultationAnalyzeInfo.map((item) => ({
      ...item,
      summaryResult:
        item.status === "COMPLETED" ? JSON.parse(item.summaryResult) : null,
    }));

    setSummaryData(parsedData);
  }, [consultationAnalyzeInfo]);

  const toggleCardSelection = (scheduleId, status) => {
    if (status !== "COMPLETED") return; // ✅ COMPLETED가 아닌 경우 선택 불가

    setSelectedCards((prev) => {
      if (prev.includes(scheduleId)) {
        return prev.filter((id) => id !== scheduleId); // 선택 해제
      } else if (prev.length < 2) {
        return [...prev, scheduleId]; // 최대 2개까지 선택 가능
      }
      return prev;
    });
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category); // ✅ 카테고리 변경
    setSelectedCards([]); // ✅ 선택된 카드 초기화
  };

  const selectedItems = summaryData.filter((item) =>
    selectedCards.includes(item.scheduleId)
  );

  // ✅ 카테고리 필터링
  const filteredData = summaryData.filter(
    (item) => item.categoryName === selectedCategory
  );

  return (
    <>
      <TopNavigationBar title="AI 상담 요약" />
      <div className="h-[86vh]">
        {/* ✅ 카테고리 필터 바 추가 */}
        <div className="flex justify-around bg-gray-200 p-2">
          {["weddinghall", "studio", "dress", "makeup"].map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`px-4 py-2 rounded-md text-sm font-semibold ${
                selectedCategory === category
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-700"
              }`}
            >
              {category === "weddinghall"
                ? "웨딩홀"
                : category === "studio"
                ? "스튜디오"
                : category === "dress"
                ? "드레스"
                : "헤어 & 메이크업"}
            </button>
          ))}
        </div>

        <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredData.map((item) => (
            <div
              key={item.scheduleId}
              onClick={() => toggleCardSelection(item.scheduleId, item.status)}
              className={`cursor-pointer bg-white p-4 shadow-md rounded-lg border-2 ${
                selectedCards.includes(item.scheduleId)
                  ? "border-blue-500"
                  : "border-gray-300"
              } ${
                item.status !== "COMPLETED"
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
            >
              <h2 className="text-lg font-semibold">{item.scheduleTitle}</h2>
              <p className="text-gray-500">{item.categoryName}</p>
              <p
                className={`text-sm font-semibold ${
                  item.status === "COMPLETED"
                    ? "text-green-600"
                    : item.status === "PROCESSING"
                    ? "text-yellow-600"
                    : "text-red-600"
                }`}
              >
                {item.status === "COMPLETED"
                  ? "✅ 완료"
                  : item.status === "PROCESSING"
                  ? "⏳ 진행 중(최대 10분 소요)"
                  : "❌ 실패(다시 시도해주세요)"}
              </p>
              <hr className="my-2" />
              {item.status === "COMPLETED" && item.summaryResult && (
                <>
                  <p>
                    <strong>업체명:</strong> {item.summaryResult["업체명"]}
                  </p>
                  <p>
                    <strong>홀명:</strong> {item.summaryResult["홀명"]}
                  </p>
                  <p>
                    <strong>날짜:</strong> {item.summaryResult["날짜"]}
                  </p>
                </>
              )}
            </div>
          ))}
        </div>

        {/* 비교하기 버튼 */}
        {selectedCards.length === 2 && (
          <div className="fixed bottom-30 left-0 right-0 flex justify-center z-50">
            <button
              onClick={() => setShowComparison(true)}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow-md"
            >
              비교하기
            </button>
          </div>
        )}

        {/* 비교 모달 */}
        {showComparison && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl w-full">
              <h2 className="text-lg font-semibold text-center mb-4">
                비교 결과
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {selectedItems.map((item, index) => (
                  <div key={index} className="border p-4 rounded-lg">
                    <h3 className="font-bold">{item.scheduleTitle}</h3>
                    <p>
                      <strong>업체명:</strong> {item.summaryResult["업체명"]}
                    </p>
                    <p>
                      <strong>홀명:</strong> {item.summaryResult["홀명"]}
                    </p>
                    <p>
                      <strong>날짜:</strong> {item.summaryResult["날짜"]}
                    </p>
                    <p>
                      <strong>대관료:</strong> {item.summaryResult["대관료"]}
                    </p>
                    <p>
                      <strong>환불 규정:</strong>{" "}
                      {item.summaryResult["환불_규정"]}
                    </p>
                  </div>
                ))}
              </div>
              <button
                onClick={() => setShowComparison(false)}
                className="mt-4 w-full bg-red-500 text-white py-2 rounded-lg"
              >
                닫기
              </button>
            </div>
          </div>
        )}
      </div>
      <BottomNavigationBar />
    </>
  );
}
