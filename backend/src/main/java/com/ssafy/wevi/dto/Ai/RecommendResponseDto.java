package com.ssafy.wevi.dto.Ai;

import com.ssafy.wevi.dto.vendor.VendorDetailResponseDto;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class RecommendResponseDto {
    private Integer recommendId;
    private Integer customerId;
    private String weddingHallRequest;
    private String studioRequest;
    private String dressRequest;
    private String makeUpRequest;
    private VendorDetailResponseDto weddingHallVendor;
    private VendorDetailResponseDto studioVendor;
    private VendorDetailResponseDto dressVendor;
    private VendorDetailResponseDto makeUpVendor;
}
