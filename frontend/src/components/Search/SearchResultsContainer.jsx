import { useRecoilValue } from "recoil";
import { searchResultsState } from "../../atoms/searchState";
import ListView from "../ListView/ListView";
import Card from "@/components/Search/Card";

export default function SearchResultsContainer() {
  // ✅ 검색 결과를 가져오지만, 불필요한 리렌더링 방지
  const searchResults = useRecoilValue(searchResultsState);
  return <ListView data={searchResults} CardComponent={Card} />;
}
