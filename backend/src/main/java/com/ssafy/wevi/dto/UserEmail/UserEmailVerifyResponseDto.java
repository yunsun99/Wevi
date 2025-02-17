package com.ssafy.wevi.dto.UserEmail;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
@NoArgsConstructor
public class UserEmailVerifyResponseDto {
    private Boolean Verified;
    private String Message;
}
