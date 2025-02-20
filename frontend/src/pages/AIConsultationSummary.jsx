import { useState, useEffect } from "react";
import TopNavigationBar from "@/components/Navigators/TopNavigationBar2";
import BottomNavigationBar from "@/components/Navigators/BottomNavigationBar";
import { getConsultationAnalyzeInfo } from "../api/user";

const categoryTable = {
  weddinghall: [
    { label: "날짜", key: "날짜" },
    { label: "대관료", key: "대관료" },
    { label: "위치", key: "위치" },
    { label: "최대인원", key: "최대인원" },
    { label: "최소_보장_인원", key: "최소_보장_인원" },
    { label: "1인당_식사_비용", key: "1인당_식사_비용" },
    { label: "계약금", key: "계약금" },
    { label: "포함_서비스", key: "포함_서비스" },
    { label: "식사_형태", key: "식사_형태" },
    { label: "예식_방식", key: "예식_방식" },
    { label: "기타사항", key: "기타사항" },
    { label: "환불 규정", key: "환불_규정" },
  ],
  studio: [
    { label: "날짜", key: "날짜" },
    { label: "계약금", key: "계약금" },
    { label: "패키지", key: "패키지" },
    { label: "패키지 비용", key: "패키지 비용" },
    { label: "사진 장수", key: "사진 장수" },
    { label: "앨범", key: "앨범" },
    { label: "촬영 스타일", key: "촬영 스타일" },
    { label: "촬영 시간", key: "촬영 시간" },
    { label: "기타사항", key: "기타사항" },
    { label: "환불 규정", key: "환불 규정" },
  ],
  dress: [
    { label: "날짜", key: "날짜" },
    { label: "계약금", key: "계약금" },
    { label: "위치", key: "위치" },
    { label: "드레스 종류", key: "드레스 종류" },
    { label: "패키지", key: "패키지" },
    { label: "패키지 비용", key: "패키지 비용" },
    { label: "피팅 횟수", key: "피팅 횟수" },
    { label: "기타사항", key: "기타사항" },
    { label: "환불 규정", key: "환불 규정" },
  ],
  makeup: [
    { label: "날짜", key: "날짜" },
    { label: "계약금", key: "계약금" },
    { label: "위치", key: "위치" },
    { label: "메이크업 스타일", key: "메이크업 스타일" },
    { label: "패키지", key: "패키지" },
    { label: "패키지 비용", key: "패키지 비용" },
    { label: "헤어 스타일", key: "헤어 스타일" },
    { label: "기타사항", key: "기타사항" },
    { label: "환불 규정", key: "환불 규정" },
  ],
};
/**
 * [
                    { label: "홀명", key: "홀명" },
                    { label: "날짜", key: "날짜" },
                    { label: "대관료", key: "대관료" },
                    { label: "환불 규정", key: "환불_규정" },
                  ]
 * 
 */

export default function AIConsultationSummary() {
  const [summaryData, setSummaryData] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [showComparison, setShowComparison] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("weddinghall"); // 기본값: 전체 보기
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

  // useEffect(() => {
  //   console.log(consultationAnalyzeInfo);
  // }, [consultationAnalyzeInfo]);

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
    console.log(parsedData);
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
      <div className="h-[86vh] overflow-y-auto">
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
        {filteredData ? (
          <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredData.map((item) => (
              <div
                key={item.scheduleId}
                onClick={() =>
                  toggleCardSelection(item.scheduleId, item.status)
                }
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
        ) : null}

        {/* 비교하기 버튼 */}
        {selectedCards.length === 2 && !showComparison && (
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
          <div className="fixed inset-0 backdrop-blur-sm flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl w-full max-h-[80vh] overflow-y-auto">
              <h2 className="text-lg font-semibold text-center mb-4">
                비교 결과
              </h2>

              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border p-2 w-1/3 text-center">업체명</th>
                    {/* 첫 번째 열 (항목명) */}
                    {selectedItems.map((item, index) => (
                      <th key={index} className="border p-2 w-1/3 text-center ">
                        {item.summaryResult["업체명"]}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {categoryTable[selectedCategory].map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      <td className="border p-2 font-semibold text-center text-sm">
                        {row.label}
                      </td>
                      {/* 항목명 */}
                      {selectedItems.map((item, index) => (
                        <td
                          key={index}
                          className="border p-2 text-center text-xs"
                        >
                          {item.summaryResult[row.key]}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>

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
