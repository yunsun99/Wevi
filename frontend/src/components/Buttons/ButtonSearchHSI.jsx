import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { searchState } from "../../atoms/searchState";

// 성일
// 검색버튼 누르면 검색리스트로 이동
export default function ButtonSearch({ children, onClick = () => {} }) {
  const navigate = useNavigate();
  const [selectedButton, setSelectedButton] = useRecoilState(searchState)
  // searchState 초기화(카테고리 제외)
  function handleSearch() {
    setSelectedButton((prevState)=>({
      ...prevState,
      // inoutside:"",
      // price:"",
      // region:"",
      // subarea:"",
    }))
    navigate("/searchList");
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
