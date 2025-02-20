import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { searchFilterState } from "../../atoms/searchState"; // Recoil 상태 불러오기
import { axiosSidoData, axiosSigunguData } from "../../api/search";

export default function Region() {
  const [selectedButton, setSelectedButton] = useRecoilState(searchFilterState);
  const [sidoList, setSidoList] = useState([]); // 시도 리스트
  const [sigunguList, setSigunguList] = useState([]); // 시군구 리스트
  const [loading, setLoading] = useState(false); // 로딩 상태 추가

  // ✅ 시도 목록 요청 (최초 1회 실행)
  useEffect(() => {
    async function fetchSido() {
      const data = await axiosSidoData(); // API 요청 실행
      setSidoList(data);
    }
    fetchSido();
  }, []);

  // ✅ 시도 선택 시 시군구 목록 요청
  const handleSidoChange = async (event) => {
    const selectedDoId = Number(event.target.value); // 선택한 시도 ID

    setSelectedButton((prevState) => ({
      ...prevState,
      sido: selectedDoId,
      sigungu: "", // 시군구 초기화
    }));

    // 시군구 요청
    if (!selectedDoId) return; // 선택하지 않았으면 요청 안 함

    const data = await axiosSigunguData(selectedDoId);
    setSigunguList(data);
  };

  // ✅ 시군구 선택
  const handleSigunguChange = (event) => {
    const selectedSigunguId = Number(event.target.value);
    setSelectedButton((prevState) => ({
      ...prevState,
      sigungu: selectedSigunguId,
    }));
  };

  return (
    <>
      {/* 시도 선택 */}
      <select
        value={selectedButton.sido || ""}
        onChange={handleSidoChange}
        className="border border-[#D1D1D1] text-[#6E6E6E] p-2 rounded-full"
      >
        <option value="">시/도</option>
        {sidoList.map((sido) => (
          <option key={sido.doId} value={sido.doId}>
            {sido.doName}
          </option>
        ))}
      </select>

      {/* 시군구 선택 */}
      <select
        value={selectedButton.sigungu || ""}
        onChange={handleSigunguChange}
        className="border border-[#D1D1D1] text-[#6E6E6E] p-2 rounded-full"
        disabled={!sigunguList.length || loading} // 로딩 중이거나 시군구 없음
      >
        <option value="">시군구</option>
        {loading ? (
          <option>로딩 중...</option>
        ) : (
          sigunguList.map((sigungu) => (
            <option key={sigungu.sigunguId} value={sigungu.sigunguId}>
              {sigungu.sigunguName}
            </option>
          ))
        )}
      </select>
    </>
  );
}
