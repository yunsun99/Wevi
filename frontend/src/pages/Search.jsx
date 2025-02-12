import TopNavigationBar from "../components/Navigators/TopNavigationBar2";
import BottomNavigationBar from "../components/Navigators/BottomNavigationBar";

import { useEffect, useState } from "react";
import SearchBar from "../components/Bars/SearchBar";
import RecentSearch from "../components/Search/RecentSearch";
import SearchCategoryBar from "../components/Bars/SearchCategoryBar";
import ButtonSearch from "../components/Buttons/ButtonSearchHSI";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  searchResultsState,
  searchFilterState,
  searchDateState,
  searchTextState,
} from "../atoms/searchState";
import { useNavigate, useParams } from "react-router-dom";
import ListView from "../components/ListView/ListView";
import Card from "../components/Search/Card";
import { getSearchData } from "../api/search";
// 성일

export default function Search() {
  const { category } = useParams();
  const navigate = useNavigate();
  const [searchResults, setSearchResults] = useRecoilState(searchResultsState);
  const searchFilter = useRecoilValue(searchFilterState);
  const searchText = useRecoilValue(searchTextState);
  const searchDate = useRecoilValue(searchDateState);

  // 카테고리 기준 업데이트
  useEffect(() => {
    if (!category) {
      navigate("/search/weddinghall", { replace: true });
      return;
    }

    const fetchData = async () => {
      try {
        const requestData = {
          category,
          searchFilter,
          searchText,
          searchDate,
        };

        const data = await getSearchData(requestData);
        setSearchResults(data);
      } catch (error) {
        console.error("API 요청 실패:", error);
        setSearchResults([]);
      } finally {
      }
    };

    fetchData();
  }, [category]);

  const handleCategoryChange = (newCategory) => {
    if (category !== newCategory) {
      navigate(`/search/${newCategory}`);
    }
  };

  return (
    <>
      <TopNavigationBar title="검색" />
      {/* 업체 카테고리 */}
      <SearchCategoryBar
        currentCategory={category}
        onChangeCategory={handleCategoryChange}
      />
      {/* 검색 관련 */}
      <SearchBar />
      {/* 최근 검색 */}
      <RecentSearch />
      {/* 카드 리스트 */}
      <ListView data={searchResults} CardComponent={Card} />
      {/* 버튼 */}
      <ButtonSearch>검색</ButtonSearch>
      <BottomNavigationBar />
    </>
  );
} //
