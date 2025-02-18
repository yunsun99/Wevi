package com.ssafy.wevi.dto.Ai;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@NoArgsConstructor
public class AudioSummaryCreateDto {
    private Integer audioSummaryId;
    private String status; // ✅ 분석 상태 (PENDING, PROCESSING, COMPLETED, FAILED)
    private String summaryResult; // AI 분석 결과 (JSON 형태)
}
