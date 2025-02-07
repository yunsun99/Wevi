import TopNavigationBar from "../components/Navigators/TopNavigationBar";
import BottomNavigationBar from "../components/Navigators/BottomNavigationBar";
import example_weddinghall from "../assets/example_weddinghall.png";

export default function AiPlannerResult() {
  const data = [
    {
      id: 1,
      category: "웨딩홀",
      title: "웨스턴베니비스",
      date: "2025년 5월 25일",
      price: "19,420,000원",
      tags: "#화려함 #웅장함 #주차장",
      image: example_weddinghall,
    },
    {
      id: 2,
      category: "메이크업",
      title: "마리앙끌레르",
      date: "2025년 5월 25일",
      price: "1,280,000원",
      tags: "#수수함 #고급진 #친절함",
      image: example_weddinghall,
    },
    {
      id: 3,
      category: "드레스",
      title: "에비뉴 준호",
      date: "2025년 5월 25일",
      price: "3,720,000원",
      tags: "#독특함 #친절함 #밝은",
      image: example_weddinghall,
    },
    {
      id: 4,
      category: "드레스",
      title: "에비뉴 준호",
      date: "2025년 5월 25일",
      price: "3,720,000원",
      tags: "#독특함 #친절함 #밝은",
      image: example_weddinghall,
    },
    {
      id: 5,
      category: "드레스",
      title: "에비뉴 준호",
      date: "2025년 5월 25일",
      price: "3,720,000원",
      tags: "#독특함 #친절함 #밝은",
      image: example_weddinghall,
    },
  ];

  return (
    <>
      {/* 상단 헤더 */}
      <TopNavigationBar />
      <div className="w-screen">
        {/* 추천 메시지 */}
        <section className="bg-purple-100 text-center py-4">
          <p className="text-lg font-semibold">이런 곳은 어때?</p>
        </section>

        {/* 카드 리스트 */}
        <section className="p-4 space-y-4">
          {data.map((item) => (
            <div
              key={item.id}
              className="relative bg-white rounded-lg shadow-md overflow-hidden"
            >
              {/* 배경 이미지 */}
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `url(${item.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  opacity: 0.3, // 배경 투명도
                }}
              ></div>

              {/* 콘텐츠 */}
              <div className="relative p-4">
                <div className="flex">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-24 h-24 object-cover"
                  />
                  <div className="flex-1 pl-4">
                    <h3 className="text-lg font-bold">{item.category}</h3>
                    <h2 className="text-xl font-semibold">{item.title}</h2>
                    <p className="text-sm text-gray-500">일정: {item.date}</p>
                    <p className="text-sm text-gray-500">금액: {item.price}</p>
                    <p className="text-sm text-gray-500">분위기: {item.tags}</p>
                  </div>
                </div>
                <div className="flex justify-between mt-4">
                  <button className="px-4 py-2 bg-gray-200 rounded-full">
                    업체 상세보기
                  </button>
                  <button className="px-4 py-2 bg-gray-200 rounded-full">
                    업체 예약하기
                  </button>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* 하단 버튼
        <div className="text-center p-4">
          <button className="px-4 py-2 bg-pink-300 text-white rounded-full">
            다시 찾아보기
          </button>
        </div> */}
      </div>
      {/* 하단 네비게이션 */}
      <BottomNavigationBar />
    </>
  );
}
