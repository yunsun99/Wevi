package com.ssafy.wevi.service;

import com.ssafy.wevi.domain.schedule.*;
import com.ssafy.wevi.dto.schedule.*;
import com.ssafy.wevi.repository.CustomerRepository;
import com.ssafy.wevi.repository.ScheduleRepository;
import com.ssafy.wevi.repository.VendorRepository;
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
public class ScheduleService {

    private final ScheduleRepository scheduleRepository;
    private final CustomerRepository customerRepository;
    private final VendorRepository vendorRepository;
    // ========= 등록 ========//
    // 상담 등록
    @Transactional
    public ConsultationDto addConsultation(ConsultationDto consultationDto, Integer customerId) {
        Consultation consultation = new Consultation();

        consultation.setStartDateTime(stringToLocalDateTime(consultationDto.getStartDate(),consultationDto.getStartTime()));
        consultation.setEndDateTime(stringToLocalDateTime(consultationDto.getStartDate(),consultationDto.getStartTime()).plusHours(1));   // 1시간 추가!
        consultation.setTitle(consultationDto.getTitle());
        consultation.setRequest(consultationDto.getRequest());
        consultation.setDtype("consultation");
        consultation.setCreatedAt(LocalDateTime.now());
        consultation.setCustomer(customerRepository.findById(customerId).orElseThrow());
        consultation.setVendor(vendorRepository.findById(consultationDto.getVendorId()).orElseThrow());

        scheduleRepository.save(consultation);

        return toConsultationDto(consultation);
    }

    //==========조회=========//

    // 상담 단건 조회
    @Transactional(readOnly = true)
    public ConsultationDto findConsultationById(Integer id) {
        Schedule schedule = scheduleRepository.findById(id)
                .orElseThrow();

        if (schedule instanceof Consultation) {
            return toConsultationDto((Consultation) schedule);
        } else {
            throw new IllegalArgumentException("해당 ID는 상담 일정이 아닙니다.");
        }
    }
    // 계약 단건 조회
    @Transactional(readOnly = true)
    public ContractDto findContractById(Integer id) {
        Schedule schedule = scheduleRepository.findById(id)
                .orElseThrow();

        if (schedule instanceof Contract) {
            return toContractDto((Contract) schedule);
        } else {
            throw new IllegalArgumentException("해당 ID는 계약 일정이 아닙니다.");
        }
    }
    // 중간과정 단건 조회
    @Transactional(readOnly = true)
    public MiddleProcessDto findMiddleProcessById(Integer id) {
        Schedule schedule = scheduleRepository.findById(id)
                .orElseThrow();

        if (schedule instanceof MiddleProcess) {
            return toMiddleProcessDto((MiddleProcess) schedule);
        } else {
            throw new IllegalArgumentException("해당 ID는 중간과정 일정이 아닙니다.");
        }
    }
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
    public List<CommonScheduleDto> findAllSchedules(Integer id) {
        List<Schedule> scheduleList = scheduleRepository.findAllScheduleByCustomerId(id);
        if (scheduleList.size() > 0) {
            return toCommonScheduleList(scheduleList);
        } else {
            throw new IllegalArgumentException("해당하는 일정이 없습니다.");
        }
    }


    // ==================== 기타 로직 ==================== //
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
    private List<CommonScheduleDto> toCommonScheduleList(List<Schedule> scheduleList) {
        List<CommonScheduleDto> commonSchedulelist = new ArrayList<>();

        for (int i=0; i<scheduleList.size(); i++) {
            commonSchedulelist.add(toCommonScheduleDto(scheduleList.get(i)));
        }

        return commonSchedulelist;
    }

