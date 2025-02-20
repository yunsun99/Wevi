import weddinghall_default from "@/assets/weddinghall_default.png";
import dress_default from "@/assets/dress_default.png";
import studio_default from "@/assets/studio_default.png";
import makeup_default from "@/assets/makeup_default.png";

const categoryImages = {
  1: weddinghall_default,
  3: dress_default,
  2: studio_default,
  4: makeup_default,
};

export default function AIPlannerCard({ data }) {
  return (
    <div
      key={data.categoryId}
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
    >
      <img
        src={
          data.imageUrl === "default"
            ? categoryImages[data.categoryId]
            : data.imageUrl
        }
        alt={data.vendorName}
        className="w-full h-[20vh] object-cover overflow-x-auto"
      />
      <div className="pt-4 pl-4 pr-4">
        <h3 className="font-bold">{data.vendorName}</h3>
        <p className="text-sm text-gray-500">{data.autoRoadAddress}</p>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-md text-right">
          {data.minPrice.toLocaleString()}원 ~
        </h3>
      </div>
    </div>
  );
}
