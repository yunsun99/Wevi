export default function CardSearch({ image, title, priceRange }) {
  return (
    <div className="rounded-2xl shadow-md overflow-hidden">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-bold">{title}</h3>
        <p className="text-gray-600">{priceRange}</p>
      </div>
    </div>
  );
}
