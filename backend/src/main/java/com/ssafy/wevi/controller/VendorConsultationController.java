package com.ssafy.wevi.controller;

import com.ssafy.wevi.config.SecurityUtils;
import com.ssafy.wevi.dto.ApiResponseDto;
import com.ssafy.wevi.dto.vendor.VendorConsultationDateResponseDto;
import com.ssafy.wevi.dto.vendor.VendorConsultationTimeResponseDto;
import com.ssafy.wevi.service.VendorConsultationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.YearMonth;
import java.util.Map;

@RestController
@RequestMapping("/api/vendors/consultation")
@RequiredArgsConstructor
@Slf4j
public class VendorConsultationController {

    private final VendorConsultationService vendorConsultationService;

    @GetMapping("/available-dates")
    public ApiResponseDto<VendorConsultationDateResponseDto> getVendorConsultationDates(
            @RequestParam Integer vendorId,
            @RequestParam int year,
            @RequestParam int month) {
        // 로그인 여부 체크
        SecurityUtils.isAuthenticated();

        YearMonth yearMonth = YearMonth.of(year, month);

        VendorConsultationDateResponseDto availableConsulatationDates = vendorConsultationService.getAvailableConsultationDates(vendorId, yearMonth);

        return new ApiResponseDto<>(
                HttpStatus.OK.value(),
                true,
                "Available consultation dates found successfully.",
                availableConsulatationDates
                );
    }

    @GetMapping("/available-times")
    public ApiResponseDto<VendorConsultationTimeResponseDto> getVendorConsultationTimes(
            @RequestParam Integer vendorId,
            @RequestParam int year,
            @RequestParam int month,
            @RequestParam int day) {
        LocalDate date = LocalDate.of(year, month, day);
        VendorConsultationTimeResponseDto availableTimes = vendorConsultationService.getAvailableTimes(vendorId, date);
        return new ApiResponseDto<>(
                HttpStatus.OK.value(),
                true,
                "Available consultation times found by vendorId and date successfully.",
                availableTimes
                );
    }
}
