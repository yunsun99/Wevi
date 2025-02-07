import React, { useState } from "react";

export default function RecentSearch() {
  // searches를 상태로 관리
  const [searches, setSearches] = useState([
    {
      id: 1,
      title: "강남 웨딩홀",
      details: "06.21~06.22 | 1박 성인 2, 아동 0",
    },
    {
      id: 2,
      title: "청담 드레스샵",
      details: "06.21~06.22 | 1박 성인 2, 아동 0",
    },
  ]);

  // 특정 검색 항목 삭제 함수
  const deleteSearchLog = (id) => {
    // id가 일치하지 않는 항목들만 남기기
    const updatedSearches = searches.filter((search) => search.id !== id);
    setSearches(updatedSearches); // 상태 업데이트
  };

  // 전체 삭제 함수
  const clearAllSearches = () => {
    setSearches([]); // 빈 배열로 설정하여 모든 항목 삭제
  };

  return (
    <section className="p-4">
      <h2 className="text-lg font-semibold mb-4">최근 검색</h2>
      <ul>
        {searches.map((search) => (
          <li
            key={search.id}
            className="flex justify-between items-center bg-white p-2 mb-2 rounded-lg shadow-md"
          >
            <div>
              <p className="font-bold">{search.title}</p>
              <p className="text-sm text-gray-500">{search.details}</p>
            </div>
            <button
              className="text-gray-400"
              onClick={() => deleteSearchLog(search.id)}
            >
              &#10006;
            </button>
          </li>
        ))}
      </ul>
      <button className="text-sm text-blue-500 mt-2" onClick={clearAllSearches}>
        전체 삭제
      </button>
    </section>
  );
}

/**

import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import axios from "axios";
import { searchesState } from "./recoil/atoms";

export default function RecentSearch() {
  const [searches, setSearches] = useRecoilState(searchesState); // Recoil 상태 사용
  const [loading, setLoading] = useState(true); // 로딩 상태 관리
  const [error, setError] = useState(null); // 에러 상태 관리

  // 초기 데이터 가져오기
  useEffect(() => {
    const fetchSearches = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/recent-searches"); // 예시 API 엔드포인트
        setSearches(response.data); // Recoil 상태 업데이트
      } catch (err) {
        console.error("데이터를 가져오는 중 오류 발생:", err);
        setError("데이터를 가져오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false); // 로딩 상태 종료
      }
    };

    fetchSearches();
  }, [setSearches]);

  // 특정 검색 항목 삭제
  const deleteSearchLog = (id) => {
    setSearches((prevSearches) => prevSearches.filter((search) => search.id !== id));
  };

  // 전체 삭제
  const clearAllSearches = () => {
    setSearches([]); // 모든 항목 삭제
  };

  // 로딩 상태 처리
  if (loading) return <p>데이터를 불러오는 중...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section className="p-4">
      <h2 className="text-lg font-semibold mb-4">최근 검색</h2>
      <ul>
        {searches.map((search) => (
          <li
            key={search.id}
            className="flex justify-between items-center bg-white p-2 mb-2 rounded-lg shadow-md"
          >
            <div>
              <p className="font-bold">{search.title}</p>
              <p className="text-sm text-gray-500">{search.details}</p>
            </div>
            <button
              className="text-gray-400"
              onClick={() => deleteSearchLog(search.id)}
            >
              &#10006;
            </button>
          </li>
        ))}
      </ul>
      <button className="text-sm text-blue-500 mt-2" onClick={clearAllSearches}>
        전체 삭제
      </button>
    </section>
  );
}

 */
