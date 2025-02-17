package com.ssafy.wevi.controller;

import com.ssafy.wevi.config.SecurityUtils;
import com.ssafy.wevi.dto.ApiResponseDto;
import com.ssafy.wevi.dto.FcmTokenRequestDto;
import com.ssafy.wevi.dto.Notifications.NotificationResponseDto;
import com.ssafy.wevi.dto.Notifications.NotificationsUpdateDto;
import com.ssafy.wevi.dto.UserEmail.UserEmailRequestDto;
import com.ssafy.wevi.dto.UserEmail.UserEmailVerifyRequestDto;
import com.ssafy.wevi.dto.UserEmail.UserEmailVerifyResponseDto;
import com.ssafy.wevi.service.NotificationService;
import com.ssafy.wevi.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@Slf4j
public class UserController {
    private final UserService userService;
    private final NotificationService notificationService;

    @PostMapping("/fcm-token")
    public ApiResponseDto<Void> saveFcmToken(@RequestBody FcmTokenRequestDto fcmTokenRequestDto) {
        Integer userId = Integer.valueOf(SecurityUtils.getAuthenticatedUserId());
        userService.updateFcmToken(userId, fcmTokenRequestDto.getToken());
        return new ApiResponseDto<>(
                HttpStatus.NO_CONTENT.value(),
                true,
                "FcmToken saved successfully.",
                null
        );
    }

    // 알림 내역 가져오기
    @GetMapping("/notifications")
    public ApiResponseDto<List<NotificationResponseDto>> getNotifications() {
        Integer userId = Integer.valueOf(SecurityUtils.getAuthenticatedUserId());

        List<NotificationResponseDto> notificationList = notificationService.getNotifications(userId);

        return new ApiResponseDto<>(
                HttpStatus.OK.value(),
                true,
                "Notifications found successfully",
                notificationList
        );
    }

    // 알림 내역 읽음 처리하기
    @PatchMapping("/notifications")
    public ApiResponseDto<List<NotificationResponseDto>> markNotificationsAsRead(@RequestBody NotificationsUpdateDto notificationsUpdateDto) {
        // 로그인 여부 체크
        SecurityUtils.isAuthenticated();

        List<NotificationResponseDto> notificationList = notificationService.markNotificationsAsRead(notificationsUpdateDto.getNotificationIds());

        return new ApiResponseDto<>(
                HttpStatus.OK.value(),
                true,
                "Notifications updated successfully",
                notificationList
        );
    }

    //이메일 중복 확인
    @PostMapping("/existEmail") //이메일인증
    public ApiResponseDto<Void> existsEmail(@RequestBody UserEmailRequestDto requestDto) {
        Boolean user = userService.getUserByEmail(requestDto.getEmail());
        if (user == false) { //중복확인 통과
            return new ApiResponseDto<>(
                    HttpStatus.OK.value(),
                    true,
                    "사용가능한 이메일 주소입니다!",
                    null
            );
        } else {
            return new ApiResponseDto<>(
                    HttpStatus.BAD_REQUEST.value(),
                    false,
                    "중복된 이메일이 있습니다.",
                    null
            );
        }
    }

    //인증 번호 전송
    @PostMapping("/sendEmail")
    public ApiResponseDto<Void> sendEmail(@RequestBody UserEmailRequestDto requestDto) {
        userService.sendCodeToEmail(requestDto.getEmail());
        return new ApiResponseDto<>(
                HttpStatus.OK.value(),
                true,
                "Send Email successfully",
                null
        );
    }

    //이메일 인증
    @PostMapping("/verifyEmail")
    public ApiResponseDto<UserEmailVerifyResponseDto> verifyEmail(@RequestBody UserEmailVerifyRequestDto requestDto) {
        boolean isVerified = userService.verifyCode(requestDto.getEmail(), requestDto.getVerificationCode());
        UserEmailVerifyResponseDto responseDto = new UserEmailVerifyResponseDto();
        responseDto.setVerified(isVerified);
        responseDto.setMessage(isVerified ? "Email verified successfully." : "Invalid or expired verification code.");

        if(isVerified) {
            return new ApiResponseDto<>(
                    HttpStatus.OK.value(),
                    true,
                    "VerifyEmail successfully",
                    responseDto
            );
        }
        else {
            return new ApiResponseDto<>(
                    HttpStatus.BAD_REQUEST.value(),
                    false,
                    "VerifyEmail Fail",
                    responseDto
            );
        }
    }
}
