package com.ssafy.wevi.dto.schedule;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
public class OtherScheduleDto{
    // 일정 공통
    private int otherScheduleId;
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

    // 수기일정 별도 컬럼
    private String detail;  // 세부내용

    // 객체 직접 참조 X
//    private Customer customer;
//    private Vendor vendor;

    // 소비자 데이터
    private Integer customerId;
    private String customerName;
//    private String customerPhone;
}
