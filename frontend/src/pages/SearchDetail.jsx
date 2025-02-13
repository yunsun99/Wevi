import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import TopNavigationBar from "../components/Navigators/TopNavigationBar2";
import BottomNavigationBar from "../components/Navigators/BottomNavigationBar";
import CardSearchDetail from "../components/Cards/CardSearchDetail";
import { getVendorInfo, getVendorReviews } from "../api/vendor";
import { vendorState } from "../atoms/vendorState";
import { useRecoilState } from "recoil";

// 성일
export default function SearchDetail() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id"); // 쿼리 파라미터에서 id 값 가져오기
  const [vendorData, setVendorData] = useState();
  const [reviewData, setReviewData] = useRecoilState(vendorState);
  const [title, setTitle] = useState("gd"); // ⬅️ title을 상태로 선언

  useEffect(() => {
    if (!id) {
      return;
    }
    const axiosVendorInfo = async () => {
      try {
        const venderInfo = await getVendorInfo(id);
        setVendorData(venderInfo);
      } catch (err) {
        console.log(err); // ✅ 서버에서 받은 오류 메시지 표시
      }
    };
    axiosVendorInfo();

    const axiosVendorReviews = async () => {
      try {
        const reviews = await getVendorReviews(id);
        setReviewData((prev) => ({
          ...prev,
          vendorId: id,
          reviews: reviews,
        }));
      } catch (err) {
        console.log(err); // ✅ 서버에서 받은 오류 메시지 표시
      }
    };
    axiosVendorReviews();
  }, [id]);

  useEffect(() => {
    if (!vendorData) {
      return;
    }
    let newTitle;
    if (vendorData.categoryId === 1) {
      newTitle = "웨딩홀";
    } else if (vendorData.categoryId === 2) {
      newTitle = "스튜디오";
    } else if (vendorData.categoryId === 3) {
      newTitle = "드레스";
    } else if (vendorData.categoryId === 4) {
      newTitle = "헤어/메이크업";
    } else {
      newTitle = "기타";
    }
    setTitle(newTitle); // ⬅️ title을 상태로 업데이트
    console.log(newTitle);
    console.log(reviewData);
  }, [vendorData]);

  return (
    <>
      <TopNavigationBar title={title} />
      {vendorData ? <CardSearchDetail data={vendorData} /> : null}
      <BottomNavigationBar />
    </>
  );
}
