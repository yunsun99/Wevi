package com.ssafy.wevi.dto.schedule;

import com.ssafy.wevi.enums.MiddleProcessStatus;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
public class MiddleProcessDto{
    // 일정 공통
    private int id;
//    private LocalDateTime startTime;
//    private LocalDateTime endTime;
    private String startDate;
    private String startTime;
    private String endDate;
    private String endTime;
    private String title;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    // 중간과정 별도 컬럼
    private String detail;  // 세부내용
    private String stepName; // 중간 단계명
    private MiddleProcessStatus status; // 상태


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
