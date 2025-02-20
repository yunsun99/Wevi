package com.ssafy.wevi.repository;

import com.ssafy.wevi.domain.user.VerificationCode;
import jakarta.validation.constraints.Email;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.Optional;

@Repository
public interface EmailRepository extends JpaRepository<VerificationCode, Integer> {
    Optional<VerificationCode> findByEmailAndCode(String email, String code);

    void deleteByExpiresTimeBefore(LocalDateTime now);
}