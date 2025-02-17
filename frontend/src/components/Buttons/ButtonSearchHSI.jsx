import { useRecoilState, useSetRecoilState } from "recoil";
import { searchResultsState } from "../../atoms/searchState";
import { getSearchData } from "../../api/search";
import {
  searchFilterState,
  searchDateState,
  searchTextState,
} from "../../atoms/searchState";
import { useParams } from "react-router-dom";

export default function ButtonSearch() {
  const setSearchResults = useSetRecoilState(searchResultsState);
  const searchFilter = useRecoilState(searchFilterState)[0];
  const searchText = useRecoilState(searchTextState)[0];
  const searchDate = useRecoilState(searchDateState)[0];
  const { category } = useParams();

  // ✅ 버튼 클릭 시 검색 요청
  const handleSearch = async () => {
    try {
      const requestData = { category, searchFilter, searchText, searchDate };
      const data = await getSearchData(requestData);
      setSearchResults(data);
      console.log(data);
    } catch (error) {
      console.error("❌ API 요청 실패:", error);
      setSearchResults([]);
    }
  };

  return (
    <div className="px-3 z-3 sticky bottom-28 transition">
      <button
        className="w-full bg-[#609966] text-[#FFFDFA] py-3 rounded-lg"
        onClick={handleSearch}
      >
        버튼
      </button>
    </div>
  );
}
