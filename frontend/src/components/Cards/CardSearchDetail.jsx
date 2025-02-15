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
import React from "react";

// GPT왈 memo가 더 최적화이다?
const CardSearchDetail = React.memo(({ data }) => {
  const [selectedButton, setSelectedButton] = useRecoilState(searchDetailState);
  const navigate = useNavigate();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const vendorId = searchParams.get("id"); // 쿼리 파라미터에서 id 값 가져오기
  function handleConsultationReservation() {
    navigate(`/consultationReservation?id=${vendorId}`);
  }

  console.log("CardSearchDetail Rendered");
  console.log(data);

  return (
    <div>
      {selectedButton.selectedCategory !== "review" ? (
        <>
          <VendorImage data={data} />
          <VendorSimpleInformation data={data} />
          <VendorInformation data={data} />
          {data.categoryId === 1 ? (
            <Vendor360View data={data} />
          ) : (
            <VendorMagazine data={data} />
          )}
          <VendorOptionPrice data={data} />
          <VendorVisitInformation data={data} />
          <VendorBusinessInformation data={data} />
          <VendorReview />
        </>
      ) : (
        <>
          <VendorImage data={data} />
          <VendorSimpleInformation data={data} />
        </>
      )}

      {selectedButton.selectedCategory === "review" ? <VendorReview /> : null}
      <ButtonSearch2 onClick={handleConsultationReservation}>
        상담 예약
      </ButtonSearch2>
    </div>
  );
});

export default CardSearchDetail;
