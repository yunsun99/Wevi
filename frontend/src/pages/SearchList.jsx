import TopNavigationBar from "../components/Navigators/TopNavigationBar2";
import BottomNavigationBar from "../components/Navigators/BottomNavigationBar";

import SearchBar from "../components/Bars/SearchBar";
import RecentSearch from "../components/Search/RecentSearch";
import SearchCategoryBar from "../components/Bars/SearchCategoryBar";
import CardList from "../components/Cards/CardList";
import ButtonSearch from "../components/Buttons/ButtonSearchHSI";
import { useRecoilState } from "recoil";
import { searchState } from "../atoms/searchState";
import Search from "../components/Search/Search";
import SearchFilters from "../components/Search/SearchFilters";
// 성일
export default function SearchList() {
  const [selectedButton, setSelectedButton] = useRecoilState(searchState);
  const title =
  selectedButton.selectedCategory === "weddinghall"
    ? "웨딩홀"
    : selectedButton.selectedCategory === "dress"
    ? "드레스"
    : selectedButton.selectedCategory === "studio"
    ? "스튜디오"
        : selectedButton.selectedCategory === "hair&makeup"
    ? "헤어/메이크업"
    : "카테고리 없음";  
  return (
    <>
      <TopNavigationBar title={title} />
      <SearchCategoryBar />
      <section className="bg-white shadow-md p-4">
      <Search/>
      <SearchFilters/>
      </section>
      <CardList />
      <ButtonSearch>검색</ButtonSearch>
      <BottomNavigationBar />    
      </>
  );
}


