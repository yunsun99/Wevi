export default function ButtonSearch({ fetchData }) {
  return (
    <button
      className="w-full z-3 sticky bottom-28 bg-green-500 text-black py-3 rounded-lg hover:bg-green-600 transition"
      onClick={() => {
        console.log("btn");
        fetchData();
      }}
    >
      다시 검색
    </button>
  );
}
