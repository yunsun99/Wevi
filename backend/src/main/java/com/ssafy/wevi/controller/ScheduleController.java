package com.ssafy.wevi.controller;

import com.ssafy.wevi.config.SecurityUtils;
import com.ssafy.wevi.domain.user.User;
import com.ssafy.wevi.dto.ApiResponseDto;
import com.ssafy.wevi.dto.schedule.*;
import com.ssafy.wevi.repository.ScheduleRepository;
import com.ssafy.wevi.repository.UserRepository;
import com.ssafy.wevi.service.CustomerService;
import com.ssafy.wevi.service.ScheduleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/schedules")
@RequiredArgsConstructor
public class ScheduleController {

    private final ScheduleService scheduleService;
    private final ScheduleRepository scheduleRepository;
    private final CustomerService customerService;
    private final UserRepository userRepository;

    //===== 조회 =====//

    // 상담 상세 조회
    @GetMapping("/consultation/{id}")
    public ApiResponseDto<?> getOneConsultation(@PathVariable Integer id) {
        ConsultationResponseDto consultationDto = scheduleService.findConsultationById(id);
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
        ContractResponseDto contractDto = scheduleService.findContractById(id);
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

        List<ScheduleResponseDto> scheduleList =  scheduleService.findAllSchedules(Integer.valueOf(customerId));

        return new ApiResponseDto<>(
                HttpStatus.OK.value(),
                true,
                "Schedules found successfully.",
                scheduleList
        );
    }

    // 진행도(중간과정) 조회
    @GetMapping("/progress")
    public ApiResponseDto<?> getAllMiddleProcess() {
        // 로그인한 유저 ID 가져오기
        String customerId = SecurityUtils.getAuthenticatedUserId();

        System.out.println("받음");

        List<MiddleProcessResponseDto> middleProcessList =  scheduleService.findAllMiddleProcesses(Integer.valueOf(customerId));

        return new ApiResponseDto<>(
                HttpStatus.OK.value(),
                true,
                "MiddleProcess found successfully.",
                middleProcessList
        );
    }

    // 상담 예약 내역 조회
    @GetMapping("/consultations")
    public ApiResponseDto<?> getAllConsultation() {
        // 로그인한 유저 ID 가져오기
        String userId = SecurityUtils.getAuthenticatedUserId();
        List<ConsultationResponseDto> consultationResponseList =  scheduleService.findAllConsultation(Integer.valueOf(userId));

        return new ApiResponseDto<>(
                HttpStatus.OK.value(),
                true,
                "MiddleProcess found successfully.",
                consultationResponseList
        );
    }
    // 계약 내역 조회
    @GetMapping("/contracts")
    public ApiResponseDto<?> getAllContract() {
        // 로그인한 유저 ID 가져오기
        String userId = SecurityUtils.getAuthenticatedUserId();
        List<ContractResponseDto> consultationResponseList =  scheduleService.findAllContract(Integer.valueOf(userId));

        return new ApiResponseDto<>(
                HttpStatus.OK.value(),
                true,
                "MiddleProcess found successfully.",
                consultationResponseList
        );
    }

    // ===== 상담 일정 추가 ===== //
    // 상담 일정 추가
    @PostMapping("/consultation/add")
    @ResponseStatus(HttpStatus.CREATED)
    public ApiResponseDto<ConsultationResponseDto> addConsultation(@RequestBody ConsultationCreateDto consultationCreateDto) {
        // 로그인한 유저 ID 가져오기
        String customerId = SecurityUtils.getAuthenticatedUserId();
        // 상담 등록
        ConsultationResponseDto consultationResponseDto = scheduleService.addConsultation(consultationCreateDto, Integer.valueOf(customerId));

        return new ApiResponseDto<>(
                HttpStatus.CREATED.value(),
                true,
                "Consultaion created successfully.",
                consultationResponseDto
        );
    }
    // 계약 등록 (업체)
    // 각 카테고리별 계약을 등록
    @PostMapping("/contract/add")
    @ResponseStatus(HttpStatus.CREATED)
    public ApiResponseDto<?> registContract(@RequestBody ContractCreateDto contractCreateDto) {
        // 로그인한 유저 ID 가져오기
        Integer userId = Integer.parseInt(SecurityUtils.getAuthenticatedUserId());
        User user = userRepository.findById(userId).orElseThrow();

            // 상담 등록
            ContractResponseDto contractResponseDto = scheduleService.addContract(contractCreateDto, userId);

            return new ApiResponseDto<>(
                    HttpStatus.CREATED.value(),
                    true,
                    "Contract created successfully.",
                    contractResponseDto
            );
    }
}
