package com.ssafy.wevi.dto.schedule;

public class ContractCreateDto {
//                    "startDate": "2025-02-10",
//                    "startTime": "19:00",
//                    "endDate": "2025-02-10",
//                    "endTime": "19:00",
//                    "title": "웨딩홀 계약",
                //    "price": 10000000,
                //    "contractDate": "2025-02-10",
                //    "contractTime": "11:20"
                //    "detail": "asdasdasd"
                //    "customerId": 1
                //    "vendorId": 2
// 일정 공통
    private String startDate;
    private String startTime;
    private String endDate;
    private String endTime;
    private String title;
    private int price;  // 계약금액
    private String contractDate; // 계약일
    private String contractTime; // 계약일
    private String detail;  // 계약 세부사항
    private Integer customerId;
    private Integer vendorId;

    // 중간과정 날짜, 시간 각각 입력
}
