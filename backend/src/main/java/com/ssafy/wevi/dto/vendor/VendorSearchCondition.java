package com.ssafy.wevi.dto.vendor;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class VendorSearchCondition {
    private Integer doId;
    private Integer sigunguId;
    private String category;
    private String name;
    private String location; // 실내/실외 (웨딩홀 전용)
    private String sortDirection; // ASC, DESC
}
