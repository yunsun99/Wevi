package com.ssafy.wevi.dto.CoupleRequest;

import com.ssafy.wevi.domain.user.Customer;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class CoupleRequestResponseDto {
    private Integer coupleRequestId;
    private Integer senderId;
    private Integer receiverId;
    private String status;
}
