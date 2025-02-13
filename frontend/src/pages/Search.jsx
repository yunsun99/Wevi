import TopNavigationBar from "../components/Navigators/TopNavigationBar2";
import BottomNavigationBar from "../components/Navigators/BottomNavigationBar";
import { useEffect, useCallback } from "react";
import SearchBar from "../components/Bars/SearchBar";
import RecentSearch from "../components/Search/RecentSearch";
import SearchCategoryBar from "../components/Bars/SearchCategoryBar";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  searchResultsState,
  searchFilterState,
  searchDateState,
  searchTextState,
} from "../atoms/searchState";
import SearchFilters from "../components/Search/SearchFilters";
import ListView from "../components/ListView/ListView";
import ButtonSearch from "../components/Buttons/ButtonSearchHSI";
import { getSearchData } from "../api/search";
import Card from "../components/Search/Card";

export default function Search() {
  const { category } = useParams();
  const navigate = useNavigate();

  // ✅ 검색 결과를 저장하는 상태
  const [searchResults, setSearchResults] = useRecoilState(searchResultsState);

  // ✅ 검색 필터 상태 (리렌더링 최소화)
  const searchFilter = useRecoilValue(searchFilterState);
  const searchText = useRecoilValue(searchTextState);
  const searchDate = useRecoilValue(searchDateState);

  // ✅ API 요청 함수 (검색 데이터 불러오기)
  const fetchData = useCallback(async () => {
    try {
      const requestData = { category, searchFilter, searchText, searchDate };

      const data = await getSearchData(requestData);
      setSearchResults(data);
    } catch (error) {
      console.error("❌ API 요청 실패:", error);
      setSearchResults([]);
    }
  }, [category, searchFilter, searchText, searchDate, setSearchResults]);

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
      {/* 최근 검색 */}
      {/* <RecentSearch /> */}
      <ListView data={searchResults} CardComponent={Card} />
      <ButtonSearch fetchData={fetchData} /> {/* ✅ 버튼 클릭 시 데이터 갱신 */}
      <BottomNavigationBar />
    </>
  );
}
