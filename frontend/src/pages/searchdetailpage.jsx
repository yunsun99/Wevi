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
import CardDetail from "../components/Cards/CardDetail";
// 성일
export default function SearchDetail() {
  const [selectedButton, setSelectedButton] = useRecoilState(searchState);
  return (
    <>
      <TopNavigationBar title={selectedButton.selectedCategory} />
      <SearchCategoryBar />
      <CardDetail/>
      <BottomNavigationBar />    
      </>
  );
}


