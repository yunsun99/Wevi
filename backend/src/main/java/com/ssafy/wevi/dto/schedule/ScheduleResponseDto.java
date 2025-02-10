package com.ssafy.wevi.dto.schedule;

import com.ssafy.wevi.enums.MiddleProcessStatus;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
@Getter
@Setter
@NoArgsConstructor
public class ScheduleResponseDto {
    // 공통
    private int id;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private String title;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    // 상담
    private String request; // 요청사항

    // 계약
    private int price;  // 계약금액
    private LocalDateTime contractDate; // 계약일

    // 중간과정
    private MiddleProcessStatus status;

    private String detail;   // 계약, 중간, 수기 공통
}