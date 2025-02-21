import { useRecoilState } from "recoil";
import ButtonSearch2 from "../Buttons/ButtonSearchHSI2";
import Vendor360View from "../Vendors/Vendor360View";
import VendorBusinessInformation from "../Vendors/VendorBusinessInformation";
import VendorImage from "../Vendors/VendorImage";
import VendorInformation from "../Vendors/VendorInformation";
import VendorMagazine from "../Vendors/VendorMagazine";
import VendorOptionPrice from "../Vendors/VendorOptionPrice";
import VendorReview from "../Vendors/VendorReview";
import VendorSimpleInformation from "../Vendors/VendorSimpleInformation";
import VendorVisitInformation from "../Vendors/VendorVisitInformation";
import { searchDetailState } from "../../atoms/searchState";
import { useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useRef } from "react";

// GPT왈 memo가 더 최적화이다?
const CardSearchDetail = React.memo(({ data, selectedButton }) => {
  const navigate = useNavigate();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const vendorId = searchParams.get("id"); // 쿼리 파라미터에서 id 값 가져오기

  function handleConsultationReservation() {
    navigate(`/consultationReservation?id=${vendorId}`);
  }

  // console.log("CardSearchDetail Rendered");
  // console.log(data);

  // 🔥 각 섹션을 위한 useRef 생성
  const imageRef = useRef(null);
  const viewRef = useRef(null);
  const locationRef = useRef(null);
  const reviewRef = useRef(null);

  // 🔥 원하는 위치보다 조금 더 위로 이동하도록 스크롤 조정
  const scrollToSection = (sectionRef) => {
    if (sectionRef.current) {
      const headerOffset = 100; // 헤더 높이 (px 단위, 조정 가능)
      const elementPosition =
        sectionRef.current.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    if (selectedButton === "information") {
      scrollToSection(imageRef);
    } else if (selectedButton === "360view") {
      scrollToSection(viewRef);
    } else if (selectedButton === "location") {
      scrollToSection(locationRef);
    } else if (selectedButton === "review") {
      scrollToSection(reviewRef);
    }
  }, [selectedButton]);

  return (
    <div>
      <div ref={imageRef}>
        <VendorImage data={data} />
        <VendorSimpleInformation data={data} />
        <VendorInformation data={data} />
      </div>
      {data.categoryId === 1 ? (
        <div ref={viewRef}>
          <Vendor360View data={data} />
        </div>
      ) : (
        <div ref={viewRef}>
          <VendorMagazine data={data} />
        </div>
      )}
      {/* 🏷 옵션 가격 & 방문 정보 */}
      <VendorOptionPrice data={data} />
      <div ref={locationRef}>
        <VendorVisitInformation data={data} />
      </div>
      <VendorBusinessInformation data={data} />

      {/* 🏷 리뷰 */}
      <div ref={reviewRef}>
        <VendorReview />
      </div>

      <ButtonSearch2 onClick={handleConsultationReservation}>
        상담 예약
      </ButtonSearch2>
    </div>
  );
});

export default CardSearchDetail;
