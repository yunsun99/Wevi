package com.ssafy.wevi.dto.Ai;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class AudioSummaryResponseDto {
    private Integer loginUserId;
    private Integer scheduleId;
    private String scheduleTitle;
    private Integer categoryId;
    private String categoryName;
    private Integer audioSummaryId;
    private String status; // ✅ 분석 상태 (PENDING, PROCESSING, COMPLETED)
    private String summaryResult; // AI 분석 결과 (JSON 형태)
    
    // 일정 공동
//    private LocalDateTime startTime;
//    private LocalDateTime endTime;
    // 상담 별도
//    private String request;
//    // 소비자 데이터
//    private Integer customerId;
//    private String customerName;
//    private String customerPhone;
//
//    // 업체 데이터
//    private Integer vendorId;
//    private String vendorName;
//    private String vendorAutoRoadAddress;
//    private String vendorPhone;
//    private String vendorImageUrl;


}