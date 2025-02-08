import { useState } from "react";
import { useRecoilState } from "recoil";
import { searchState } from "../../atoms/searchState"; // Recoil 상태 불러오기

export default function Region() {
  const regiondata = [
    {
      name: "서울",
      subArea: [
        "강남구",
        "강동구",
        "강북구",
        "강서구",
        "관악구",
        "광진구",
        "구로구",
        "금천구",
        "노원구",
        "도봉구",
        "동대문구",
        "동작구",
        "마포구",
        "서대문구",
        "서초구",
        "성동구",
        "성북구",
        "송파구",
        "양천구",
        "영등포구",
        "용산구",
        "은평구",
        "종로구",
        "중구",
        "중랑구",
      ],
    },
    {
      name: "경기",
      subArea: [
        "고양시",
        "과천시",
        "광명시",
        "광주시",
        "구리시",
        "군포시",
        "김포시",
        "남양주시",
        "동두천시",
        "부천시",
        "성남시",
        "수원시",
        "시흥시",
        "안산시",
        "안성시",
        "안양시",
        "양주시",
        "오산시",
        "용인시",
        "의왕시",
        "의정부시",
        "이천시",
        "파주시",
        "평택시",
        "포천시",
        "하남시",
        "화성시",
        "가평군",
        "양평군",
        "여주군",
        "연천군",
      ],
    },
    {
      name: "인천",
      subArea: [
        "계양구",
        "미추홀구",
        "남동구",
        "동구",
        "부평구",
        "서구",
        "연수구",
        "중구",
        "강화군",
        "옹진군",
      ],
    },
    {
      name: "대전",
      subArea: ["대덕구", "동구", "서구", "유성구", "중구"],
    },
    {
      name: "대구",
      subArea: [
        "남구",
        "달서구",
        "동구",
        "북구",
        "서구",
        "수성구",
        "중구",
        "달성군",
      ],
    },
  ];

  const [selectedButton, setSelectedButton] = useRecoilState(searchState);
  const [subAreas, setSubAreas] = useState([]);

  // ✅ 시/도 변경 시
  const handleRegionChange = (event) => {
    const regionName = event.target.value;
    setSelectedButton((prevState) => ({
      ...prevState,
      region: regionName,
      subarea: "", // 시군구 초기화
    }));


    // 선택한 시/도에 해당하는 시군구 목록 설정
    const region = regiondata.find((region) => region.name === regionName);
    setSubAreas(region ? region.subArea : []);
  };

  // ✅ 시군구 변경 시
  const handleSubAreaChange = (event) => {
    setSelectedButton((prevState) => ({
      ...prevState,
      subarea: event.target.value,
    }));
  };

  return (
    <>
      {/* 시/도 선택 */}
      <select
        value={selectedButton.region || ""}
        onChange={handleRegionChange}
        className="border border-[#D1D1D1] text-[#6E6E6E] p-2 rounded-full flex-shrink-0"
      >
        <option value="">시/도</option>
        {regiondata.map((region) => (
          <option key={region.name} value={region.name}>
            {region.name}
          </option>
        ))}
      </select>

      {/* 시군구 선택 */}
      <select
        value={selectedButton.subarea || ""}
        onChange={handleSubAreaChange}
        className="border border-[#D1D1D1] text-[#6E6E6E] p-2 rounded-full flex-shrink-0"
        disabled={!subAreas.length} // 시/도를 선택해야 활성화됨
      >
        <option value="">시군구</option>
        {subAreas.map((subArea) => (
          <option key={subArea} value={subArea}>
            {subArea}
          </option>
        ))}
      </select>
    </>
  );
}
