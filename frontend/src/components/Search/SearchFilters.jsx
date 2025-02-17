import React, { useEffect } from "react";
import Region from "../../components/Search/SearchRegion";
import { useRecoilState } from "recoil";
import { searchFilterState } from "../../atoms/searchState";
import { Link, useNavigate, useParams } from "react-router-dom";
import AISearchImage from "@/assets/icons/icon_AIsearch.png";

export default function SearchFilters() {
  const { category } = useParams();
  const [searchFilter, setFilterState] = useRecoilState(searchFilterState);
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate("/aiplanner");
  };

  // ✅ 필터 기본값 설정
  const defaultFilter = {
    sido: "",
    sigungu: "",
    price: "",
    inoutside: "",
  };

  useEffect(() => {
    setFilterState(defaultFilter);
  }, [category, setFilterState]);

  const handleOptionChange = (event, field) => {
    setFilterState((prevState) => ({
      ...prevState,
      [field]: event.target.value,
    }));
  };

  return (
    <div className="flex gap-4 mb-4 overflow-x-auto scrollbar-hide">
      <div onClick={handleNavigation} className="cursor-pointer">
        <img
          src={AISearchImage}
          alt="AI Search"
          className="w-auto h-auto max-w-[50px] max-h-[50px]"
        />
      </div>
      <Region key="region" />
      {category === "weddinghall" ? (
        <select
          className="border border-[#D1D1D1] text-[#6E6E6E] p-2 rounded-full flex-shrink-0"
          value={searchFilter.inoutside || ""}
          onChange={(e) => handleOptionChange(e, "inoutside")}
        >
          <option>무관</option>
          <option value="inside">실내</option>
          <option value="outside">야외</option>
        </select>
      ) : null}
      <select
        className="border border-[#D1D1D1] text-[#6E6E6E] p-2 rounded-full flex-shrink-0"
        value={searchFilter.price || ""}
        onChange={(e) => handleOptionChange(e, "price")}
      >
        <option>가격</option>
        <option value="asc">오름차순</option>
        <option value="desc">내림차순</option>
      </select>
    </div>
  );
}
