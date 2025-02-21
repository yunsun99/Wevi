export default function CardListView({ data, CardComponent }) {
  // console.log(data);
  return (
    <div className="flex flex-col gap-2 py-2 ">
      {data.length > 0 ? (
        data.map((item) => <CardComponent key={item.scheduleId} data={item} />)
      ) : (
        <p className="text-gray-500 text-center">데이터가 없습니다.</p>
      )}
    </div>
  );
}
