package com.ssafy.wevi.dto.schedule;

import com.ssafy.wevi.enums.MiddleProcessStatus;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
@Getter
@Setter
@NoArgsConstructor
public class MiddleProcessResponseDto {
    private int scheduleId;
    private String startDate;
    private String startTime;
    private String endDate;
    private String endTime;
    private String title;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private Integer categoryId;
    private String categoryName;
    private Integer vendorId;
    private String vendorName;
    private Integer customerId;
    private String customerName;

    // 중간과정 별도 컬럼
    private Integer stepId; // 단계 ID
    private String detail;  // 세부내용
    private String stepName; // 중간 단계명
    private MiddleProcessStatus status; // 상태
    private String completeDate;  // 완료일
    private String completeTime;  // 완료시간
}
