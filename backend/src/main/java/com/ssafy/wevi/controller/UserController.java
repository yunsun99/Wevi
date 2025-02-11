package com.ssafy.wevi.controller;

import com.ssafy.wevi.config.SecurityUtils;
import com.ssafy.wevi.dto.ApiResponseDto;
import com.ssafy.wevi.dto.FcmTokenRequestDto;
import com.ssafy.wevi.dto.Notifications.NotificationResponseDto;
import com.ssafy.wevi.dto.Notifications.NotificationsUpdateDto;
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
}
