package com.ssafy.wevi.service;

import com.ssafy.wevi.domain.MiddleProcessStep;
import com.ssafy.wevi.domain.schedule.*;
import com.ssafy.wevi.domain.user.Customer;
import com.ssafy.wevi.domain.user.User;
import com.ssafy.wevi.domain.user.Vendor;
import com.ssafy.wevi.dto.schedule.*;
import com.ssafy.wevi.enums.MiddleProcessStatus;
import com.ssafy.wevi.enums.NotificationType;
import com.ssafy.wevi.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.*;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

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
    private final NotificationService notificationService;

    // ========= 등록 ========//

    // 상담 등록
    @Transactional
    public ConsultationResponseDto addConsultation(ConsultationCreateDto consultationCreateDto, Integer customerId) {
        Consultation consultation = new Consultation();

        // 이미 같은 시간에 예약되어 있는지 조회
        LocalDateTime startDateTime = stringToLocalDateTime(consultationCreateDto.getStartDate(),consultationCreateDto.getStartTime());

        if (!scheduleRepository.findConflictConsultation(startDateTime, startDateTime.plusHours(1), consultationCreateDto.getVendorId()).isEmpty()) {
            System.out.println("===========있음==========="+scheduleRepository.findConflictConsultation(startDateTime, startDateTime.plusHours(1), consultationCreateDto.getVendorId()).get(0).getScheduleId());
            throw new IllegalArgumentException("해당 업체에 이미 예약된 상담이 존재합니다.");
        }

        Customer customer = customerRepository.findById(customerId).orElseThrow();
        Vendor vendor = vendorRepository.findById(consultationCreateDto.getVendorId()).orElseThrow();

        consultation.setStartDateTime(startDateTime);
        consultation.setEndDateTime(startDateTime.plusHours(1));   // 1시간 추가!
        consultation.setTitle(consultationCreateDto.getTitle());
        consultation.setRequest(consultationCreateDto.getRequest());
        consultation.setDtype("consultation");
//        consultation.setCreatedAt(LocalDateTime.now());
        consultation.setCustomer(customer);
        consultation.setVendor(vendor);
        consultation.setCategory(consultation.getVendor().getCategory());


        scheduleRepository.save(consultation);

        notificationService.createScheduleNotification(vendor, "\uD83C\uDF40 새로운 상담이 예약되었습니다.", dateTimeToString(startDateTime)[0] + " " + dateTimeToString(startDateTime)[1] + " " + customer.getName() + " 고객님", consultation, NotificationType.CONSULTATION_REGISTERED.name());
        notificationService.createScheduleNotification(customer.getSpouse(), "\uD83C\uDF40 연인이 일정을 추가하였습니다.", dateTimeToString(startDateTime)[0] + " " + dateTimeToString(startDateTime)[1] + " " + vendor.getName(), consultation, NotificationType.CONTRACT_REGISTERED.name());

        return toConsultationResponseDto(consultation, customerId);
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
                middleProcess.setStartDateTime(stringToLocalDateTime(middleProcessCreateDto.getStartDate(),middleProcessCreateDto.getStartTime()));
                middleProcess.setEndDateTime(stringToLocalDateTime(middleProcessCreateDto.getStartDate(),middleProcessCreateDto.getStartTime()));

                String date = dateTimeToString(middleProcess.getStartDateTime())[0];
                String time = dateTimeToString(middleProcess.getStartDateTime())[1];
                String stepName = middleProcessStep.getName();

                notificationService.createScheduleNotification(customer, "\uD83C\uDF40 일정 등록 - " + vendor.getName(), date + " " + time + " " + stepName, contract, NotificationType.SCHEDULE_REGISTERED.name());
                notificationService.createScheduleNotification(customer.getSpouse(), "\uD83C\uDF40 일정 등록 - " + vendor.getName(), date + " " + time + " " + stepName, contract, NotificationType.SCHEDULE_REGISTERED.name());

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

        notificationService.createScheduleNotification(customer, "\uD83C\uDF40 " + vendor.getName(), "업체와의 계약이 성사되었습니다.", contract, NotificationType.CONTRACT_REGISTERED.name());
        notificationService.createScheduleNotification(customer.getSpouse(), "\uD83C\uDF40 " + vendor.getName(), "연인과 업체 간의 계약이 성사되었습니다.", contract, NotificationType.CONTRACT_REGISTERED.name());

        return toContractResponseDto(contract, vendorId);
    }

    public OtherScheduleResponseDto addOtherSchedule(OtherScheduleCreateDto otherScheduleCreateDto, Integer userId) {
        OtherSchedule otherSchedule = new OtherSchedule();

        // 이미 같은 시간에 예약되어 있는지 조회
        LocalDateTime startDateTime = stringToLocalDateTime(otherScheduleCreateDto.getStartDate(),otherScheduleCreateDto.getStartTime());
        LocalDateTime endDateTime = stringToLocalDateTime(otherScheduleCreateDto.getEndDate(),otherScheduleCreateDto.getEndTime());

        if (!scheduleRepository.findConflictSchedule(startDateTime, endDateTime, userId).isEmpty()) {
            throw new IllegalArgumentException("이미 겹치는 일정이 존재합니다.");
        }

        otherSchedule.setStartDateTime(startDateTime);
        otherSchedule.setEndDateTime(endDateTime);
        otherSchedule.setTitle(otherScheduleCreateDto.getTitle());
        otherSchedule.setDetail(otherScheduleCreateDto.getDetail());
        otherSchedule.setDtype("other_schedule");
        otherSchedule.setCategory(categoryRepository.findById(5).orElseThrow());

        User user = userRepository.findById(userId).orElseThrow();
        
        // 일정 등록자가 소비자인지 업체인지 구분하여 저장
        if (user instanceof Customer) {
            otherSchedule.setCustomer((Customer) user);
        } else {
            otherSchedule.setVendor((Vendor) user);
        }

        scheduleRepository.save(otherSchedule);

        return toOtherScheduleResponseDto(otherSchedule, userId);
    }

    //==========조회=========//

    // 상담 단건 조회
    @Transactional(readOnly = true)
    public ConsultationResponseDto getConsultationDetail(Integer scheduleId, Integer userId) {
        Schedule schedule = scheduleRepository.findById(scheduleId)
                .orElseThrow();

        User user = userRepository.findById(userId).orElseThrow();


        // 본인 일정인지 확인
        if (isUserSchedule(user, schedule)) {
            if (schedule instanceof Consultation) {
                return toConsultationResponseDto((Consultation) schedule, userId);
            } else {
                throw new IllegalArgumentException("해당 일정은 상담 일정이 아닙니다.");
            }
        }
        else {
            throw new IllegalArgumentException("본인과 관련한 일정이 아닙니다.");
        }

    }

    // 유저 본인과 관련한 일정인지 여부를 확인
    private boolean isUserSchedule(User user, Schedule schedule) {
        // 소비자일 때
        if (user instanceof Customer) {
            Customer spouse = ((Customer) user).getSpouse();
            return Objects.equals(user.getUserId(), schedule.getCustomer().getUserId()) ||
                    (((Customer) user).getSpouse() != null && Objects.equals(((Customer) user).getSpouse().getUserId(), schedule.getCustomer().getUserId()));
//            // 본인 것인지 확인
//            if (user.getUserId() == schedule.getCustomer().getUserId()) {
//                return true;
//            } else {
//                if (spouse == null) {
//                    return false;
//                } else {
//                    if (spouse.getUserId() == schedule.getCustomer().getUserId()) {
//                        return true;
//                    }
//                    return false;
//                }
//            }
        } 
        // 업체일 때
        else {
            // 본인 것인지 확인
            return Objects.equals(user.getUserId(), schedule.getVendor().getUserId());
        }
    }

    // 계약 단건 조회
    @Transactional(readOnly = true)
    public ContractResponseDto getContractDetail(Integer scheduleId, Integer userId) {
        Schedule schedule = scheduleRepository.findById(scheduleId)
                .orElseThrow();

        User user = userRepository.findById(userId).orElseThrow();

        // 본인 일정인지 확인
        if (isUserSchedule(user, schedule)) {
            if (schedule instanceof Contract) {
                return toContractResponseDto((Contract) schedule, userId);
            } else {
                throw new IllegalArgumentException("해당 ID는 계약 일정이 아닙니다.");
            }
        }
        else {
            throw new IllegalArgumentException("본인과 관련한 일정이 아닙니다.");
        }
    }

    // 수기등록 일정 단건 조회
    @Transactional(readOnly = true)
    public OtherScheduleResponseDto findOtherScheduleById(Integer scheduleId, Integer userId) {
        Schedule schedule = scheduleRepository.findById(scheduleId)
                .orElseThrow();

        User user = userRepository.findById(userId).orElseThrow();

        // 본인 일정인지 확인
        if (isUserSchedule(user, schedule)) {
            if (schedule instanceof OtherSchedule) {
                return toOtherScheduleResponseDto((OtherSchedule) schedule, userId);
            } else {
                throw new IllegalArgumentException("해당 ID는 수기등록 일정이 아닙니다.");
            }
        }
        else {
            throw new IllegalArgumentException("본인과 관련한 일정이 아닙니다.");
        }
    }

    // 일정 전체 조회
    @Transactional(readOnly = true)
    public List<ScheduleResponseDto> getAllSchedules(Integer userId) {
        // 업체인지 소비자인지 확인하기 위해 유저 조회
        User user = userRepository.findById(userId).orElseThrow();

        List<Schedule> scheduleList = new ArrayList<>();
        // 업체일 때
        if (user instanceof Vendor) {
            scheduleList = scheduleRepository.findAllScheduleByVendorId(userId);

            // 소비자일 때
        } else {
//        Customer spouse = customerRepository.findById(userId).orElseThrow().getSpouse();
        // 커플 여부 확인
            if (((Customer)user).getSpouse() == null) {
                scheduleList = scheduleRepository.findAllScheduleByCustomerId(userId);
            } else {
                scheduleList = scheduleRepository.findAllScheduleWithSpouse(userId, ((Customer)user).getSpouse().getUserId());
            }
        }
        // 반환타입으로 변환하여 반환
        if (scheduleList.size() > 0) {
            return toScheduleResponseDtoList(scheduleList, userId);
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
            return toConsultationList(scheduleList, userId);
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
            return toContractList(scheduleList, userId);
        } else {
            throw new IllegalArgumentException("해당하는 일정이 없습니다.");
        }
    }

    // 카테고리별 중간과정 단계 조회
    public List<MiddleProcessStepResponseDto> getMiddleProcessStep(Integer userId) {
        User user = userRepository.findById(userId).orElseThrow();

        if (user instanceof Vendor) {
            Integer categoryId = ((Vendor) user).getCategory().getId();
            // 카테고리 조회
            return toMiddleProcessStepResponseList(middleProcessStepRepository.findAllByCategoryId(categoryId));
        } else {
            throw new IllegalArgumentException("업체만 계약을 등록할 수 있습니다.");
        }
    }

    private List<MiddleProcessStepResponseDto> toMiddleProcessStepResponseList(List<MiddleProcessStep> middleProcessStepList) {
        List<MiddleProcessStepResponseDto> middleProcessStepResponseDtoList = new ArrayList<>();

        for (MiddleProcessStep middleProcessStep : middleProcessStepList) {
            middleProcessStepResponseDtoList.add(toMiddleProcessStepResponseDto(middleProcessStep));
        }

        return middleProcessStepResponseDtoList;
    }

    private MiddleProcessStepResponseDto toMiddleProcessStepResponseDto(MiddleProcessStep middleProcessStep) {
        MiddleProcessStepResponseDto middleProcessStepResponseDto = new MiddleProcessStepResponseDto();

        middleProcessStepResponseDto.setCategoryId(middleProcessStep.getCategory().getId());
        middleProcessStepResponseDto.setCategoryName(middleProcessStep.getCategory().getName());
        middleProcessStepResponseDto.setStepId(middleProcessStep.getMiddleProcessStepId());
        middleProcessStepResponseDto.setStepName(middleProcessStep.getName());
        middleProcessStepResponseDto.setVisit(middleProcessStep.isVisit());

        return middleProcessStepResponseDto;
    }

    // ====== 삭제 ====== //
    @Transactional
    public boolean deleteOneSchedule(Integer scheduleId, Integer userId) {
        // 업체인지 소비자인지 확인하기 위해 유저 조회
        User user = userRepository.findById(userId).orElseThrow();
        Schedule schedule = scheduleRepository.findById(scheduleId).orElseThrow();

        if (schedule instanceof Consultation) {
            // 상담 취소는 소비자만 가능
            if (user instanceof Customer) {
                // 본인 일정이거나 커플 일정이면 삭제 가능
               if (schedule.getCustomer().getUserId() != userId && schedule.getCustomer().getUserId() != ((Customer) user).getSpouse().getUserId()) {
                   // 예외처리
                   throw new IllegalArgumentException("본인의 일정이거나 커플의 일정이 아니면 삭제할 수 없습니다.");
               }

               scheduleRepository.deleteById(scheduleId);
               return true;

            } else {
                // 예외처리
                throw new IllegalArgumentException("업체는 상담 일정을 삭제할 수 없습니다.");
            }
        } else if( schedule instanceof Contract ) {
            // 계약일 땐 업체만 가능, 계약 + 중간과정 삭제
            if (user instanceof Vendor) {
                // 본인 일정일 경우에만 삭제 가능
                if (userId != schedule.getVendor().getUserId()) {
                    // 예외처리
                    throw new IllegalArgumentException("본인의 일정이 아니면 계약을 삭제할 수 없습니다.");
                }
                // 계약에 속한 중간과정들 먼저 삭제..
                scheduleRepository.deleteAll(((Contract) schedule).getMiddleProcessList());
                // 계약도 삭제
                scheduleRepository.deleteById(scheduleId);
                return true;
            } else {
                // 예외처리
                throw new IllegalArgumentException("소비자는 계약 일정을 삭제할 수 없습니다.");
            }
            // 중간과정일 땐 삭제 불가 에러
        } else if (schedule instanceof MiddleProcess){
        // 예외처리
            throw new IllegalArgumentException("중간과정 단일건은 삭제 불가합니다.");
            
        } else {        // 수기 등록 일정일 때
            // 소비자일 경우
            if (user instanceof Customer) {
                // 본인 일정이거나 커플 일정이면 삭제 가능
                if (schedule.getCustomer().getUserId() != userId && schedule.getCustomer().getUserId() != ((Customer) user).getSpouse().getUserId()) {
                    // 예외처리
                    throw new IllegalArgumentException("본인의 일정이거나 커플의 일정이 아니면 삭제할 수 없습니다.");
                }
                scheduleRepository.deleteById(scheduleId);
                return true;

                // 업체일 경우
            } else {
                // 본인 일정일 경우에만 삭제 가능
                if (userId != schedule.getVendor().getUserId()) {
                    // 예외처리
                    throw new IllegalArgumentException("본인의 일정이 아니면 계약을 삭제할 수 없습니다.");
                }
                scheduleRepository.deleteById(scheduleId);
                return true;
            }
        }
    }



    // ==================== 기타 로직 ==================== //
    private List<ContractResponseDto> toContractList(List<Schedule> scheduleList, Integer loginUserId) {
        List<ContractResponseDto> contractResponseList = new ArrayList<>();
        for (int i=0; i<scheduleList.size(); i++) {
            contractResponseList.add(toContractResponseDto((Contract) scheduleList.get(i), loginUserId));
        }
        return contractResponseList;
    }

    private List<ConsultationResponseDto> toConsultationList(List<Schedule> scheduleList, Integer loginUserId) {
        List<ConsultationResponseDto> consultationResponseList = new ArrayList<>();

        for (int i=0; i<scheduleList.size(); i++) {
            consultationResponseList.add(toConsultationResponseDto((Consultation) scheduleList.get(i), loginUserId));
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
        middleProcessResponseDto.setStepId(schedule.getMiddleProcessStep().getMiddleProcessStepId());
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

    private List<ScheduleResponseDto> toScheduleResponseDtoList(List<Schedule> scheduleList, Integer loginUserId) {
        List<ScheduleResponseDto> commonSchedulelist = new ArrayList<>();

        for (int i=0; i<scheduleList.size(); i++) {
            // 중간과정인 경우, isvisit = false 인 것은 반환하지 않음
            if (scheduleList.get(i) instanceof MiddleProcess &&
                    !((MiddleProcess) scheduleList.get(i)).getMiddleProcessStep().isVisit())
                continue;

            commonSchedulelist.add(toScheduleResponseDto(scheduleList.get(i), loginUserId));
        }

        return commonSchedulelist;
    }

    private ScheduleResponseDto toScheduleResponseDto(Schedule schedule, Integer loginUserId) {
        ScheduleResponseDto scheduleResponseDto = new ScheduleResponseDto();
        User user = userRepository.findById(loginUserId).orElseThrow();

        // 날짜 형식 변환
        String[] startDateTime = dateTimeToString(schedule.getStartDateTime());
        String[] endDateTime = dateTimeToString(schedule.getEndDateTime());
        scheduleResponseDto.setStartDate(startDateTime[0]);
        scheduleResponseDto.setStartTime(startDateTime[1]);
        scheduleResponseDto.setEndDate(endDateTime[0]);
        scheduleResponseDto.setEndTime(endDateTime[1]);

        scheduleResponseDto.setLoginUserId(loginUserId);
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
            scheduleResponseDto.setVendorId(schedule.getVendor().getUserId());
            scheduleResponseDto.setCustomerName(schedule.getCustomer().getName());
            scheduleResponseDto.setCustomerId(schedule.getCustomer().getUserId());
        } else {
            if (user instanceof Vendor) {
                scheduleResponseDto.setVendorName(schedule.getVendor().getName());
                scheduleResponseDto.setVendorId(schedule.getVendor().getUserId());
            } else {
                scheduleResponseDto.setCustomerName(schedule.getCustomer().getName());
                scheduleResponseDto.setCustomerId(schedule.getCustomer().getUserId());
            }
        }

        // 중간과정 일정이면 방문일정(isVisit=true)인 일정만 추가 & 계약ID 추가
        if (schedule instanceof MiddleProcess) {
            scheduleResponseDto.setContractId(((MiddleProcess) schedule).getContract().getScheduleId());
        }

        return scheduleResponseDto;
    }

    private OtherScheduleResponseDto toOtherScheduleResponseDto(OtherSchedule schedule, Integer loginUserId) {
        OtherScheduleResponseDto otherScheduleResponseDto = new OtherScheduleResponseDto();

        // 날짜 형식 변환
        String[] startDateTime = dateTimeToString(schedule.getStartDateTime());
        String[] endDateTime = dateTimeToString(schedule.getEndDateTime());
        otherScheduleResponseDto.setStartDate(startDateTime[0]);
        otherScheduleResponseDto.setStartTime(startDateTime[1]);
        otherScheduleResponseDto.setEndDate(endDateTime[0]);
        otherScheduleResponseDto.setEndTime(endDateTime[1]);

        otherScheduleResponseDto.setLoginUserId(loginUserId);
        otherScheduleResponseDto.setOtherScheduleId(schedule.getScheduleId());
//        otherScheduleDto.setStartTime(schedule.getStartDateTime());
//        otherScheduleDto.setEndTime(schedule.getEndDateTime());
        otherScheduleResponseDto.setTitle(schedule.getTitle());
        otherScheduleResponseDto.setCreatedAt(schedule.getCreatedAt());
        otherScheduleResponseDto.setUpdatedAt(schedule.getUpdatedAt());
        otherScheduleResponseDto.setDetail(schedule.getDetail());
        otherScheduleResponseDto.setCategoryId(schedule.getCategory().getId());
        otherScheduleResponseDto.setCategoryName(schedule.getCategory().getName());
        otherScheduleResponseDto.setDtype(schedule.getDtype());

        if (schedule.getCustomer() != null) {
            otherScheduleResponseDto.setCustomerName(schedule.getCustomer().getName());
            otherScheduleResponseDto.setCustomerId(schedule.getCustomer().getUserId());
        }
        else {
            otherScheduleResponseDto.setVendorId(schedule.getVendor().getUserId());
            otherScheduleResponseDto.setVendorName(schedule.getVendor().getName());
        }

        return otherScheduleResponseDto;
    }

    private ContractResponseDto toContractResponseDto(Contract schedule, Integer loginUserId) {
        ContractResponseDto contractDto = new ContractResponseDto();

        // 날짜 형식 변환
        String[] startDateTime = dateTimeToString(schedule.getStartDateTime());
        String[] endDateTime = dateTimeToString(schedule.getEndDateTime());
        contractDto.setStartDate(startDateTime[0]);
        contractDto.setStartTime(startDateTime[1]);
        contractDto.setEndDate(endDateTime[0]);
        contractDto.setEndTime(endDateTime[1]);

        contractDto.setLoginUserId(loginUserId);
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

    private ConsultationResponseDto toConsultationResponseDto(Consultation consultation, Integer loginUserId) {
        ConsultationResponseDto consultationDto = new ConsultationResponseDto();

        // 날짜 형식 변환
        String[] startDateTime = dateTimeToString(consultation.getStartDateTime());
        String[] endDateTime = dateTimeToString(consultation.getEndDateTime());
        consultationDto.setStartDate(startDateTime[0]);
        consultationDto.setStartTime(startDateTime[1]);
        consultationDto.setEndDate(endDateTime[0]);
        consultationDto.setEndTime(endDateTime[1]);

        consultationDto.setLoginUserId(loginUserId);
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
