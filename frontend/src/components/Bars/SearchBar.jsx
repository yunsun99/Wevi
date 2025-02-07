import React, { useState, useRef } from "react";
import SearchCalendar from "../Calendar/SearchCalendar";
import Search from "../Search/Search";
import SearchFilters from "../Search/SearchFilters";

function SearchBar() {
  return (
    <section className="bg-white shadow-md p-4">
      <Search />
      <SearchCalendar />
      <SearchFilters />
    </section>
  );
}

export default SearchBar;
