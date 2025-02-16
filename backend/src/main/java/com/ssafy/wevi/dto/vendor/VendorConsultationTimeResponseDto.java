package com.ssafy.wevi.dto.vendor;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Builder
public class VendorConsultationTimeResponseDto {
    private Integer vendorId;
    private List<VendorConsultationTimeResponseDto.AvailableTimeDto> availableTime;

    @Getter
    @Setter
    @AllArgsConstructor
    public static class AvailableTimeDto {
        private String time;
        private boolean isAvailable;
    }
}
