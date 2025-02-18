import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import TopNavigationBar from "../components/Navigators/TopNavigationBar2";
import BottomNavigationBar from "../components/Navigators/BottomNavigationBar";
import CardSearchDetail from "../components/Cards/CardSearchDetail";
import { getVendorInfo, getVendorReviews } from "../api/vendor";
import { vendorState } from "../atoms/vendorState";
import { useRecoilState } from "recoil";
import SearchDetailCategoryBar from "../components/Bars/SearchDetailCategoryBar";

// 성일
export default function SearchDetail() {
  let { category } = useParams(); // 예: "dress"가 들어옴
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id"); // 쿼리 파라미터에서 id 값 가져오기

  const [vendorData, setVendorData] = useState();
  const [reviewData, setReviewData] = useRecoilState(vendorState);
  const [title, setTitle] = useState(""); // ⬅️ title을 상태로 선언

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

  if (category === "weddinghall") {
    category = "웨딩홀";
  } else if (category === "studio") {
    category = "스튜디오";
  } else if (category === "dress") {
    category = "드레스";
  } else if (category === "makeup") {
    category = "헤어/메이크업";
  }
  return (
    <>
      <TopNavigationBar title={category} />
      <SearchDetailCategoryBar />
      {vendorData ? <CardSearchDetail data={vendorData} /> : null}
      <div className="h-[2vh]"></div>
      <BottomNavigationBar />
    </>
  );
}
