import example_weddinghall from "@/assets/example_weddinghall.png";

// 성일
export default function Card({ services }) {
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
