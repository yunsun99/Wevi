package com.ssafy.wevi.dto.vendor;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class VendorResponseDto {
    private Integer id;
    private String vendorName;
    private Integer categoryId;
    private Integer doId;
    private String doName;
    private Integer sigunguId;
    private String sigunguName;
    private int minPrice;
    private String imageUrl;
}