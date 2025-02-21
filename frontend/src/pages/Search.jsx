import TopNavigationBar from "../components/Navigators/TopNavigationBar2";
import BottomNavigationBar from "../components/Navigators/BottomNavigationBar";
import { useEffect, useCallback } from "react";
import SearchBar from "../components/Bars/SearchBar";
import RecentSearch from "../components/Search/RecentSearch";
import SearchCategoryBar from "../components/Bars/SearchCategoryBar";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { searchResultsState } from "../atoms/searchState";
import SearchFilters from "../components/Search/SearchFilters";
import SearchResultsContainer from "../components/Search/SearchResultsContainer";
import ButtonSearch from "../components/Buttons/ButtonSearchHSI";
import { getSearchData } from "../api/search";

export default function Search() {
  const { category } = useParams();
  const navigate = useNavigate();

  // ✅ 검색 결과를 저장하는 상태
  const [searchResults, setSearchResults] = useRecoilState(searchResultsState);

  // ✅ API 요청 함수 (검색 데이터 불러오기)
  const fetchData = async () => {
    try {
      const requestData = { categoryDefault: category };

      const data = await getSearchData(requestData);
      setSearchResults(data);
      // console.log(data);
    } catch (error) {
      // console.error("❌ API 요청 실패:", error);
      setSearchResults([]);
    }
  };

  // ✅ 화면 로드시 카테고리 기준으로 데이터 불러오기
  useEffect(() => {
    if (!category) {
      navigate("/search/weddinghall", { replace: true });
      return;
    }
    fetchData();
  }, [category]); // ✅ 카테고리가 바뀔 때만 실행됨

  // ✅ 카테고리 변경 시 URL 이동
  const handleCategoryChange = (newCategory) => {
    if (category !== newCategory) {
      navigate(`/search/${newCategory}`);
    }
  };

  return (
    <>
      <TopNavigationBar title="검색" />
      <SearchCategoryBar
        currentCategory={category}
        onChangeCategory={handleCategoryChange}
      />
      <SearchBar />
      <SearchResultsContainer /> {/* ✅ 최적화된 데이터 관리 컴포넌트 */}
      <ButtonSearch /> {/* ✅ fetchData 제거하고 Recoil 활용 */}
      <BottomNavigationBar />
    </>
  );
}
