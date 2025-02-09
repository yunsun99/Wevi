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
import { searchDetailState } from "../../atoms/searchDetailState";
import { useNavigate } from "react-router-dom";

export default function CardDetail() {
  const [selectedButton, setSelectedButton] = useRecoilState(searchDetailState);
  const navigate = useNavigate()
  function handleConsultationReservation(){
    navigate('/consultationReservation')
  }
  return (
    <>
      <div className="">
        {selectedButton.selectedCategory !== "review" ? (
          <>
            <VendorImage />
            <VendorSimpleInformation />
            <VendorInformation />
            <Vendor360View />
            <VendorMagazine />
            <VendorOptionPrice />
            <VendorVisitInformation />
            <VendorBusinessInformation />
          </>
        ) : (
          <>
            <VendorImage />
            <VendorSimpleInformation />
          </>
        )}

        {selectedButton.selectedCategory === "review" ? <VendorReview /> : null}
        <ButtonSearch2 onClick={handleConsultationReservation}>상담 예약</ButtonSearch2>
      </div>
    </>
  );
}
