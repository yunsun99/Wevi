import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import dressImage from "../../assets/backgroundImages/dress.png";
import weddinghallImage from "../../assets/backgroundImages/weddinghall.png";
import studioImage from "../../assets/backgroundImages/studio.png";
import hairMakeupImage from "../../assets/backgroundImages/hair_makeup.png";

export default function ProgressCard({ data }) {
  // ✅ 카테고리별 한글 매칭
  const categoryMapping = {
    weddinghall: "예식장",
    dress: "드레스",
    studio: "스튜디오",
    makup: "헤어/메이크업",
  };

  // ✅ 배경 이미지 매칭
  const categoryBackgrounds = {
    예식장: `url(${weddinghallImage})`,
    드레스: `url(${dressImage})`,
    스튜디오: `url(${studioImage})`,
    "헤어/메이크업": `url(${hairMakeupImage})`,
  };

  // ✅ realdata를 categoryName 기준으로 그룹화
  const groupedData = data.reduce((acc, item) => {
    const categoryTitle = categoryMapping[item.categoryName]; // 한글 변환
    if (!acc[categoryTitle]) {
      acc[categoryTitle] = [];
    }
    acc[categoryTitle].push(item);
    return acc;
  }, {});

  return (
    <div className="flex flex-col h-[calc(100vh-5rem-5rem)]">
      <div className="flex-grow bg-gray-100 overflow-auto">
        <div className="w-full h-full flex items-center justify-center p-4">
          <div className="w-[100%] max-w-[1200px] h-full overflow-hidden">
            <Swiper
              pagination={{ clickable: true }}
              modules={[Pagination]}
              className="mySwiper h-full"
              spaceBetween={16} // 카드 간격
              slidesPerView={1.3} // 양쪽 카드 일부 보이기
              centeredSlides={true} // 현재 슬라이드 중앙 배치
              initialSlide={0} // 첫 번째 슬라이드가 중앙에 위치
            >
              {Object.entries(groupedData).map(([category, items], index) => (
                <SwiperSlide key={index}>
                  <div
                    className="p-4 rounded-lg h-full text-white shadow-md"
                    style={{
                      background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), ${categoryBackgrounds[category]}`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }}
                  >
                    <h3 className="text-center font-bold text-lg mb-4">
                      {category}
                    </h3>
                    <ul className="space-y-4">
                      {items.map((item, idx) => (
                        <li
                          key={idx}
                          className="flex justify-between items-center"
                        >
                          <div className="flex items-center">
                            {/* ✅ COMPLETED일 경우 흰색, PENDING일 경우 회색 */}
                            <span
                              className={`w-4 h-4 rounded-full mr-4 ${
                                item.status === "COMPLETED"
                                  ? "bg-white"
                                  : "bg-gray-400"
                              }`}
                            ></span>
                            <p className="text-xs whitespace-nowrap">
                              {item.stepName}
                            </p>
                          </div>
                          <p className="text-xs text-gray-200 whitespace-nowrap">
                            {item.completeDate
                              ? `${item.completeDate} ${item.completeTime}`
                              : "예정"}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
}
