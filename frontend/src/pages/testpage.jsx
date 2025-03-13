// 시군구 데이터 받기 -> 실패패
import React, { useState, useEffect } from "react";

// AddressBoundary 컴포넌트를 별도로 정의
const AddressBoundary = () => {
  const [boundaryData, setBoundaryData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // 통계청 API URL
    const apiUrl = "";
    const consumer_key = ""; // 발급받은 인증키
    const consumer_secret = ""; // 발급받은 인증키

    // 요청할 파라미터 설정
    const params = new URLSearchParams({
      adm_cd: "11010", // 예: 서울특별시 종로구
      year: "2021", // 예: 2021년 데이터
      consumer_key: consumer_key,
      consumer_secret: consumer_secret,
      format: "json", // 응답 형식 (json이나 xml로 설정 가능)
    });

    // fetch로 API 호출
    fetch(`${apiUrl}?${params}`)
      .then((response) => response.json())
      .then((data) => {
        setBoundaryData(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []); // 컴포넌트가 마운트될 때 한 번만 호출되도록 빈 배열([])을 두 번째 인자로 전달

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>행정구역 경계 데이터</h1>
      <pre>{JSON.stringify(boundaryData, null, 2)}</pre>
    </div>
  );
};

// Test 컴포넌트는 AddressBoundary를 포함
const Test = () => {
  return (
    <div>
      <h1>Test 컴포넌트</h1>
      <AddressBoundary />
    </div>
  );
};

export default Test;
