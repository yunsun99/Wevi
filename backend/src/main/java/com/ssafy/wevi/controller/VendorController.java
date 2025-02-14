package com.ssafy.wevi.controller;

import com.ssafy.wevi.config.SecurityUtils;
import com.ssafy.wevi.domain.user.Vendor;
import com.ssafy.wevi.dto.ApiResponseDto;
import com.ssafy.wevi.dto.vendor.*;
import com.ssafy.wevi.service.VendorService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
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

//    @GetMapping("/vendorlist/{doId}/{sigunguId}/{category}")
//    public ApiResponseDto<List<VendorResponseDto>> getVendorList(
//            @PathVariable Integer doId,
//            @PathVariable Integer sigunguId,
//            @PathVariable Integer category) {
//
//        List<VendorResponseDto> vendors = vendorService.findVendorsByLocationAndCategory(
//                doId, sigunguId, category);
//
//        if (vendors != null && !vendors.isEmpty()) {
//            return new ApiResponseDto<>(
//                    HttpStatus.OK.value(),
//                    true,
//                    "업체 목록 조회 성공",
//                    vendors
//            );
//        } else {
//            return new ApiResponseDto<>(
//                    HttpStatus.NO_CONTENT.value(),
//                    true,
//                    "업체 목록이 비어있습니다",
//                    null
//            );
//        }
//    }
    @GetMapping("/search")
    public ApiResponseDto<Page<VendorResponseDto>> searchVendors(
            @RequestParam(required = false) Integer doId,
            @RequestParam(required = false) Integer sigunguId,
            @RequestParam(required = false) Integer categoryId,
            @RequestParam(required = false) String vendorName,
            @RequestParam(required = false) Boolean isIndoor,
            @RequestParam(defaultValue = "ASC") String sortDirection,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        try {
            // 검색 조건 설정
            VendorSearchCondition condition = new VendorSearchCondition();
            condition.setDoId(doId);
            condition.setSigunguId(sigunguId);
            condition.setCategoryId(categoryId);
            condition.setVendorName(vendorName);
            condition.setIsIndoor(isIndoor);
            condition.setSortDirection(sortDirection);

            // 페이징 정보 설정
            Pageable pageable = PageRequest.of(page, size);

            // 검색 실행
            Page<Vendor> vendorPage = vendorService.searchVendors(condition, pageable);

            // Entity -> DTO 변환
            Page<VendorResponseDto> responseDto = vendorPage.map(vendor ->
                    VendorResponseDto.builder()
                            .id(vendor.getUserId())
                            .vendorName(vendor.getName())
                            .categoryId(vendor.getCategory().getId())
                            .doId(vendor.getSigunguCode().getDoId())
                            .doName(vendor.getSigunguCode().getDoEntity().getDoName())
                            .sigunguId(vendor.getSigunguCode().getSigunguId())
                            .sigunguName(vendor.getSigunguCode().getSigunguName())
                            .minPrice(vendor.getMinPrice())

                            // 필요한 다른 필드들 추가
                            .build()
            );

            if (responseDto.isEmpty()) {
                return new ApiResponseDto<>(
                        HttpStatus.NO_CONTENT.value(),
                        true,
                        "업체 목록이 비어있습니다",
                        null
                );
            }

            return new ApiResponseDto<>(
                    HttpStatus.OK.value(),
                    true,
                    "업체 목록 조회 성공",
                    responseDto
            );

        } catch (Exception e) {
            return new ApiResponseDto<>(
                    HttpStatus.INTERNAL_SERVER_ERROR.value(),
                    false,
                    "업체 목록 조회 중 오류가 발생했습니다: " + e.getMessage(),
                    null
            );
        }
    }

    @GetMapping("/{vendorId}")
    public ApiResponseDto<VendorDetailResponseDto> getVendorById(@PathVariable Integer vendorId) {
        VendorDetailResponseDto vendorDetailResponseDto = vendorService.findVendorById(vendorId);

        if (vendorDetailResponseDto != null) {
            return new ApiResponseDto<>(
                    HttpStatus.OK.value(),
                    true,
                    "업체 상세 조회 성공",
                    vendorDetailResponseDto
            );
        } else {
            return new ApiResponseDto<>(
                    HttpStatus.BAD_REQUEST.value(),
                    false,
                    "해당 ID의 업체가 존재하지 않습니다.",
                    null
            );
        }
    }

    @GetMapping("/{vendorId}/reviews")
    public ApiResponseDto<List<ReviewDto>> getReviewListByVendorId(@PathVariable Integer vendorId) {
        List<ReviewDto> reviews = vendorService.getReviewListByVendorId(vendorId);
        if (reviews != null && !reviews.isEmpty()) {
            return new ApiResponseDto<>(
                    HttpStatus.OK.value(),
                    true,
                    "리뷰 목록 조회 성공",
                    reviews
            );
        } else {
            return new ApiResponseDto<>(
                    HttpStatus.NO_CONTENT.value(),
                    true,
                    "리뷰가 없습니다.",
                    null
            );
        }
    }

    @PostMapping("/{vendorId}/reviews")
    public ApiResponseDto<ReviewDto> createReview(@PathVariable Integer vendorId, @RequestBody ReviewDto reviewDto) {
        Integer customerId = Integer.valueOf(SecurityUtils.getAuthenticatedUserId());

        ReviewDto review = vendorService.createReview(vendorId, customerId, reviewDto);
        return new ApiResponseDto<>(
                HttpStatus.OK.value(),
                true,
                "리뷰 생성 성공",
                review
        );
    }

    @PatchMapping("/reviews/{reviewId}")
    public ApiResponseDto<ReviewDto> updateReview(@PathVariable Integer reviewId, @RequestBody ReviewDto reviewDto) {
//        Integer customerId = Integer.valueOf(SecurityUtils.getAuthenticatedUserId());
//        if (reviewDto.getCustomerId() != customerId) {
//            return new ApiResponseDto<>(
//                    HttpStatus.BAD_REQUEST.value(),
//                    false,
//                    "리뷰를 업데이트할 권한이 없습니다.",
//                    null
//            );
//        }

        ReviewDto review = vendorService.updateReview(reviewId, reviewDto);
        if (review != null) {
            return new ApiResponseDto<>(
                    HttpStatus.OK.value(),
                    true,
                    "리뷰 업데이트 성공",
                    review
            );
        } else {
            return new ApiResponseDto<>(
                    HttpStatus.BAD_REQUEST.value(),
                    false,
                    "리뷰 업데이트 실패",
                    null
            );
        }
    }

    @DeleteMapping("/reviews/{reviewId}")
    public ApiResponseDto<ReviewDto> deleteReview(@PathVariable Integer reviewId) {
        vendorService.deleteReview(reviewId);
        return new ApiResponseDto<>(
                HttpStatus.OK.value(),
                true,
                "리뷰 삭제 성공",
                null
        );
    }
}
