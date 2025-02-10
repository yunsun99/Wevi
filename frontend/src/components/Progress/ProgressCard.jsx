import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import dressImage from "../../assets/backgroundImages/dress.png";
import weddinghallImage from "../../assets/backgroundImages/weddinghall.png";
import studioImage from "../../assets/backgroundImages/studio.png";
import hairMakeupImage from "../../assets/backgroundImages/hair_makeup.png";

export default function ProgressCard() {
  const data = [
    {
      title: "예식장",
      items: Array(10).fill({ status: "계약 완료", time: "25.01.25 09:50" }),
    },
    {
      title: "드레스",
      items: [
        { status: "계약 완료", time: "25.01.25 09:50" },
        { status: "스튜디오 드레스 셀렉", time: "25.01.25 09:50" },
        { status: "스튜디오 드레스 가봉", time: "25.01.25 09:50" },
        { status: "웨딩촬영", time: "25.01.25 09:50" },
      ],
    },
    {
      title: "스튜디오",
      items: Array(5).fill({ status: "촬영 완료", time: "25.01.30 14:30" }),
    },
    {
      title: "헤어/메이크업",
      items: Array(7).fill({ status: "스타일링 완료", time: "25.02.01 11:00" }),
    },
  ];

  const categoryBackgrounds = {
    드레스: `url(${dressImage})`,
    예식장: `url(${weddinghallImage})`,
    스튜디오: `url(${studioImage})`,
    "헤어/메이크업": `url(${hairMakeupImage})`,
  };

  return (
    <>
      <div className="flex flex-col h-screen">
        {/* Swiper가 들어갈 중간 영역 */}
        <div className="flex-grow bg-gray-100 overflow-auto">
          <div className="w-full max-w-md mx-auto h-full flex items-center justify-center p-4">
            <div className="w-full h-full rounded-lg overflow-hidden shadow-lg">
              <Swiper
                navigation={true}
                modules={[Navigation]}
                className="mySwiper h-full"
              >
                {data.map((category, index) => (
                  <SwiperSlide key={index}>
                    <div
                      className="p-4 rounded-lg h-full text-white"
                      style={{
                        background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), ${
                          categoryBackgrounds[category.title]
                        }`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                      }}
                    >
                      <h3 className="text-center font-bold text-lg mb-4">
                        {category.title}
                      </h3>
                      <ul className="space-y-4">
                        {category.items.map((item, idx) => (
                          <li
                            key={idx}
                            className="flex justify-between items-center"
                          >
                            <div className="flex items-center">
                              <span className="w-4 h-4 bg-white rounded-full mr-4"></span>
                              <p>{item.status}</p>
                            </div>
                            <p className="text-sm text-gray-200">{item.time}</p>
                            <button className="bg-gray-800 text-white text-sm py-1 px-3 rounded">
                              완료
                            </button>
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
    </>
  );
}
