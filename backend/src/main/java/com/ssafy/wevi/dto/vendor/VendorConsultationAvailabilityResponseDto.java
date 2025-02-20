package com.ssafy.wevi.dto.vendor;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Builder
public class VendorConsultationAvailabilityResponseDto {
    private Integer vendorId;
    private boolean availability;
}
