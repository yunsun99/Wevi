package com.ssafy.wevi.dto.vendor;

import com.ssafy.wevi.dto.ImageDto;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class VendorDetailResponseDto {
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
    private LocalDateTime createdAt;
    private List<ImageDto> Images;
}