    private CommonScheduleDto toCommonScheduleDto(Schedule schedule) {
        CommonScheduleDto commonScheduleDto = new CommonScheduleDto();

        // 날짜 형식 변환
        String[] startDateTime = dateTimeToString(schedule.getStartDateTime());
        String[] endDateTime = dateTimeToString(schedule.getEndDateTime());
        commonScheduleDto.setStartDate(startDateTime[0]);
        commonScheduleDto.setStartTime(startDateTime[1]);
        commonScheduleDto.setEndDate(endDateTime[0]);
        commonScheduleDto.setEndTime(endDateTime[1]);

        commonScheduleDto.setId(schedule.getId());
//        commonScheduleDto.setStartTime(schedule.getStartDateTime());
//        commonScheduleDto.setEndTime(schedule.getEndDateTime());
        commonScheduleDto.setTitle(schedule.getTitle());
        commonScheduleDto.setCreatedAt(schedule.getCreatedAt());
        commonScheduleDto.setUpdatedAt(schedule.getUpdatedAt());
        commonScheduleDto.setDtype(schedule.getDtype());

        return commonScheduleDto;
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

        otherScheduleDto.setId(schedule.getId());
//        otherScheduleDto.setStartTime(schedule.getStartDateTime());
//        otherScheduleDto.setEndTime(schedule.getEndDateTime());
        otherScheduleDto.setTitle(schedule.getTitle());
        otherScheduleDto.setCreatedAt(schedule.getCreatedAt());
        otherScheduleDto.setUpdatedAt(schedule.getUpdatedAt());
        otherScheduleDto.setCustomerName(schedule.getCustomer().getName());
        otherScheduleDto.setCustomerId(schedule.getCustomer().getUserId());
        otherScheduleDto.setDetail(schedule.getDetail());

        return otherScheduleDto;
    }

    private MiddleProcessDto toMiddleProcessDto(MiddleProcess schedule) {
        MiddleProcessDto middleProcessDto = new MiddleProcessDto();

        // 날짜 변환
        String[] startDateTime = dateTimeToString(schedule.getStartDateTime());
        String[] endDateTime = dateTimeToString(schedule.getEndDateTime());
        middleProcessDto.setStartDate(startDateTime[0]);
        middleProcessDto.setStartTime(startDateTime[1]);
        middleProcessDto.setEndDate(endDateTime[0]);
        middleProcessDto.setEndTime(endDateTime[1]);

        middleProcessDto.setId(schedule.getId());
//        middleProcessDto.setStartTime(schedule.getStartDateTime());
//        middleProcessDto.setEndTime(schedule.getEndDateTime());
        middleProcessDto.setTitle(schedule.getTitle());
        middleProcessDto.setCreatedAt(schedule.getCreatedAt());
        middleProcessDto.setUpdatedAt(schedule.getUpdatedAt());
        middleProcessDto.setCustomerName(schedule.getCustomer().getName());
        middleProcessDto.setCustomerId(schedule.getCustomer().getUserId());
        middleProcessDto.setCustomerPhone(schedule.getCustomer().getPhone());
        middleProcessDto.setVendorId(schedule.getVendor().getUserId());
        middleProcessDto.setVendorName(schedule.getVendor().getName());
        middleProcessDto.setVendorAutoRoadAddress(schedule.getVendor().getAutoRoadAddress());
        middleProcessDto.setVendorPhone(schedule.getVendor().getPhone());
        middleProcessDto.setDetail(schedule.getDetail());
        middleProcessDto.setStepName(schedule.getMiddleProcessStep().getName());
        middleProcessDto.setStatus(schedule.getStatus());

        return middleProcessDto;
    }

    private ContractDto toContractDto(Contract schedule) {
        ContractDto contractDto = new ContractDto();

        // 날짜 형식 변환
        String[] startDateTime = dateTimeToString(schedule.getStartDateTime());
        String[] endDateTime = dateTimeToString(schedule.getEndDateTime());
        contractDto.setStartDate(startDateTime[0]);
        contractDto.setStartTime(startDateTime[1]);
        contractDto.setEndDate(endDateTime[0]);
        contractDto.setEndTime(endDateTime[1]);

        contractDto.setId(schedule.getId());
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
        contractDto.setContractDate(schedule.getContractDate());
        contractDto.setDetail(schedule.getDetail());

        return contractDto;
    }

    private ConsultationDto toConsultationDto(Consultation consultation) {
        ConsultationDto consultationDto = new ConsultationDto();

        String[] startDateTime = dateTimeToString(consultation.getStartDateTime());
        String[] endDateTime = dateTimeToString(consultation.getEndDateTime());

        consultationDto.setId(consultation.getId());
//        consultationDto.setStartTime(consultation.getStartDateTime());
//        consultationDto.setEndTime(consultation.getEndDateTime());
        consultationDto.setStartDate(startDateTime[0]);
        consultationDto.setStartTime(startDateTime[1]);
        consultationDto.setEndDate(endDateTime[0]);
        consultationDto.setEndTime(endDateTime[1]);
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

        System.out.println("시작시간" +consultation.getStartDateTime());

        return consultationDto;
    }
}
