import TopNavigationBar from "../components/Navigators/TopNavigationBar2";
import BottomNavigationBar from "../components/Navigators/BottomNavigationBar";

import { useState } from "react";
import SearchBar from "../components/Bars/SearchBar";
import RecentSearch from "../components/Search/RecentSearch";
import PopularServices from "../components/PopularServices";
import SearchCategoryBar from "../components/Bars/SearchCategoryBar";

export default function SearchPage() {
  return (
    <>
      <TopNavigationBar title="검색" />
      <SearchCategoryBar />
      <SearchBar />
      <RecentSearch />
      <PopularServices />
      <BottomNavigationBar />
    </>
  );
}
