package com.ssafy.wevi.controller;

import com.ssafy.wevi.config.SecurityUtils;
import com.ssafy.wevi.dto.ApiResponseDto;
import com.ssafy.wevi.dto.CoupleRequest.CoupleRequestCancelDto;
import com.ssafy.wevi.dto.CoupleRequest.CoupleRequestDto;
import com.ssafy.wevi.dto.CoupleRequest.CoupleRequestResponseDto;
import com.ssafy.wevi.dto.CoupleRequest.CoupleRequestUpdateDto;
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

    // 커플요청 보내기
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ApiResponseDto<CoupleRequestResponseDto> createCoupleRequest(@RequestBody CoupleRequestDto coupleRequestDto) {
        Integer customerId = Integer.valueOf(SecurityUtils.getAuthenticatedUserId());

        CoupleRequestResponseDto coupleRequestResponse = coupleRequestService.createCoupleRequest(customerId, coupleRequestDto.getSpouseEmail());

        return new ApiResponseDto<>(
                HttpStatus.CREATED.value(),
                true,
                "CoupleRequest created successfully.",
                coupleRequestResponse
        );
    }

    // 커플요청 응답 보내기
    @PatchMapping
    @ResponseStatus(HttpStatus.OK)
    public ApiResponseDto<CoupleRequestResponseDto> updateCoupleRequest(@RequestBody CoupleRequestUpdateDto coupleRequestUpdateDto) {
        Integer customerId = Integer.valueOf(SecurityUtils.getAuthenticatedUserId());

        CoupleRequestResponseDto coupleRequestResponse = coupleRequestService.updateCoupleRequest(customerId, coupleRequestUpdateDto.getStatus());

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

    // 커플요청 취소하기
    @DeleteMapping("/cancel")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public ApiResponseDto<Void> cancelCoupleRequest(@RequestBody CoupleRequestCancelDto coupleRequestCancelDto) {
        Integer customerId = Integer.valueOf(SecurityUtils.getAuthenticatedUserId());

        coupleRequestService.cancelCoupleRequest(customerId, coupleRequestCancelDto.getCoupleRequestId());

        return new ApiResponseDto<>(
                HttpStatus.NO_CONTENT.value(),
                true,
                "CoupleRequest canceled successfully.",
                null
        );
    }

    // 커플요청 끊기
    @DeleteMapping("/disconnect")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public ApiResponseDto<Void> deleteCoupleRequest() {
        Integer customerId = Integer.valueOf(SecurityUtils.getAuthenticatedUserId());

        coupleRequestService.deleteCoupleRequest(customerId);

        return new ApiResponseDto<>(
                HttpStatus.NO_CONTENT.value(),
                true,
                "CoupleRequest disconnected successfully.",
                null
        );
    }
}
