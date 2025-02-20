package com.ssafy.wevi.dto.Customer;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CustomerUpdateDto {
    private String nickname;
    private String password;
    private String phone;
    private String zonecode;
    private String autoRoadAddress;
    private String addressDetail;
}
