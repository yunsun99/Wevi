package com.ssafy.wevi.dto.Customer;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
public class CustomerResponseDto {
    private Integer userId;
    private String email;
    private String nickname;
    private String name;
    private String phone;
    private String zonecode;
    private String autoRoadAddress;
    private String addressDetail;
    private Integer spouseId;
}
