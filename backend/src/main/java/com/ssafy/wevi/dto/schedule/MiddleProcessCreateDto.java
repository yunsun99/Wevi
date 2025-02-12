package com.ssafy.wevi.dto.schedule;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

// 계약 등록 시 업체가 입력
// 소비자가 방문해야 하는 중간과정만 날짜를 받음
// 방문하지 않아도 되는 중간과정은 추가만 할 것
@Getter
@Setter
@NoArgsConstructor
public class MiddleProcessCreateDto {
    // 공통 입력
//    private String title;
//    private Integer categoryId;
//    private String categoryName;

    // 방문해야 하는 중간과정일 경우 입력
    private String startDate;   // 시작, 끝 날짜 동일
    private String startTime;
//    private String endDate;
//    private String endTime;

    // 중간과정 별도 컬럼
    private Integer stepId; // 단계 ID
    private String stepName; // 중간 단계명
}
