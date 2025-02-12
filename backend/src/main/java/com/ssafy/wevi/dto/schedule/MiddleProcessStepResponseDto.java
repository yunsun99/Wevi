package com.ssafy.wevi.dto.schedule;

import com.ssafy.wevi.enums.MiddleProcessStatus;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
// 계약 등록 시 입력해야 할 중간과정의 단계를 조회 (방문해야하는 일정만 넘겨줄 것임)
public class MiddleProcessStepResponseDto {
    private int scheduleId;
    private String title;
    private Integer categoryId;
    private String categoryName;
    private Integer stepId; // 단계 ID
    private String stepName; // 중간 단계명
    private MiddleProcessStatus status; // 상태
    private String completeDate;  // 완료일
    private String completeTime;  // 완료시간
}
