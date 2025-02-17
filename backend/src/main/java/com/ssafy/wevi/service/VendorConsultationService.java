package com.ssafy.wevi.service;

import com.ssafy.wevi.domain.schedule.Consultation;
import com.ssafy.wevi.domain.user.Vendor;
import com.ssafy.wevi.dto.vendor.VendorConsultationAvailabilityResponseDto;
import com.ssafy.wevi.dto.vendor.VendorConsultationDateResponseDto;
import com.ssafy.wevi.dto.vendor.VendorConsultationTimeResponseDto;
import com.ssafy.wevi.repository.ConsultationRepository;
import com.ssafy.wevi.repository.VendorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.YearMonth;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class VendorConsultationService {
    private final ConsultationRepository consultationRepository;
    private final VendorRepository vendorRepository;

    public VendorConsultationDateResponseDto getAvailableConsultationDates(Integer vendorId, YearMonth yearMonth) {
        // vendorID에 해당하는 vendor 찾기
        Vendor vendor = vendorRepository.findById(vendorId).orElseThrow(() -> new NoSuchElementException("해당 id를 갖는 업체가 존재하지 않습니다: " + vendorId));

        List<VendorConsultationDateResponseDto.AvailableDateDto> availableDates = new ArrayList<>();

        // 영업 시간 파싱
        String[] hours = vendor.getBusinessHour().split(" - ");
        LocalTime startTime = LocalTime.parse(hours[0]);
        LocalTime endTime = LocalTime.parse(hours[1]);

        // 해당 월의 날짜 가져오기
        int daysInMonth = yearMonth.lengthOfMonth();
        for (int day = 1; day <= daysInMonth; day++) {
            LocalDate date = yearMonth.atDay(day);

            // 해당 날짜의 영업 시작 시간, 영업 종료 시간
            LocalDateTime startDateTime = LocalDateTime.of(date, startTime);
            LocalDateTime endDateTime = LocalDateTime.of(date, endTime);

            // 해당 날짜에 영업 시간 내에 시작하는 예약 리스트 조회 (해당 날짜의 모든 예약 가져오기)
            List<Consultation> consultations = consultationRepository.findByVendorAndStartDateTimeBetween(
                    vendor, startDateTime, endDateTime
            );

            // 예약 리스트의 시작 시간 추출
            Set<LocalTime> reservedTimes = consultations.stream()
                    .map(c -> c.getStartDateTime().toLocalTime())
                    .collect(Collectors.toSet());

            // 영업시간 내 모든 1시간 단위의 슬롯을 체크
            boolean isAvailable = false;
            while (startDateTime.isBefore(endDateTime)) {
                if (!reservedTimes.contains(startDateTime.toLocalTime())) {
                    isAvailable = true; // 예약되지 않은 시간이 하나라도 있으면 true
                    break;
                }
                startDateTime = startDateTime.plusHours(1);
            }

            // DTO 추가
            VendorConsultationDateResponseDto.AvailableDateDto availableDateDto =
                    new VendorConsultationDateResponseDto.AvailableDateDto(date.toString(), isAvailable);
            availableDates.add(availableDateDto);
        }

        // 최종 결과 반환
        return VendorConsultationDateResponseDto.builder()
                .vendorId(vendorId)
                .availableDates(availableDates)
                .build();
    }

    public VendorConsultationTimeResponseDto getAvailableTimes(Integer vendorId, LocalDate date) {
        // vendorID에 해당하는 vendor 찾기
        Vendor vendor = vendorRepository.findById(vendorId).orElseThrow(() -> new NoSuchElementException("해당 id를 갖는 업체가 존재하지 않습니다: " + vendorId));

        List<VendorConsultationTimeResponseDto.AvailableTimeDto> availableTimes = new ArrayList<>();

        // 영업 시간 파싱
        String[] hours = vendor.getBusinessHour().split(" - ");
        LocalTime startTime = LocalTime.parse(hours[0]);
        LocalTime endTime = LocalTime.parse(hours[1]);

        LocalDateTime startDateTime = LocalDateTime.of(date, startTime);
        LocalDateTime endDateTime = LocalDateTime.of(date, endTime);

        // 해당 날짜에 영업 시간 내에 시작하는 예약 리스트 조회 (해당 날짜의 모든 예약 가져오기)
        List<Consultation> consultations = consultationRepository.findByVendorAndStartDateTimeBetween(
                vendor, startDateTime, endDateTime
        );

        // 예약 리스트의 시작 시간 추출
        Set<LocalTime> reservedTimes = consultations.stream()
                .map(c -> c.getStartDateTime().toLocalTime())
                .collect(Collectors.toSet());

        // 영업시간 내 1시간 단위의 슬롯 생성
        while (startDateTime.isBefore(endDateTime)) {
            boolean isAvailable = !reservedTimes.contains(startDateTime.toLocalTime());
            availableTimes.add(new VendorConsultationTimeResponseDto.AvailableTimeDto(startDateTime.toLocalTime().toString(), isAvailable));
            startDateTime = startDateTime.plusHours(1);
        }

        return VendorConsultationTimeResponseDto.builder()
                .vendorId(vendor.getUserId())
                .availableTime(availableTimes)
                .build();
    }

    public VendorConsultationAvailabilityResponseDto getAvailability(Integer vendorId, LocalDate date) {
        // vendorID에 해당하는 vendor 찾기
        Vendor vendor = vendorRepository.findById(vendorId).orElseThrow(() -> new NoSuchElementException("해당 id를 갖는 업체가 존재하지 않습니다: " + vendorId));

        // 영업 시간 파싱
        String[] hours = vendor.getBusinessHour().split(" - ");
        LocalTime startTime = LocalTime.parse(hours[0]);
        LocalTime endTime = LocalTime.parse(hours[1]);

        // 해당 날짜의 영업 시작 시간, 영업 종료 시간
        LocalDateTime startDateTime = LocalDateTime.of(date, startTime);
        LocalDateTime endDateTime = LocalDateTime.of(date, endTime);

        // 해당 날짜에 영업 시간 내에 시작하는 예약 리스트 조회 (해당 날짜의 모든 예약 가져오기)
        List<Consultation> consultations = consultationRepository.findByVendorAndStartDateTimeBetween(
                vendor, startDateTime, endDateTime
        );

        // 예약 리스트의 시작 시간 추출
        Set<LocalTime> reservedTimes = consultations.stream()
                .map(c -> c.getStartDateTime().toLocalTime())
                .collect(Collectors.toSet());

        // 영업시간 내 모든 1시간 단위의 슬롯을 체크
        boolean availability = false;
        while (startTime.isBefore(endTime)) {
            if (!reservedTimes.contains(startTime)) {
                availability = true; // 예약되지 않은 시간이 하나라도 있으면 true
                break;
            }
            startTime = startTime.plusHours(1);
        }

        // DTO 생성
        return VendorConsultationAvailabilityResponseDto.builder()
                .vendorId(vendorId)
                .availability(availability)
                .build();
    }
}
