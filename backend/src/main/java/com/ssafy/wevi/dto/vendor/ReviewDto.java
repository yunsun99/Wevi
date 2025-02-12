package com.ssafy.wevi.dto.vendor;

import com.ssafy.wevi.dto.ImageDto;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter @Setter
public class ReviewDto {
    private Integer reviewId;           // 리뷰 ID
    private String content;             // 내용
    private LocalDateTime createdAt;    // 생성 시간
    private LocalDateTime updatedAt;    // 수정 시간
    private Integer customerId;         // 소비자 ID
    private Integer vendorId;           // 업체 ID
    private List<ImageDto> Images;      // 이미지 Url
}
