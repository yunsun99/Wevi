package com.ssafy.wevi.dto.vendor;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class VendorSearchCondition {
    private Integer doId;
    private Integer sigunguId;
    private Integer categoryId;
    private String vendorName;
    private Boolean isIndoor; // 실내/실외 (웨딩홀 전용)
    private String sortDirection; // ASC, DESC
}
