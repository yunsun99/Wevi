package com.ssafy.wevi.dto.schedule;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class ContractCreateDto {
    // 일정 공통
    private String startDate;   // 계약한 날짜 (끝난 날짜 동일)
    private String startTime;   // 계약한 시간
    private String title;       // 일정 제목
    private int price;          // 계약금액
    private String detail;      // 계약 세부사항
    private String customerEmail;  // 소비자이메일
    private List<MiddleProcessCreateDto> middleProcessList; // 중간과정 입력

    // 중간과정 날짜, 시간 각각 입력
}
