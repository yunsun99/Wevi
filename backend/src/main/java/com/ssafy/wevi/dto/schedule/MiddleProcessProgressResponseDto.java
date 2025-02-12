package com.ssafy.wevi.dto.schedule;

import com.ssafy.wevi.enums.MiddleProcessStatus;

import java.time.LocalDateTime;

public class MiddleProcessProgressResponseDto {
    private int scheduleId;
    private String title;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private Integer categoryId;
    private String categoryName;

    // 중간과정 별도 컬럼
    private Integer stepId; // 단계 ID
    private String detail;  // 세부내용
    private String stepName; // 중간 단계명
    private MiddleProcessStatus status; // 상태
    private String completeDate;  // 완료일
    private String completeTime;  // 완료시간
}
