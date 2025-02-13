export default function ListView({ data, CardComponent }) {
  console.log(data);
  return (
    <div className="flex flex-col gap-2 px-4 py-2">
      {Array.isArray(data) && data.length > 0 ? (
        data.map((item) => <CardComponent key={item.id} data={item} />)
      ) : (
        <p className="text-gray-500 text-center">데이터가 없습니다.</p>
      )}
    </div>
  );
}
