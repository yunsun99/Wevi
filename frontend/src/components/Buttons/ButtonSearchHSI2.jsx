import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { searchFilterState } from "../../atoms/searchState";
import { searchDetailState } from "../../atoms/searchState";

// 성일
// 검색버튼 누르면 검색리스트로 이동
export default function ButtonSearch2({ children, onClick = () => {} }) {
  const navigate = useNavigate();
  const [selectedButton, setSelectedButton] = useRecoilState(searchDetailState);
  // searchState 초기화(카테고리 제외)
  function handleSearch() {
    // setSelectedButton((prevState)=>({
    //   ...prevState,
    //   inoutside:"",
    //   price:"",
    //   region:"",
    //   subarea:"",
    // }))
    navigate("/searchList");
  }
  return (
    <div className="px-3 py-5 z-3 sticky bottom-[7vh] bg-white border-1 border-white">
      <button
        className="w-full bg-[#609966] text-[#FFFDFA] py-3 rounded-lg font-semibold"
        onClick={onClick}
      >
        {children}
      </button>
    </div>
  );
}
