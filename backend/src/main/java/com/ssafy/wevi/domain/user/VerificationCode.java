package com.ssafy.wevi.domain.user;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "VerificationCodes")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class VerificationCode {
    @Id
    private String email;

    private String code;
    private LocalDateTime expiresTime;

    @Builder
    public VerificationCode(String email, String code, LocalDateTime expiresTime) {
        this.email = email;
        this.code = code;
        this.expiresTime = expiresTime;
    }

}
