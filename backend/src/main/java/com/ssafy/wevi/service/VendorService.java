package com.ssafy.wevi.service;

import com.ssafy.wevi.domain.*;
import com.ssafy.wevi.domain.user.Vendor;
import com.ssafy.wevi.domain.user.Customer;
import com.ssafy.wevi.dto.ImageDto;
import com.ssafy.wevi.dto.vendor.*;
import com.ssafy.wevi.enums.UserStatus;
import com.ssafy.wevi.repository.*;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class VendorService {

    private final VendorRepository vendorRepository;
    private final DoRepository doRepository;
    private final SigunguRepository sigunguRepository;
    private final PasswordEncoder passwordEncoder;
    private final CategoryRepository categoryRepository;
    private final ReviewRepository reviewRepository;
    private final CustomerRepository customerRepository;
    private final ImageRepository imageRepository;

    @Transactional(readOnly = true)
    public List<DoDto> getDoList() {
        return doRepository.findAll().stream()
                .map(this::convertToDoDto)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
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

        Category category = categoryRepository.findById(vendorCreateDto.getCategory())
                .orElseThrow(() -> new IllegalArgumentException("해당 카테고리 아이디가 존재하지 않습니다."));

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
        vendor.setCategory(category);
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

        vendorRepository.save(vendor);

        return toVendorDetailResponseDto(vendor);
    }

    @Transactional(readOnly = true)
    public List<VendorResponseDto> findVendorsByLocationAndCategory(
            Integer doId, Integer sigunguId, Integer categoryId) {

        Category category = categoryRepository.findById(categoryId).orElseThrow(() -> new EntityNotFoundException("Category not found"));

        List<Vendor> vendors = vendorRepository.findByLocationAndCategory(
                doId, sigunguId, category);

        return vendors.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public VendorDetailResponseDto findVendorById(Integer vendorId) {

        Vendor vendor = vendorRepository.findById(vendorId).orElseThrow(() -> new IllegalArgumentException("해당 업체가 존재하지 않습니다."));

        return toVendorDetailResponseDto(vendor);
    }

    @Transactional(readOnly = true)
    public List<ReviewDto> getReviewListByVendorId(Integer vendorId) {
        Vendor vendor = vendorRepository.findById(vendorId)
                .orElseThrow(() -> new IllegalArgumentException("해당 업체가 존재하지 않습니다."));
        List<Review> reviews = reviewRepository.findByVendor(vendor);

        return reviews.stream()
                .map(this::convertToReviewDto)
                .collect(Collectors.toList());
    }

    @Transactional
    public ReviewDto createReview(Integer vendorId, Integer costomerId, ReviewDto reviewDto) {

        Vendor vendor = vendorRepository.findById(vendorId)
                .orElseThrow(() -> new IllegalArgumentException("해당 업체가 존재하지 않습니다."));
        Customer customer = customerRepository.findById(costomerId)
                .orElseThrow(() -> new IllegalArgumentException("해당 유저가 존재하지 않습니다."));

        Review review = new Review();
        review.setContent(reviewDto.getContent());
        review.setCreatedAt(LocalDateTime.now());
        review.setVendor(vendor);
        review.setCustomer(customer);

        reviewRepository.save(review);

        return convertToReviewDto(review);
    }

    @Transactional
    public ReviewDto updateReview(Integer reviewId, ReviewDto reviewDto) {

        Review review = reviewRepository.findById(reviewId).orElseThrow();
        review.setContent(reviewDto.getContent());
        review.setUpdatedAt(LocalDateTime.now());

        reviewRepository.save(review);

        return convertToReviewDto(review);
    }

    @Transactional
    public void deleteReview(Integer reviewId) {
        reviewRepository.deleteById(reviewId);
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

    private VendorResponseDto convertToDto(Vendor vendor) {
        VendorResponseDto dto = new VendorResponseDto();
        dto.setId(vendor.getUserId());
        dto.setVendorName(vendor.getName());
        dto.setCategoryId(vendor.getCategory().getId());
        dto.setDoId(vendor.getSigunguCode().getDoId());
        dto.setDoName(vendor.getSigunguCode().getDoEntity().getDoName());
        dto.setSigunguId(vendor.getSigunguCode().getSigunguId());
        dto.setSigunguName(vendor.getSigunguCode().getSigunguName());
        dto.setMinPrice(vendor.getMinPrice());

        List<Image> images = imageRepository.findByVendor(vendor);
        List<ImageDto> imageDtoList = images.stream()
                .map(this::convertToImageDto)
                .collect(Collectors.toList());

        ImageDto imageDto = imageDtoList.get(0);

        dto.setImageUrl(imageDto.getImageUrl());
        return dto;
    }

    private VendorDetailResponseDto toVendorDetailResponseDto(Vendor vendor) {
        if (vendor == null) return null;

        VendorDetailResponseDto vendorDetailResponseDto = new VendorDetailResponseDto();
        vendorDetailResponseDto.setOwnerName(vendor.getOwnerName());
        vendorDetailResponseDto.setOwnerPhone(vendor.getOwnerPhone());
        vendorDetailResponseDto.setVendorName(vendor.getName());
        vendorDetailResponseDto.setZonecode(vendor.getZonecode());
        vendorDetailResponseDto.setDoCode(vendor.getSigunguCode() != null ? vendor.getSigunguCode().getDoId() : null);
        vendorDetailResponseDto.setSigunguCode(vendor.getSigunguCode() != null ? vendor.getSigunguCode().getSigunguId() : null);
        vendorDetailResponseDto.setAutoRoadAddress(vendor.getAutoRoadAddress());
        vendorDetailResponseDto.setAddressDetail(vendor.getAddressDetail());
        vendorDetailResponseDto.setVendorPhone(vendor.getPhone());
        vendorDetailResponseDto.setRegistrationNumber(vendor.getRegistrationNumber());
        vendorDetailResponseDto.setCategoryId(vendor.getCategory() != null ? vendor.getCategory().getId() : null);
        vendorDetailResponseDto.setBusinessHour(vendor.getBusinessHour());
        vendorDetailResponseDto.setHomepage(vendor.getHomepage());
        vendorDetailResponseDto.setPrice(vendor.getPrice());
        vendorDetailResponseDto.setDetails(vendor.getDetails());
        vendorDetailResponseDto.setIndoor(vendor.isIndoor());
        vendorDetailResponseDto.setMinPrice(vendor.getMinPrice());
        vendorDetailResponseDto.setSubway(vendor.getSubway());
        vendorDetailResponseDto.setParkinglot(vendor.getParkinglot());
        vendorDetailResponseDto.setCreatedAt(vendor.getCreatedAt());

        List<Image> images = imageRepository.findByVendor(vendor);
        List<ImageDto> imageDtoList = images.stream()
                .map(this::convertToImageDto)
                .collect(Collectors.toList());
        vendorDetailResponseDto.setImages(imageDtoList);

        return vendorDetailResponseDto;
    }

    private ReviewDto convertToReviewDto(Review review) {
        ReviewDto reviewDto = new ReviewDto();
        reviewDto.setReviewId(review.getReviewId());
        reviewDto.setUserNickname(review.getCustomer().getNickname());
        reviewDto.setContent(review.getContent());
        reviewDto.setCreatedAt(review.getCreatedAt());
        reviewDto.setUpdatedAt(review.getUpdatedAt());
        reviewDto.setCustomerId(review.getCustomer().getUserId());
        reviewDto.setVendorId(review.getVendor().getUserId());

        List<Image> images = imageRepository.findByReview(review);
        List<ImageDto> imageDtoList = images.stream()
                .map(this::convertToImageDto)
                .collect(Collectors.toList());
        reviewDto.setImages(imageDtoList);

        return reviewDto;
    }

    private ImageDto convertToImageDto(Image image) {
        ImageDto imageDto = new ImageDto();
        imageDto.setImageType(image.getImageType().name());
        imageDto.setOrderIndex(image.getOrderIndex());
        imageDto.setImageUrl(image.getImageUrl());

        return imageDto;
    }
}