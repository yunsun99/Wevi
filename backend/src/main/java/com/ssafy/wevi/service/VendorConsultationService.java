package com.ssafy.wevi.service;

import com.ssafy.wevi.domain.schedule.Consultation;
import com.ssafy.wevi.domain.user.Vendor;
import com.ssafy.wevi.dto.ApiResponseDto;
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
        Vendor vendor = vendorRepository.findById(vendorId).orElseThrow(() -> new NoSuchElementException("해당 id를 갖는 업체가 존재하지 않습니다: " + vendorId));
    };

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

        // DB에서 해당 날짜와 시간에 시작하는 예약 리스트 조회
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
}
