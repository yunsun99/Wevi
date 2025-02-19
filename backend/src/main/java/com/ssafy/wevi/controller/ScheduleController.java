package com.ssafy.wevi.controller;

import com.ssafy.wevi.config.SecurityUtils;
import com.ssafy.wevi.domain.user.Customer;
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

    //===== 조회 (READ) =====//

    // 상담 상세 조회
    @GetMapping("/consultation/{scheduleId}")
    public ApiResponseDto<?> getConsultationDetail(@PathVariable Integer scheduleId) {
        // 로그인한 유저 ID 가져오기
        Integer userId = Integer.parseInt(SecurityUtils.getAuthenticatedUserId());

        ConsultationResponseDto consultationDto = scheduleService.getConsultationDetail(scheduleId, userId);

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
    @GetMapping("/contract/{scheduleId}")
    public ApiResponseDto<?> getContractDetail(@PathVariable Integer scheduleId) {// 로그인한 유저 ID 가져오기
        Integer userId = Integer.parseInt(SecurityUtils.getAuthenticatedUserId());

        ContractResponseDto contractDto = scheduleService.getContractDetail(scheduleId, userId);

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
    @GetMapping("/other-schedule/{scheduleId}")
    public ApiResponseDto<?> getOneOtherSchedule(@PathVariable Integer scheduleId) {// 로그인한 유저 ID 가져오기
        Integer userId = Integer.parseInt(SecurityUtils.getAuthenticatedUserId());

        OtherScheduleResponseDto otherScheduleDto = scheduleService.findOtherScheduleById(scheduleId, userId);
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
        Integer userId = Integer.parseInt(SecurityUtils.getAuthenticatedUserId());

        List<ScheduleResponseDto> scheduleList =  scheduleService.getAllSchedules(userId);

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
        Integer userId = Integer.parseInt(SecurityUtils.getAuthenticatedUserId());
        List<ConsultationResponseDto> consultationResponseList =  scheduleService.findAllConsultation(userId);

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
        Integer userId = Integer.parseInt(SecurityUtils.getAuthenticatedUserId());
        List<ContractResponseDto> consultationResponseList =  scheduleService.findAllContract(userId);

        return new ApiResponseDto<>(
                HttpStatus.OK.value(),
                true,
                "MiddleProcess found successfully.",
                consultationResponseList
        );
    }

    // 중간과정 모두 조회
    @GetMapping("/middle-process-steps")
    public ApiResponseDto<?> getMiddleProcessSteps() {
        // 로그인한 유저 ID 가져오기
        String userId = SecurityUtils.getAuthenticatedUserId();


        List<MiddleProcessStepResponseDto> middleProcessStepResponseDtoList =  scheduleService.getMiddleProcessStep(Integer.valueOf(userId));

        return new ApiResponseDto<>(
                HttpStatus.OK.value(),
                true,
                "MiddleProcessSteps found successfully.",
                middleProcessStepResponseDtoList
        );
    }
    
    // 지정된 소비자의 중간과정을 조회 (업체용)
    @GetMapping("/middle-process/progress/{userId}")
    public ApiResponseDto<?> getMiddleProcessProgress(@PathVariable Integer userId) {
        // 로그인한 유저 ID 가져오기
        String loginUserId = SecurityUtils.getAuthenticatedUserId();
        List<MiddleProcessResponseDto> middleProcessList =  scheduleService.getMiddleProcessProgress(userId, Integer.valueOf(loginUserId));

        return new ApiResponseDto<>(
                HttpStatus.OK.value(),
                true,
                "MiddleProcessProgress found successfully.",
                middleProcessList
        );
    }

    // ===== 등록 (CREATE) ===== //
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
    public ApiResponseDto<?> addContract(@RequestBody ContractCreateDto contractCreateDto) {
        // 로그인한 유저 ID 가져오기
        Integer userId = Integer.parseInt(SecurityUtils.getAuthenticatedUserId());
        User user = userRepository.findById(userId).orElseThrow();

        if (user instanceof Customer) {
            throw new IllegalArgumentException("업체만 계약을 등록할 수 있습니다.");
        }

        // 상담 등록
        ContractResponseDto contractResponseDto = scheduleService.addContract(contractCreateDto, userId);

        return new ApiResponseDto<>(
                HttpStatus.CREATED.value(),
                true,
                "Contract created successfully.",
                contractResponseDto
        );
    }
    // 수기일정 등록
    @PostMapping("/other-schedule/add")
    @ResponseStatus(HttpStatus.CREATED)
    public ApiResponseDto<?> addOtherSchedule(@RequestBody OtherScheduleCreateDto otherScheduleCreateDto) {
        // 로그인한 유저 ID 가져오기
        Integer userId = Integer.parseInt(SecurityUtils.getAuthenticatedUserId());

        // 상담 등록
        OtherScheduleResponseDto otherScheduleResponseDto = scheduleService.addOtherSchedule(otherScheduleCreateDto, userId);

        return new ApiResponseDto<>(
                HttpStatus.CREATED.value(),
                true,
                "OtherSchedule created successfully.",
                otherScheduleResponseDto
        );
    }

    // ===== 수정 (PATCH) ===== //
    @PatchMapping("/middle-process/complete/{scheduleId}")
    public ApiResponseDto<?> completeMiddleProcess(@PathVariable Integer scheduleId) {
        // 로그인한 유저 ID 가져오기
        Integer userId = Integer.parseInt(SecurityUtils.getAuthenticatedUserId());

        return new ApiResponseDto<>(
                HttpStatus.OK.value(),
                true,
                "MiddleProcess modified success.",
                scheduleService.completeMiddleProcess(scheduleId, userId)
        );
    }


    // ===== 삭제 (DELETE) ===== //
    @DeleteMapping("/{scheduleId}")
    private ApiResponseDto<?> removeSchedule (@PathVariable Integer scheduleId) {
        // 로그인한 유저 ID 가져오기
        Integer userId = Integer.parseInt(SecurityUtils.getAuthenticatedUserId());

        boolean result = scheduleService.deleteOneSchedule(scheduleId, userId);

        if (result)
            return new ApiResponseDto<>(
                    HttpStatus.NO_CONTENT.value(),
                    true,
                    "Schedule deleteded successfully.",
                    null
            );
        else
            return new ApiResponseDto<>(
                    HttpStatus.BAD_REQUEST.value(),
                    false,
                    "Schedule deleteded failed.",
                    null
            );
    }
}
