package com.ssafy.wevi.service;

import com.ssafy.wevi.domain.Do;
import com.ssafy.wevi.domain.Sigungu;
import com.ssafy.wevi.domain.SigunguId;
import com.ssafy.wevi.domain.user.Vendor;
import com.ssafy.wevi.dto.vendor.*;
import com.ssafy.wevi.enums.UserStatus;
import com.ssafy.wevi.repository.DoRepository;
import com.ssafy.wevi.repository.SigunguRepository;
import com.ssafy.wevi.repository.VendorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class VendorService {

    private final VendorRepository vendorRepository;
    private final DoRepository doRepository;
    private final SigunguRepository sigunguRepository;
    private final PasswordEncoder passwordEncoder;

    public List<DoDto> getDoList() {
        return doRepository.findAll().stream()
                .map(this::convertToDoDto)
                .collect(Collectors.toList());
    }

    public List<SigunguDto> getSigunguList(int doId) {
        return sigunguRepository.findByDoId(doId).stream()
                .map(this::convertToSigunguDto)
                .collect(Collectors.toList());
    }



    @Transactional
    public VendorDetailResponseDto createVendor(VendorCreateDto vendorCreateDto) {

//        Do doCode = doRepository.findById(vendorCreateDto.getDoCode())
//                .orElseThrow(() -> new IllegalArgumentException("해당 도 코드가 존재하지 않습니다."));

        SigunguId sigunguId = new SigunguId(
                vendorCreateDto.getDoCode(),
                vendorCreateDto.getSigunguCode()
        );

        Sigungu sigunguCode = sigunguRepository.findById(sigunguId)
                .orElseThrow(() -> new IllegalArgumentException("해당 시군구 코드가 존재하지 않습니다."));


        Vendor vendor = new Vendor();
        vendor.setEmail(vendorCreateDto.getEmail());
        vendor.setPassword(passwordEncoder.encode(vendorCreateDto.getPassword()));
        vendor.setOwnerName(vendorCreateDto.getOwnerName());
        vendor.setOwnerPhone(vendorCreateDto.getOwnerPhone());
        vendor.setName(vendorCreateDto.getName());
        vendor.setZonecode(vendorCreateDto.getZonecode());
//        vendor.setDoCode(doCode);
        vendor.setSigunguCode(sigunguCode);
        vendor.setAutoRoadAddress(vendorCreateDto.getAutoRoadAddress());
        vendor.setAddressDetail(vendorCreateDto.getAddressDetail());
        vendor.setPhone(vendorCreateDto.getPhone());
        vendor.setRegistrationNumber(vendorCreateDto.getRegistrationNumber());
        vendor.setBusinessHour(vendorCreateDto.getBusinessHour());
        vendor.setHomepage(vendorCreateDto.getHomepage());
        vendor.setPrice(vendorCreateDto.getPrice());
        vendor.setDetails(vendorCreateDto.getDetails());
        vendor.setIndoor(vendorCreateDto.isIndoor());
        vendor.setMinPrice(vendorCreateDto.getMinPrice());
        vendor.setSubway(vendorCreateDto.getSubway());
        vendor.setParkinglot(vendorCreateDto.getParkinglot());
        vendor.setStatus(UserStatus.ACTIVE.name());
        vendor.setCreatedAt(LocalDateTime.now());

        System.out.println("ddd###############");



        vendorRepository.save(vendor);

        System.out.println("dddd*************");

        return toVendorDetailResponseDto(vendor);
    }

    private DoDto convertToDoDto(Do doEntity) {
        DoDto dto = new DoDto();
        dto.setDoId(doEntity.getDoId());
        dto.setDoName(doEntity.getDoName());
        return dto;
    }

    private SigunguDto convertToSigunguDto(Sigungu sigungu) {
        SigunguDto dto = new SigunguDto();
        dto.setDoId(sigungu.getDoId());
        dto.setSigunguId(sigungu.getSigunguId());
        dto.setSigunguName(sigungu.getSigunguName());
        return dto;
    }

    private VendorDetailResponseDto toVendorDetailResponseDto(Vendor vendor) {
        if (vendor == null) return null;

        VendorDetailResponseDto vendorDetailResponseDto = new VendorDetailResponseDto();
        vendorDetailResponseDto.setOwnerName(vendor.getOwnerName());
        vendorDetailResponseDto.setOwnerPhone(vendor.getOwnerPhone());
        vendorDetailResponseDto.setName(vendor.getName());
        vendorDetailResponseDto.setZonecode(vendor.getZonecode());
        vendorDetailResponseDto.setDoCode(vendor.getSigunguCode() != null ? vendor.getSigunguCode().getDoId() : null);
        vendorDetailResponseDto.setSigunguCode(vendor.getSigunguCode() != null ? vendor.getSigunguCode().getSigunguId() : null);
        vendorDetailResponseDto.setAutoRoadAddress(vendor.getAutoRoadAddress());
        vendorDetailResponseDto.setAddressDetail(vendor.getAddressDetail());
        vendorDetailResponseDto.setPhone(vendor.getPhone());
        vendorDetailResponseDto.setRegistrationNumber(vendor.getRegistrationNumber());
        vendorDetailResponseDto.setBusinessHour(vendor.getBusinessHour());
        vendorDetailResponseDto.setHomepage(vendor.getHomepage());
        vendorDetailResponseDto.setPrice(vendor.getPrice());
        vendorDetailResponseDto.setDetails(vendor.getDetails());
        vendorDetailResponseDto.setIndoor(vendor.isIndoor());
        vendorDetailResponseDto.setMinPrice(vendor.getMinPrice());
        vendorDetailResponseDto.setSubway(vendor.getSubway());
        vendorDetailResponseDto.setParkinglot(vendor.getParkinglot());
        vendorDetailResponseDto.setCreatedAt(vendor.getCreatedAt());

        return vendorDetailResponseDto;
    }
}