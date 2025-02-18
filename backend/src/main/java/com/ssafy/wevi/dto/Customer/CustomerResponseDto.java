package com.ssafy.wevi.dto.Customer;

import com.ssafy.wevi.domain.CoupleRequest;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

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
    private String spouseName;
    private String spouseNickname;
    private String coupleUpdatedAt;
    private Integer sentRequestId;
    private String sentRequestNickname;
    private Integer receivedRequestId;
    private String receivedRequestNickname;
}
