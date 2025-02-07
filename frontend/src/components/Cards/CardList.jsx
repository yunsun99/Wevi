import example_weddinghall from "@/assets/example_weddinghall.png";
import Card from "./Card";

export default function CardList({ title }) {
  // 성일

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
      <section className="p-4">
        <h2 className="text-lg font-semibold mb-4">{title}</h2>
        <div className="grid grid-cols-1 gap-4">
          <Card services={services} />
        </div>
      </section>
    </>
  );
}
