package com.ssafy.wevi.dto.AudioSummary;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@NoArgsConstructor
public class AudioSummaryResponseDto {
    private Integer id;
//    private String originalFileUrl;  // 원본 파일 URL
//    private String convertedFileUrl; // 변환된 WAV 파일 URL (없을 수도 있음)
    private String status; // ✅ 분석 상태 (PENDING, PROCESSING, COMPLETED)
    private String summaryResult; // AI 분석 결과 (JSON 형태)
}
