import { useNavigate } from "react-router-dom";

// 성일
// 검색버튼 누르면 검색리스트로 이동
export default function ButtonSearch({ children, onClick = () => {} }) {
  const navigate = useNavigate();
  function handleSearch() {
    navigate("/searchlist");
  }
  return (
    <button
      className="w-full z-3 sticky bottom-28 bg-green-500 text-black py-3 rounded-lg hover:bg-green-600 transition"
      onClick={handleSearch}
    >
      {children}
    </button>
  );
}
