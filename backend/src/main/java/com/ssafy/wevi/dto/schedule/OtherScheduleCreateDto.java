package com.ssafy.wevi.dto.schedule;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class OtherScheduleCreateDto{
    // 일정 공통
    private String startDate;
    private String startTime;
    private String endDate;
    private String endTime;
    private String title;

    // 수기일정 별도 컬럼
    private String detail;  // 세부내용
}
