package com.ssafy.wevi.dto.vendor;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class VendorCreateDto {
    // User Information
    private String email;
    private String password;

    // Vendor Information
    private String ownerName;
    private String ownerPhone;
    private String name;
    private String zonecode;
    private Integer doCode;
    private Integer sigunguCode;
    private String autoRoadAddress;
    private String addressDetail;
    private String phone;
    private String registrationNumber;
    private Integer category;
    private String businessHour;
    private String homepage;
    private String price;
    private String details;
    private boolean isIndoor;
    private int minPrice;
    private String subway;
    private String parkinglot;
}