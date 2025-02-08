export default function CardDetail() {
    return (
      <div className="bg-gray-50 p-4">
        {/* 상단 이미지 */}
        <img
          src="/path/to/your/image.jpg"
          alt="웨딩홀 이미지"
          className="w-full h-72 object-cover rounded-lg"
        />
  
        {/* 웨딩홀 정보 */}
        <div className="bg-white rounded-lg shadow-md mt-4 p-4">
          <h2 className="text-2xl font-bold">대치웨딩컨벤션_강남</h2>
          <p className="text-xl text-gray-600 mt-2">12,441,000원~</p>
          <p className="text-sm text-gray-500 mt-1">📍 강남구 대치동</p>
          <button className="mt-3 px-4 py-2 bg-green-500 text-white rounded-lg">상담 예약하기</button>
        </div>
  
        {/* 업체 정보 */}
        <div className="bg-white rounded-lg shadow-md mt-4 p-4">
          <h3 className="text-xl font-bold">업체 정보</h3>
          <p>전화번호: 02-4318-0007</p>
          <p>홈페이지: <a href="http://wedding.co.kr" className="text-blue-500">http://wedding.co.kr</a></p>
          <p>영업시간: 월~금 09:00 ~ 19:00</p>
          <p>주말/공휴일: 09:00 ~ 21:00</p>
        </div>
  
        {/* 360도 뷰 */}
        <div className="bg-white rounded-lg shadow-md mt-4 p-4">
          <h3 className="text-xl font-bold">360도 뷰</h3>
          <img
            src="/path/to/360-view.jpg"
            alt="360도 뷰"
            className="w-full h-40 object-cover rounded-lg mt-2"
          />
        </div>
  
        {/* 옵션별 가격 */}
        <div className="bg-white rounded-lg shadow-md mt-4 p-4">
          <h3 className="text-xl font-bold">옵션별 가격</h3>
          <ul className="text-gray-600 mt-2">
            <li>그랜드홀: 10,000,000원</li>
            <li>부페: 3,000,000원</li>
            <li>서브홀: 1,000,000원</li>
            <li>주차비: 포함</li>
            <li>꽃장식: 4,000,000원</li>
          </ul>
        </div>
  
        {/* 방문 안내 */}
        <div className="bg-white rounded-lg shadow-md mt-4 p-4">
          <h3 className="text-xl font-bold">방문 안내</h3>
          <img
            src="/path/to/map.jpg"
            alt="지도"
            className="w-full h-40 object-cover rounded-lg mt-2"
          />
          <p className="text-sm text-gray-600 mt-2">
            📍 서울시 강남구 대치동 123
          </p>
          <p className="text-sm text-gray-600">주차 가능: 최대 200대</p>
        </div>
  
        {/* 사업자 정보 */}
        <div className="bg-white rounded-lg shadow-md mt-4 p-4">
          <h3 className="text-xl font-bold">사업자 정보</h3>
          <p>대표자: 김대표</p>
          <p>업체명: 대치웨딩컨벤션</p>
          <p>사업자등록번호: 000-00-00000</p>
        </div>
      </div>
    );
  }
  