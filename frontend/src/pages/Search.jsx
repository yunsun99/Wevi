import TopNavigationBar from "../components/Navigators/TopNavigationBar2";
import BottomNavigationBar from "../components/Navigators/BottomNavigationBar";

import { useState } from "react";
import SearchBar from "../components/Bars/SearchBar";
import RecentSearch from "../components/Search/RecentSearch";
import SearchCategoryBar from "../components/Bars/SearchCategoryBar";
import CardList from "../components/Cards/CardList";
import Button1 from "../components/Buttons/Button1";
import ButtonSearch from "../components/Buttons/ButtonSearchHSI";
// 성일

export default function Search() {
  return (
    <>
      <TopNavigationBar title="검색" />
      <SearchCategoryBar />
      <SearchBar />
      <RecentSearch />
      <CardList />
      <ButtonSearch>검색</ButtonSearch>
      <BottomNavigationBar />
    </>
  );
} //
