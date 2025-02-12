package com.ssafy.wevi.service;

import com.ssafy.wevi.domain.MiddleProcessStep;
import com.ssafy.wevi.domain.schedule.*;
import com.ssafy.wevi.domain.user.Customer;
import com.ssafy.wevi.domain.user.User;
import com.ssafy.wevi.domain.user.Vendor;
import com.ssafy.wevi.dto.schedule.*;
import com.ssafy.wevi.enums.MiddleProcessStatus;
import com.ssafy.wevi.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class ScheduleService {

    private final ScheduleRepository scheduleRepository;
    private final CustomerRepository customerRepository;
    private final VendorRepository vendorRepository;
    private final CategoryRepository categoryRepository;
    private final UserRepository userRepository;
    private final MiddleProcessStepRepository middleProcessStepRepository;
    // ========= 등록 ========//
    // 상담 등록
    @Transactional
    public ConsultationResponseDto addConsultation(ConsultationCreateDto consultationCreateDto, Integer customerId) {
        Consultation consultation = new Consultation();

        consultation.setStartDateTime(stringToLocalDateTime(consultationCreateDto.getStartDate(),consultationCreateDto.getStartTime()));
        consultation.setEndDateTime(stringToLocalDateTime(consultationCreateDto.getStartDate(),consultationCreateDto.getStartTime()).plusHours(1));   // 1시간 추가!
        consultation.setTitle(consultationCreateDto.getTitle());
        consultation.setRequest(consultationCreateDto.getRequest());
        consultation.setDtype("consultation");
//        consultation.setCreatedAt(LocalDateTime.now());
        consultation.setCustomer(customerRepository.findById(customerId).orElseThrow());
        consultation.setVendor(vendorRepository.findById(consultationCreateDto.getVendorId()).orElseThrow());
        consultation.setCategory(consultation.getVendor().getCategory());

        scheduleRepository.save(consultation);

        return toConsultationResponseDto(consultation);
    }
    @Transactional
    public ContractResponseDto addContract(ContractCreateDto contractCreateDto, Integer vendorId) {
        Contract contract = new Contract();

        Vendor vendor = vendorRepository.findById(vendorId).orElseThrow();
        Customer customer = customerRepository.findByEmail(contractCreateDto.getCustomerEmail()).orElseThrow();

        // 계약 등록
        contract.setStartDateTime(stringToLocalDateTime(contractCreateDto.getStartDate(),contractCreateDto.getStartTime()));
        contract.setEndDateTime(stringToLocalDateTime(contractCreateDto.getStartDate(),contractCreateDto.getStartTime()));
        contract.setTitle(contractCreateDto.getTitle());
        contract.setPrice(contractCreateDto.getPrice());
        contract.setDetail(contractCreateDto.getDetail());
        contract.setDtype("contract");
//        contract.setCreatedAt(LocalDateTime.now());
        contract.setCustomer(customer);
        contract.setVendor(vendor);
        contract.setCategory(vendor.getCategory());

        scheduleRepository.save(contract);

        // 중간과정 등록
        for (MiddleProcessCreateDto middleProcessCreateDto : contractCreateDto.getMiddleProcessList()) {
            MiddleProcess middleProcess = new MiddleProcess();
            MiddleProcessStep middleProcessStep = middleProcessStepRepository.findById(middleProcessCreateDto.getStepId()).orElseThrow();

            middleProcess.setTitle(middleProcessCreateDto.getStepName());
            middleProcess.setMiddleProcessStep(middleProcessStep);
//            middleProcess.setCreatedAt(LocalDateTime.now());
            middleProcess.setContract(contract);
            middleProcess.setCategory(contract.getCategory());
            middleProcess.setDetail(middleProcessStep.getName());
            middleProcess.setVendor(vendor);
            middleProcess.setCustomer(customer);
            
            // 계약은 이미 됐으므로 COMPLETED 처리
            if (middleProcessCreateDto.getStepName().contains("계약")) {
                middleProcess.setStatus(MiddleProcessStatus.COMPLETED);
                middleProcess.setCompleteDateTime(contract.getStartDateTime());
            } else {
                middleProcess.setStatus(MiddleProcessStatus.PENDING);
            }
            
            // 방문 일정은 startDate, Time 받기
            if (middleProcessCreateDto.getStartDate() != null) {
                middleProcess.setStartDateTime(stringToLocalDateTime(contractCreateDto.getStartDate(),contractCreateDto.getStartTime()));
                middleProcess.setEndDateTime(stringToLocalDateTime(contractCreateDto.getStartDate(),contractCreateDto.getStartTime()));
            }

            scheduleRepository.save(middleProcess);
        }

        List<MiddleProcessStep> list = middleProcessStepRepository.findAllByCategoryId(contract.getCategory().getId());

        for (MiddleProcessStep middleProcessStep : list) {
            MiddleProcess middleProcess = new MiddleProcess();

            if (middleProcessStep.isVisit()) continue;

            middleProcess.setTitle(middleProcessStep.getName());
            middleProcess.setMiddleProcessStep(middleProcessStep);
//            middleProcess.setCreatedAt(LocalDateTime.now());
            middleProcess.setStatus(MiddleProcessStatus.PENDING);
            middleProcess.setContract(contract);
            middleProcess.setCategory(contract.getCategory());
            middleProcess.setDetail(middleProcessStep.getName());
            middleProcess.setVendor(vendor);
            middleProcess.setCustomer(customer);

            scheduleRepository.save(middleProcess);
        }

        return toContractResponseDto(contract);
    }

    //==========조회=========//

    // 상담 단건 조회
    @Transactional(readOnly = true)
    public ConsultationResponseDto findConsultationById(Integer id) {
        Schedule schedule = scheduleRepository.findById(id)
                .orElseThrow();

        if (schedule instanceof Consultation) {
            return toConsultationResponseDto((Consultation) schedule);
        } else {
            throw new IllegalArgumentException("해당 ID는 상담 일정이 아닙니다.");
        }
    }
    // 계약 단건 조회
    @Transactional(readOnly = true)
    public ContractResponseDto findContractById(Integer id) {
        Schedule schedule = scheduleRepository.findById(id)
                .orElseThrow();

        if (schedule instanceof Contract) {
            return toContractResponseDto((Contract) schedule);
        } else {
            throw new IllegalArgumentException("해당 ID는 계약 일정이 아닙니다.");
        }
    }
    // 중간과정 단건 조회
//    @Transactional(readOnly = true)
//    public MiddleProcessDto findMiddleProcessById(Integer id) {
//        Schedule schedule = scheduleRepository.findById(id)
//                .orElseThrow();
//
//        if (schedule instanceof MiddleProcess) {
//            return toMiddleProcessDto((MiddleProcess) schedule);
//        } else {
//            throw new IllegalArgumentException("해당 ID는 중간과정 일정이 아닙니다.");
//        }
//    }
    // 수기등록 일정 단건 조회
    @Transactional(readOnly = true)
    public OtherScheduleDto findOtherScheduleById(Integer id) {
        Schedule schedule = scheduleRepository.findById(id)
                .orElseThrow();

        if (schedule instanceof OtherSchedule) {
            return toOtherScheduleDto((OtherSchedule) schedule);
        } else {
            throw new IllegalArgumentException("해당 ID는 수기등록 일정이 아닙니다.");
        }
    }
    // 일정 전체 조회
    @Transactional(readOnly = true)
    public List<ScheduleResponseDto> findAllSchedules(Integer userId) {
        // 업체인지 소비자인지 확인하기 위해 유저 조회
        User user = userRepository.findById(userId).orElseThrow();

        List<Schedule> scheduleList = new ArrayList<>();
        // 업체일 때
        if (user instanceof Vendor) {
            System.out.println("업체다");
            scheduleList = scheduleRepository.findAllScheduleByVendorId(userId);

            // 소비자일 때
        } else {
        Customer spouse = customerRepository.findById(userId).orElseThrow().getSpouse();
        // 커플 여부 확인
            if (spouse == null) {
                System.out.println("커플아니다");
                scheduleList = scheduleRepository.findAllScheduleByCustomerId(userId);
            } else {
                System.out.println("커플이다");
                scheduleList = scheduleRepository.findAllScheduleWithSpouse(userId, spouse.getUserId());
            }
        }
        // 반환타입으로 변환하여 반환
        if (scheduleList.size() > 0) {
            return toCommonScheduleList(scheduleList);
        } else {
            throw new IllegalArgumentException("해당하는 일정이 없습니다.");
        }
    }
    // 중간 과정(진행도) 조회
    @Transactional(readOnly = true)
    public List<MiddleProcessResponseDto> findAllMiddleProcesses(Integer userId) {
        // 업체인지 소비자인지 확인하기 위해 유저 조회
        User user = userRepository.findById(userId).orElseThrow();

        List<Schedule> scheduleList = new ArrayList<>();

        // 업체일 때:
        if (user instanceof Vendor) {
            scheduleList = scheduleRepository.findAllMiddleProcessByVendorId(userId);

            // 소비자일 때
        } else {
            Customer spouse = customerRepository.findById(userId).orElseThrow().getSpouse();
            if (spouse == null) {
                scheduleList = scheduleRepository.findAllMiddleProcessByCustomerId(userId);
            } else {
                scheduleList = scheduleRepository.findAllMiddleProcessWithSpouse(userId, spouse.getUserId());
            }
        }
        // 반환타입으로 변환하여 반환
        if (scheduleList.size() > 0) {
            return toMiddleProcessList(scheduleList);
        } else {
            throw new IllegalArgumentException("해당하는 일정이 없습니다.");
        }
    }
    // 예약 내역 조회
    @Transactional(readOnly = true)
    public List<ConsultationResponseDto> findAllConsultation(Integer userId) {
        // 업체인지 소비자인지 확인하기 위해 유저 조회
        User user = userRepository.findById(userId).orElseThrow();

        List<Schedule> scheduleList = new ArrayList<>();

        // 업체일 때:
        if (user instanceof Vendor) {
            scheduleList = scheduleRepository.findAllConsultationByVendorId(userId);
            // 소비자일 때
        } else {
            Customer spouse = customerRepository.findById(userId).orElseThrow().getSpouse();
            if (spouse == null) {
                scheduleList = scheduleRepository.findAllConsultationByCustomerId(userId);
            } else {
                scheduleList = scheduleRepository.findAllConsultationWithSpouse(userId, spouse.getUserId());
            }
        }
        // 반환타입으로 변환하여 반환
        if (scheduleList.size() > 0) {
            return toConsultationList(scheduleList);
        } else {
            throw new IllegalArgumentException("해당하는 일정이 없습니다.");
        }
    }
    // 계약 내역 조회
    @Transactional(readOnly = true)
    public List<ContractResponseDto> findAllContract(Integer userId) {
        // 업체인지 소비자인지 확인하기 위해 유저 조회
        User user = userRepository.findById(userId).orElseThrow();

        List<Schedule> scheduleList = new ArrayList<>();

        // 업체일 때:
        if (user instanceof Vendor) {
            scheduleList = scheduleRepository.findAllContractByVendorId(userId);
            // 소비자일 때
        } else {
            Customer spouse = customerRepository.findById(userId).orElseThrow().getSpouse();
            if (spouse == null) {
                scheduleList = scheduleRepository.findAllContractByCustomerId(userId);
            } else {
                scheduleList = scheduleRepository.findAllContractWithSpouse(userId, spouse.getUserId());
            }
        }
        // 반환타입으로 변환하여 반환
        if (scheduleList.size() > 0) {
            return toContractList(scheduleList);
        } else {
            throw new IllegalArgumentException("해당하는 일정이 없습니다.");
        }
    }


    // ==================== 기타 로직 ==================== //
    private List<ContractResponseDto> toContractList(List<Schedule> scheduleList) {
        List<ContractResponseDto> contractResponseList = new ArrayList<>();
        for (int i=0; i<scheduleList.size(); i++) {
            contractResponseList.add(toContractResponseDto((Contract) scheduleList.get(i)));
        }
        return contractResponseList;
    }

    private List<ConsultationResponseDto> toConsultationList(List<Schedule> scheduleList) {
        List<ConsultationResponseDto> consultationResponseList = new ArrayList<>();

        for (int i=0; i<scheduleList.size(); i++) {
            consultationResponseList.add(toConsultationResponseDto((Consultation) scheduleList.get(i)));
        }

        return consultationResponseList;
    }

    // Schedule 리스트 -> MiddleProcess 리스트 타입 변환 메서드
    private List<MiddleProcessResponseDto> toMiddleProcessList(List<Schedule> scheduleList) {
        List<MiddleProcessResponseDto> middleProcessResponseList = new ArrayList<>();

        for (int i=0; i<scheduleList.size(); i++) {
            middleProcessResponseList.add(toMiddleProcessResponseDto((MiddleProcess) scheduleList.get(i)));
        }

        return middleProcessResponseList;
    }
    
    // MiddleProcess 타입 -> MiddleProcessResponseDto 형식으로 변환
    private MiddleProcessResponseDto toMiddleProcessResponseDto(MiddleProcess schedule) {
        MiddleProcessResponseDto middleProcessResponseDto = new MiddleProcessResponseDto();

        // 날짜 변환
        if(schedule.getStartDateTime() != null) {
            String[] startDateTime = dateTimeToString(schedule.getStartDateTime());
            String[] endDateTime = dateTimeToString(schedule.getEndDateTime());
            middleProcessResponseDto.setStartDate(startDateTime[0]);
            middleProcessResponseDto.setStartTime(startDateTime[1]);
            middleProcessResponseDto.setEndDate(endDateTime[0]);
            middleProcessResponseDto.setEndTime(endDateTime[1]);
        }
        if (schedule.getCompleteDateTime() != null) {
            String[] completeDateTime = dateTimeToString(schedule.getCompleteDateTime());
            middleProcessResponseDto.setCompleteDate(completeDateTime[0]);
            middleProcessResponseDto.setCompleteTime(completeDateTime[1]);
        }

        middleProcessResponseDto.setScheduleId(schedule.getScheduleId());
        middleProcessResponseDto.setTitle(schedule.getTitle());
        middleProcessResponseDto.setCreatedAt(schedule.getCreatedAt());
        middleProcessResponseDto.setUpdatedAt(schedule.getUpdatedAt());
        middleProcessResponseDto.setDetail(schedule.getDetail());
        middleProcessResponseDto.setStepId(schedule.getMiddleProcessStep().getId());
        middleProcessResponseDto.setStepName(schedule.getMiddleProcessStep().getName());
        middleProcessResponseDto.setStatus(schedule.getStatus());
        middleProcessResponseDto.setCategoryId(schedule.getCategory().getId());
        middleProcessResponseDto.setCategoryName(schedule.getCategory().getName());

        return middleProcessResponseDto;
    }
    public LocalDateTime stringToLocalDateTime(String date, String time) {
        // 날짜 및 시간 패턴 지정 (Date: "YYYY-MM-DD", Time: "HH:mm")
        DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        DateTimeFormatter timeFormatter = DateTimeFormatter.ofPattern("HH:mm");

        // String -> LocalDate 변환
        LocalDate resultDate = LocalDate.parse(date, dateFormatter);

        // String -> LocalTime 변환
        LocalTime resultTime = LocalTime.parse(time, timeFormatter);

        // LocalDate+LocalTime -> LocalDateTime 변환
        LocalDateTime resultDateTime = LocalDateTime.of(resultDate, resultTime);

        return resultDateTime;
    }
    public String[] dateTimeToString (LocalDateTime dateTime) {
        // 변환 포맷 지정
        DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        DateTimeFormatter timeFormatter = DateTimeFormatter.ofPattern("HH:mm");

        // LocalDateTime → String 변환
        String dateStr = dateTime.toLocalDate().format(dateFormatter);
        String timeStr = dateTime.toLocalTime().format(timeFormatter);

        // 배열로 반환
        return new String[]{dateStr, timeStr};
    }
    private List<ScheduleResponseDto> toCommonScheduleList(List<Schedule> scheduleList) {
        List<ScheduleResponseDto> commonSchedulelist = new ArrayList<>();

        for (int i=0; i<scheduleList.size(); i++) {
            // 중간과정인 경우, isvisit = false 인 것은 반환하지 않음
            if (scheduleList.get(i) instanceof MiddleProcess &&
                    !((MiddleProcess) scheduleList.get(i)).getMiddleProcessStep().isVisit())
                continue;

            commonSchedulelist.add(toScheduleResponseDto(scheduleList.get(i)));
        }

        return commonSchedulelist;
    }

    private ScheduleResponseDto toScheduleResponseDto(Schedule schedule) {
        ScheduleResponseDto scheduleResponseDto = new ScheduleResponseDto();

        // 날짜 형식 변환
        String[] startDateTime = dateTimeToString(schedule.getStartDateTime());
        String[] endDateTime = dateTimeToString(schedule.getEndDateTime());
        scheduleResponseDto.setStartDate(startDateTime[0]);
        scheduleResponseDto.setStartTime(startDateTime[1]);
        scheduleResponseDto.setEndDate(endDateTime[0]);
        scheduleResponseDto.setEndTime(endDateTime[1]);

        scheduleResponseDto.setScheduleId(schedule.getScheduleId());
        scheduleResponseDto.setTitle(schedule.getTitle());
        scheduleResponseDto.setCreatedAt(schedule.getCreatedAt());
        scheduleResponseDto.setUpdatedAt(schedule.getUpdatedAt());
        scheduleResponseDto.setDtype(schedule.getDtype());
        scheduleResponseDto.setCategoryId(schedule.getCategory().getId());
        scheduleResponseDto.setCategoryName(schedule.getCategory().getName());

        // 수기 등록 일정이 아니면 업체명 추가
        if (!(schedule instanceof OtherSchedule)) {
            scheduleResponseDto.setVendorName(schedule.getVendor().getName());
        }
        // 중간과정 일정이면 방문일정(isVisit=true)인 일정만 추가 & 계약ID 추가
        if (schedule instanceof MiddleProcess) {
            scheduleResponseDto.setContractId(((MiddleProcess) schedule).getContract().getScheduleId());
        }

        return scheduleResponseDto;
    }

    private OtherScheduleDto toOtherScheduleDto(OtherSchedule schedule) {
        OtherScheduleDto otherScheduleDto = new OtherScheduleDto();

        // 날짜 형식 변환
        String[] startDateTime = dateTimeToString(schedule.getStartDateTime());
        String[] endDateTime = dateTimeToString(schedule.getEndDateTime());
        otherScheduleDto.setStartDate(startDateTime[0]);
        otherScheduleDto.setStartTime(startDateTime[1]);
        otherScheduleDto.setEndDate(endDateTime[0]);
        otherScheduleDto.setEndTime(endDateTime[1]);

        otherScheduleDto.setOtherScheduleId(schedule.getScheduleId());
//        otherScheduleDto.setStartTime(schedule.getStartDateTime());
//        otherScheduleDto.setEndTime(schedule.getEndDateTime());
        otherScheduleDto.setTitle(schedule.getTitle());
        otherScheduleDto.setCreatedAt(schedule.getCreatedAt());
        otherScheduleDto.setUpdatedAt(schedule.getUpdatedAt());
        otherScheduleDto.setCustomerName(schedule.getCustomer().getName());
        otherScheduleDto.setCustomerId(schedule.getCustomer().getUserId());
        otherScheduleDto.setDetail(schedule.getDetail());
        otherScheduleDto.setCategoryId(schedule.getCategory().getId());
        otherScheduleDto.setCategoryName(schedule.getCategory().getName());

        return otherScheduleDto;
    }


    private ContractResponseDto toContractResponseDto(Contract schedule) {
        ContractResponseDto contractDto = new ContractResponseDto();

        // 날짜 형식 변환
        String[] startDateTime = dateTimeToString(schedule.getStartDateTime());
        String[] endDateTime = dateTimeToString(schedule.getEndDateTime());
        contractDto.setStartDate(startDateTime[0]);
        contractDto.setStartTime(startDateTime[1]);
        contractDto.setEndDate(endDateTime[0]);
        contractDto.setEndTime(endDateTime[1]);

        contractDto.setScheduleId(schedule.getScheduleId());
//        contractDto.setStartTime(schedule.getStartDateTime());
//        contractDto.setEndTime(schedule.getEndDateTime());
        contractDto.setTitle(schedule.getTitle());
        contractDto.setCreatedAt(schedule.getCreatedAt());
        contractDto.setUpdatedAt(schedule.getUpdatedAt());
        contractDto.setCustomerId(schedule.getCustomer().getUserId());
        contractDto.setCustomerName(schedule.getCustomer().getName());
        contractDto.setCustomerPhone(schedule.getCustomer().getPhone());
        contractDto.setVendorId(schedule.getVendor().getUserId());
        contractDto.setVendorName(schedule.getVendor().getName());
        contractDto.setVendorAutoRoadAddress(schedule.getVendor().getAutoRoadAddress());
        contractDto.setVendorPhone(schedule.getVendor().getPhone());
        contractDto.setPrice(schedule.getPrice());
//        contractDto.setContractDate(schedule.getContractDate());
        contractDto.setDetail(schedule.getDetail());
        contractDto.setCategoryId(schedule.getCategory().getId());
        contractDto.setCategoryName(schedule.getCategory().getName());

        return contractDto;
    }

    private ConsultationResponseDto toConsultationResponseDto(Consultation consultation) {
        ConsultationResponseDto consultationDto = new ConsultationResponseDto();

        // 날짜 형식 변환
        String[] startDateTime = dateTimeToString(consultation.getStartDateTime());
        String[] endDateTime = dateTimeToString(consultation.getEndDateTime());
        consultationDto.setStartDate(startDateTime[0]);
        consultationDto.setStartTime(startDateTime[1]);
        consultationDto.setEndDate(endDateTime[0]);
        consultationDto.setEndTime(endDateTime[1]);

        consultationDto.setScheduleId(consultation.getScheduleId());
        consultationDto.setTitle(consultation.getTitle());
        consultationDto.setCreatedAt(consultation.getCreatedAt());
        consultationDto.setUpdatedAt(consultation.getUpdatedAt());
        consultationDto.setCustomerId(consultation.getCustomer().getUserId());
        consultationDto.setCustomerName(consultation.getCustomer().getName());
        consultationDto.setCustomerPhone(consultation.getCustomer().getPhone());
        consultationDto.setVendorId(consultation.getVendor().getUserId());
        consultationDto.setVendorName(consultation.getVendor().getName());
        consultationDto.setVendorAutoRoadAddress(consultation.getVendor().getAutoRoadAddress());
        consultationDto.setVendorPhone(consultation.getVendor().getPhone());
        consultationDto.setRequest(consultation.getRequest());
        consultationDto.setCategoryId(consultation.getCategory().getId());
        consultationDto.setCategoryName(consultation.getCategory().getName());

        return consultationDto;
    }
}
