package com.ssafy.wevi.controller;

import com.ssafy.wevi.config.SecurityUtils;
import com.ssafy.wevi.dto.ApiResponseDto;
import com.ssafy.wevi.dto.schedule.*;
import com.ssafy.wevi.repository.ScheduleRepository;
import com.ssafy.wevi.service.CustomerService;
import com.ssafy.wevi.service.ScheduleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/schedule")
@RequiredArgsConstructor
public class ScheduleController {

    private final ScheduleService scheduleService;
    private final ScheduleRepository scheduleRepository;
    private final CustomerService customerService;

    //===== 조회 =====//

    // 상담 상세 조회
    @GetMapping("/consultation/{id}")
    public ApiResponseDto<?> getOneConsultation(@PathVariable Integer id) {
        ConsultationDto consultationDto = scheduleService.findConsultationById(id);
        if (consultationDto == null) {
            return new ApiResponseDto<>(
                    HttpStatus.NOT_FOUND.value(),
                    false,
                    "Consultation not found.",
                    null
            );
        }
        return new ApiResponseDto<>(
                HttpStatus.OK.value(),
                true,
                "Consultation found successfully.",
                consultationDto
        );
    }
    // 계약 상세 조회
    @GetMapping("/contract/{id}")
    public ApiResponseDto<?> getOneContract(@PathVariable Integer id) {
        ContractDto contractDto = scheduleService.findContractById(id);
        if (contractDto == null) {
            return new ApiResponseDto<>(
                    HttpStatus.NOT_FOUND.value(),
                    false,
                    "Contract not found.",
                    null
            );
        }
        return new ApiResponseDto<>(
                HttpStatus.OK.value(),
                true,
                "Contract found successfully.",
                contractDto
        );
    }
    // 중간과정 상세 조회
    @GetMapping("/middle-process/{id}")
    public ApiResponseDto<?> getOneMiddleProcess(@PathVariable Integer id) {
        MiddleProcessDto middleProcessDto = scheduleService.findMiddleProcessById(id);
        if (middleProcessDto == null) {
            return new ApiResponseDto<>(
                    HttpStatus.NOT_FOUND.value(),
                    false,
                    "MiddleProcess not found.",
                    null
            );
        }
        return new ApiResponseDto<>(
                HttpStatus.OK.value(),
                true,
                "MiddleProcess found successfully.",
                middleProcessDto
        );
    }
    // 수기등록 일정 상세 조회
    @GetMapping("/other-schedule/{id}")
    public ApiResponseDto<?> getOneOtherSchedule(@PathVariable Integer id) {
        OtherScheduleDto otherScheduleDto = scheduleService.findOtherScheduleById(id);
        if (otherScheduleDto == null) {
            return new ApiResponseDto<>(
                    HttpStatus.NOT_FOUND.value(),
                    false,
                    "OtherSchedule not found.",
                    null
            );
        }
        return new ApiResponseDto<>(
                HttpStatus.OK.value(),
                true,
                "OtherSchedule found successfully.",
                otherScheduleDto
        );
    }

    // 일정 전체 조회
    @GetMapping()
    public ApiResponseDto<?> getAllSchedule() {
        // 로그인한 유저 ID 가져오기
        String customerId = SecurityUtils.getAuthenticatedUserId();

        List<CommonScheduleDto> scheduleList =  scheduleService.findAllSchedules(Integer.valueOf(customerId));

        if (scheduleList.size() <= 0) {
            return new ApiResponseDto<>(
                    HttpStatus.NOT_FOUND.value(),
                    false,
                    "CommonSchedule not found.",
                    null
            );
        }
        return new ApiResponseDto<>(
                HttpStatus.OK.value(),
                true,
                "CommonSchedule found successfully.",
                scheduleList
        );
    }

    // ===== 상담 일정 추가 ===== //
    // 상담 일정 추가
    @PostMapping("/consultation/add")
    @ResponseStatus(HttpStatus.CREATED)
    public ApiResponseDto<ConsultationDto> addConsultation(@RequestBody ConsultationDto consultationDto) {
        // 로그인한 유저 ID 가져오기
        String customerId = SecurityUtils.getAuthenticatedUserId();
        // 상담 등록
        ConsultationDto consultationResponseDto = scheduleService.addConsultation(consultationDto, Integer.valueOf(customerId));

        return new ApiResponseDto<>(
                HttpStatus.CREATED.value(),
                true,
                "Consultaion created successfully.",
                consultationResponseDto
        );
    }
}
