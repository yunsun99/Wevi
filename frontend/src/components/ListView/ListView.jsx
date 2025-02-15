export default function ListView({ data, CardComponent }) {
  return (
    <div className="flex flex-col gap-2 px-4 py-2">
      {Array.isArray(data) ? (
        data.map((item) => <CardComponent key={item.id} data={item} />)
      ) : (
        <p className="text-gray-500 text-center">데이터가 없습니다.</p>
      )}
    </div>
  );
}
