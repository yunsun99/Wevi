package com.ssafy.wevi.dto.schedule;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
public class ScheduleResponseDto {
    // 일정 공통
    private Integer scheduleId;
//    private LocalDateTime startTime;
//    private LocalDateTime endTime;
    private String startDate;
    private String startTime;
    private String endDate;
    private String endTime;
    private String title;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private String dtype;
    private Integer categoryId;
    private String categoryName;

    // 중간 과정의 경우 계약 상세정보 조회를 위해 계약ID 제공
    private Integer contractId;

    // 수기 등록이 아닐 경우 업체명까지 추가
    private String vendorName;
}
