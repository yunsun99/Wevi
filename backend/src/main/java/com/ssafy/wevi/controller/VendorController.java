package com.ssafy.wevi.controller;

import com.ssafy.wevi.dto.ApiResponseDto;
import com.ssafy.wevi.dto.vendor.DoDto;
import com.ssafy.wevi.dto.vendor.SigunguDto;
import com.ssafy.wevi.dto.vendor.VendorCreateDto;
import com.ssafy.wevi.dto.vendor.VendorDetailResponseDto;
import com.ssafy.wevi.service.VendorService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/vendors")
@RequiredArgsConstructor
@Slf4j
public class VendorController {

    private final VendorService vendorService;

    // 회원가입
    @PostMapping("/signup")
    @ResponseStatus(HttpStatus.CREATED)
    public ApiResponseDto<VendorDetailResponseDto> createVendor(@RequestBody VendorCreateDto vendorCreateDto) {
        VendorDetailResponseDto vendorDetailResponseDto = vendorService.createVendor(vendorCreateDto);

        return new ApiResponseDto<>(
                HttpStatus.CREATED.value(),
                true,
                "Vendor created successfully.",
                vendorDetailResponseDto
        );
    }

    @GetMapping("/dolist")
    public ApiResponseDto<List<DoDto>> getDoList() {
        log.debug("getDoList 호출");
        List<DoDto> list = vendorService.getDoList();
        if (list != null && !list.isEmpty()) {
            return new ApiResponseDto<>(
                    HttpStatus.OK.value(),
                    true,
                    "도 목록 조회 성공",
                    list
            );
        } else {
            return new ApiResponseDto<>(
                    HttpStatus.NO_CONTENT.value(),
                    true,
                    "도 목록이 비어있습니다",
                    null
            );
        }
    }

    @GetMapping("/sigungulist/{doId}")
    public ApiResponseDto<List<SigunguDto>> getSigunguList(@PathVariable Integer doId) {
        log.debug("getSigunguList 호출 - doIdx: {}", doId);
        if (doId == null || doId <= 0) {
            return new ApiResponseDto<>(
                    HttpStatus.BAD_REQUEST.value(),
                    false,
                    "잘못된 도 ID입니다",
                    null
            );
        }

        List<SigunguDto> list = vendorService.getSigunguList(doId);
        if (list != null && !list.isEmpty()) {
            return new ApiResponseDto<>(
                    HttpStatus.OK.value(),
                    true,
                    "시군구 목록 조회 성공",
                    list
            );
        } else {
            return new ApiResponseDto<>(
                    HttpStatus.NO_CONTENT.value(),
                    true,
                    "시군구 목록이 비어있습니다",
                    null
            );
        }
    }



}
