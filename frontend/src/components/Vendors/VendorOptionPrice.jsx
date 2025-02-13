import React from "react";

export default function VendorOptionPrice({ data }) {
  // 1. 가격 정보 문자열을 숫자가 처음 나오는 부분을 기준으로 분리
  const priceList = data.price.split(", ").map((item) => {
    const match = item.match(/^(.+?)(\d[\d,]*원)$/); // 숫자가 처음 나오는 부분을 기준으로 분리
    if (match) {
      return { name: match[1].trim(), price: match[2].trim() };
    }
    return { name: item, price: "" }; // 오류 방지
  });

  return (
    <div className="bg-white shadow-md mt-4 p-4">
      <h3 className="text-xl font-bold">옵션별 가격</h3>
      <div className="mt-4 grid grid-cols-3 gap-y-2 text-sm text-gray-600">
        {priceList.map((item, index) => (
          <React.Fragment key={index}>
            <p className="font-bold">{item.name}</p>
            <p className="col-span-2">{item.price}</p>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
