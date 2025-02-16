package com.ssafy.wevi.dto.UserEmail;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
@NoArgsConstructor
public class UserEmailVerifyRequestDto {
    private String Email;
    private String VerificationCode;
}
