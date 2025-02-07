export default function CardNotification({ data }) {
  return (
    <div className="w-full p-4 bg-blue-100 shadow-md rounded-lg flex items-center justify-between hover:bg-blue-200 transition">
      <div>
        <p className="font-semibold">{data.sender}</p>
        <p className="text-gray-600 text-sm">{data.message}</p>
      </div>
      <span className="text-gray-500 text-xs">{data.time}</span>
    </div>
  );
}
