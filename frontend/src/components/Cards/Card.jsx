import example_weddinghall from "@/assets/example_weddinghall.png";

// 성일
export default function Card() {
  const services = [
    {
      id: 1,
      name: "웨스턴 베니비스 영등포",
      region: "서울시 강남구 선릉로 757",
      priceRange: "12,441,000원 ~ 37,128,000원",
      image: example_weddinghall,
    },
    {
      id: 2,
      name: "압구정 스튜디오",
      region: "서울시 강남구 선릉로 757",
      priceRange: "12,441,000원 ~ 37,128,000원",
      image: example_weddinghall,
    },
  ];

  return (
    <>
      {services.map((service) => (
        <div
          key={service.id}
          className="bg-white rounded-lg shadow-md overflow-hidden"
        >
          <img
            src={service.image}
            alt={service.name}
            className="w-full h-fit object-cover overflow-x-auto"
          />
          <div className="pt-4 pl-4 pr-4 pb-2">
            <h3 className="font-bold">{service.name}</h3>
            <p className="text-sm text-gray-500">{service.region}</p>
          </div>
          <div className="p-4">
            <h3 className="font-bold text-right">
              {service.priceRange.split("~")[0].trim() + " ~"}
            </h3>
          </div>
        </div>
      ))}
    </>
  );
}
