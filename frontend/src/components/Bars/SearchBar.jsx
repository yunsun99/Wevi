import React, { useState, useRef } from "react";
import SearchCalendar from "../Search/SearchCalendar";
import Search from "../Search/Search";
import SearchFilters from "../Search/SearchFilters";

function SearchBar() {
  return (
    <section className="bg-white pt-4 pl-4 pr-4 border-b border-gray-300">
      <Search />
      <SearchCalendar />
      <SearchFilters />
    </section>
  );
}

export default SearchBar;
