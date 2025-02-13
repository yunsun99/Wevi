package com.ssafy.wevi.dto.schedule;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
public class ContractResponseDto {
    // 일정 공통
    private Integer loginUserId;
    private int scheduleId;
//    private LocalDateTime startTime;
//    private LocalDateTime endTime;
    private String startDate;
    private String startTime;
    private String endDate;
    private String endTime;
    private String title;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private Integer categoryId;
    private String categoryName;

    // 계약 별도 컬럼
    private int price;  // 계약금액
//    private LocalDateTime contractDate; // 계약일
    private String detail;  // 계약 세부사항


    // 객체 직접 참조 X
//    private Customer customer;
//    private Vendor vendor;

    // 소비자 데이터
    private Integer customerId;
    private String customerName;
    private String customerPhone;

    // 업체 데이터
    private Integer vendorId;
    private String vendorName;
    private String vendorAutoRoadAddress;
    private String vendorPhone;
}
