package com.ssafy.wevi.controller;

import com.ssafy.wevi.config.SecurityUtils;
import com.ssafy.wevi.dto.ApiResponseDto;
import com.ssafy.wevi.dto.FcmTokenRequestDto;
import com.ssafy.wevi.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@Slf4j
public class UserController {
    private final UserService userService;

    @PostMapping("/fcm-token")
    public ApiResponseDto<Void> saveFcmToken(@RequestBody FcmTokenRequestDto fcmTokenRequestDto) {
        String userId = SecurityUtils.getAuthenticatedUserId(); // 현재 로그인한 사용자 ID 가져오기
        userService.updateFcmToken(Integer.valueOf(userId), fcmTokenRequestDto.getToken());
        return new ApiResponseDto<>(
                HttpStatus.NO_CONTENT.value(),
                true,
                "FcmToken saved successfully.",
                null
        );
    }
}
