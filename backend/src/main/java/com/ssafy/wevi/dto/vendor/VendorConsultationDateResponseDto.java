package com.ssafy.wevi.dto.vendor;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Builder
public class VendorConsultationDateResponseDto {
    private Integer vendorId;
    private List<AvailableDateDto> availableDates;

    @Getter
    @Setter
    @AllArgsConstructor
    public static class AvailableDateDto {
        private String date;
        private boolean isAvailable;
    }
}


