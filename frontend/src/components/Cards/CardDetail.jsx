import ButtonSearch2 from "../Buttons/ButtonSearchHSI2";
import Vendor360View from "../Vendors/Vendor360View";
import VendorBusinessInformation from "../Vendors/VendorBusinessInformation";
import VendorImage from "../Vendors/VendorImage";
import VendorInformation from "../Vendors/VendorInformation";
import VendorMagazine from "../Vendors/VendorMagazine";
import VendorOptionPrice from "../Vendors/VendorOptionPrice";
import VendorSimpleInformation from "../Vendors/VendorSimpleInformation";
import VendorVisitInformation from "../Vendors/VendorVisitInformation";

export default function CardDetail() {
    return (
        <>
      <div className="">
       <VendorImage/>
       <VendorSimpleInformation/>
       <VendorInformation/>
       <Vendor360View/>
       <VendorMagazine/>
       <VendorOptionPrice/>
       <VendorVisitInformation/>
       <VendorBusinessInformation/>
       <ButtonSearch2>상담 예약</ButtonSearch2>
      </div>
      </>
    );
  }
  