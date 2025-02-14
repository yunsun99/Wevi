import { useNavigate, useParams } from "react-router-dom";

export default function Card({ data }) {
  const navigate = useNavigate();
  const { category } = useParams(); // /search/:category 경로에서 category를 추출

  function handleCardClick(id) {
    navigate(`/searchDetail/${category}?id=${id}`);
  }

  return (
    <div
      key={data.id}
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
      onClick={() => handleCardClick(data.id)}
    >
      <img
        src={data.image}
        alt={data.name}
        className="w-full h-fit object-cover overflow-x-auto"
      />
      <div className="pt-4 pl-4 pr-4 pb-2">
        <h3 className="font-bold">{data.name}</h3>
        <p className="text-sm text-gray-500">{data.region}</p>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-right">
          {data.priceRange.split("~")[0].trim() + " ~"}
        </h3>
      </div>
    </div>
  );
}
