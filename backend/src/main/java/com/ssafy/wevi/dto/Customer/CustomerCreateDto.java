package com.ssafy.wevi.dto.Customer;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CustomerCreateDto {
    private String email;
    private String nickname;
    private String name;
    private String password;
    private String phone;
    private String zonecode;
    private String autoRoadAddress;
    private String addressDetail;
}
