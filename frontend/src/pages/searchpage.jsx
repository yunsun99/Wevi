import TopNavigationBar from "../components/Navigators/TopNavigationBar2";
import BottomNavigationBar from "../components/Navigators/BottomNavigationBar";

import { useState } from "react";
import SearchBar from "../components/Bars/SearchBar";
import RecentSearch from "../components/Search/RecentSearch";
import SearchCategoryBar from "../components/Bars/SearchCategoryBar";
import CardList from "../components/Cards/CardList";
// 성일

export default function SearchPage() {
  return (
    <>
      <TopNavigationBar title="검색" />
      <SearchCategoryBar />
      <SearchBar />
      <RecentSearch />
      <CardList />
      <BottomNavigationBar />
    </>
  );
}
