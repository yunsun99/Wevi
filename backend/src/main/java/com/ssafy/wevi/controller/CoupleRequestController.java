package com.ssafy.wevi.controller;

import com.ssafy.wevi.config.SecurityUtils;
import com.ssafy.wevi.domain.CoupleRequest;
import com.ssafy.wevi.dto.ApiResponseDto;
import com.ssafy.wevi.dto.CoupleRequestDto;
import com.ssafy.wevi.dto.CoupleRequestUpdateDto;
import com.ssafy.wevi.service.CoupleRequestService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/couple-requests")
@RequiredArgsConstructor
@Slf4j
public class CoupleRequestController {

    private final CoupleRequestService coupleRequestService;

    // 커플 요청 보내기
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ApiResponseDto<CoupleRequest> createCoupleRequest(@RequestBody CoupleRequestDto coupleRequestDto) {
        Integer customerId = Integer.valueOf(SecurityUtils.getAuthenticatedUserId());

        CoupleRequest coupleRequestResponse = coupleRequestService.createCoupleRequest(customerId, coupleRequestDto.getSpouseEmail());

        return new ApiResponseDto<>(
                HttpStatus.CREATED.value(),
                true,
                "CoupleRequest created successfully.",
                coupleRequestResponse
        );
    }

    // 커플 요청 응답 보내기
    @PatchMapping
    @ResponseStatus(HttpStatus.OK)
    public ApiResponseDto<CoupleRequest> updateCoupleRequest(@RequestBody CoupleRequestUpdateDto coupleRequestResponseDto) {
        Integer customerId = Integer.valueOf(SecurityUtils.getAuthenticatedUserId());

        CoupleRequest coupleRequestResponse = coupleRequestService.updateCoupleRequest(customerId, coupleRequestResponseDto.getStatus());

        // 커플 요청이 거절된 경우
        if (coupleRequestResponse == null) {
            return new ApiResponseDto<>(
                    HttpStatus.OK.value(),
                    true,
                    "CoupleRequest rejected successfully.",
                    null
            );
        }

        // 커플 요청이 수락된 경우
        return new ApiResponseDto<>(
                HttpStatus.OK.value(),
                true,
                "CoupleRequest updated successfully.",
                coupleRequestResponse
        );
    }
}
