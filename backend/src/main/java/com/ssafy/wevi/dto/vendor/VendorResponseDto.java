package com.ssafy.wevi.dto.vendor;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class VendorResponseDto {
    private Integer vendorId;
    private String vendorName;
    private Integer categoryId;
    private String categoryName;
    private Integer doId;
    private String doName;
    private Integer sigunguId;
    private String sigunguName;
    private int minPrice;
    private String imageUrl;
}