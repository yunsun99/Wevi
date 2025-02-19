package com.ssafy.wevi.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.wevi.domain.AudioSummary;
import com.ssafy.wevi.domain.Image;
import com.ssafy.wevi.domain.Recommend;
import com.ssafy.wevi.domain.schedule.Consultation;
import com.ssafy.wevi.domain.schedule.Schedule;
import com.ssafy.wevi.domain.user.Customer;
import com.ssafy.wevi.domain.user.User;
import com.ssafy.wevi.domain.user.Vendor;
import com.ssafy.wevi.dto.Ai.AudioSummaryCreateDto;
import com.ssafy.wevi.dto.Ai.AudioSummaryResponseDto;
import com.ssafy.wevi.dto.Ai.RecommendCreateDto;
import com.ssafy.wevi.dto.Ai.RecommendResponseDto;
import com.ssafy.wevi.dto.ImageDto;
import com.ssafy.wevi.dto.vendor.VendorDetailResponseDto;
import com.ssafy.wevi.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class AiService {
    private final SummaryRepository summaryRepository;
    private final S3ClientService s3ClientService;
    private final UserRepository userRepository;
    private final ScheduleRepository scheduleRepository;
    private final RecommendRepository recommendRepository;
    private final ImageRepository imageRepository;
    private final VendorRepository vendorRepository;


    /**
     * 상담 분석 기능
     */
    // ✅ 1. 파일을 S3에 저장 후 AI 분석 요청
    @Transactional
    public AudioSummaryResponseDto uploadAndSummarizeAudio(MultipartFile file, Integer loginUserId, Integer scheduleId) throws IOException {
        // 1. 파일이 비어있는지 확인
        if (file.isEmpty()) {
            throw new IllegalArgumentException("파일이 비어 있습니다.");
        }

        // 2. 파일 확장자 확인 (m4a, wav만 허용)
        String originalFilename = file.getOriginalFilename();
        if (originalFilename == null || !(originalFilename.toLowerCase().endsWith(".m4a") || originalFilename.toLowerCase().endsWith(".wav"))) {
            throw new IllegalArgumentException("m4a, wav 형식의 오디오 파일만 업로드할 수 있습니다.");
        }

        User user = userRepository.findById(loginUserId).orElseThrow();
        Schedule schedule = scheduleRepository.findById(scheduleId).orElseThrow();

        // 조건 충족 여부 확인
        // 소비자인가?
        if (!(user instanceof Customer)) throw new IllegalArgumentException("소비자만 상담 요약 요청할 수 있습니다.");
        // 상담 일정인가?
        if (!(schedule instanceof Consultation)) throw new IllegalArgumentException("상담 일정에 대해서만 상담 요약 요청할 수 있습니다.");
        // 본인 상담인가?
        if (!schedule.getCustomer().getUserId().equals(user.getUserId())) throw new IllegalArgumentException("본인의 상담일 경우에만 상담 요청할 수 있습니다.");
        // 이미 분석 요청한 상담인가?
        if (summaryRepository.findBySchedule_ScheduleId(schedule.getScheduleId()) != null) throw new IllegalArgumentException("해당 상담에 대해 이미 분석 요청하셨습니다.");


        // ✅ 1.1 파일을 S3에 업로드하고 URL 가져오기
        String s3Url = s3ClientService.upload(file);

        // ✅ 1.2 DB에 원본 파일 URL 저장
        AudioSummary audioSummary = new AudioSummary();
        audioSummary.setOriginalFileUrl(s3Url);
        audioSummary.setCustomer((Customer) user);
        audioSummary.setSchedule((Consultation) schedule);
//        audioSummary.setStatus("PENDING");
//        audioSummary = summaryRepository.save(audioSummary); // 현재 원본파일url, status(PENDING)만 존재

        // ✅ 1.3 FastAPI 요청을 위한 데이터 준비
        String fastApiUrl = "http://127.0.0.1:8001/predict";  // FastAPI 서버 URL
        RestTemplate restTemplate = new RestTemplate();

        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("file_url", s3Url);
        requestBody.put("audio_summary_id", audioSummary.getAudioSummaryId());

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<Map<String, Object>> requestEntity = new HttpEntity<>(requestBody, headers);

        // ✅ 3. FastAPI 서버에 동기 요청 보내기
        try {
            ResponseEntity<String> response = restTemplate.exchange(
                    fastApiUrl,
                    HttpMethod.POST,
                    requestEntity,
                    String.class
            );
            System.out.println("✅ FastAPI 요청 성공: " + response.getBody());

            // 요청이 성공하면 상태를 "PROCESSING"로 업데이트 가능
            audioSummary.setStatus("PROCESSING");
            summaryRepository.save(audioSummary);
        } catch (Exception e) {
            System.out.println("❌ FastAPI 요청 실패: " + e.getMessage());
            throw new IllegalArgumentException("AI 서버로 요청이 실패. AI 서버 정상 동작 여부 확인 필요");
//            audioSummary.setStatus("FAILED");  // 요청 실패 시 상태 변경
//            summaryRepository.save(audioSummary);
        }
        // ✅ 4. 최종 응답 반환
        return toAudioSummaryResponseDto(audioSummary, loginUserId);
    }

    // AI 서버로부터 결과를 받음
    @Transactional
    public AudioSummaryResponseDto patchSummaryResult(AudioSummaryCreateDto audioSummaryCreateDto) {
        AudioSummary audioSummary = summaryRepository.findById(audioSummaryCreateDto.getAudioSummaryId()).orElseThrow();

        if (audioSummaryCreateDto.getStatus().equals("COMPLETED")) {
            audioSummary.setStatus("COMPLETED");
            audioSummary.setSummaryResult(audioSummaryCreateDto.getSummaryResult());
        } else {
            audioSummary.setStatus("FAILED");
        }
        // 현재 상태를 "PROCESSING"으로 변경 (AI 분석 시작됨)
        summaryRepository.save(audioSummary); // 변경 사항을 DB에 반영

        return toAudioSummaryResponseDto(audioSummary, audioSummary.getCustomer().getUserId());
    }

    public List<AudioSummaryResponseDto> getAllSummary(Integer loginUserId) {
        User user = userRepository.findById(loginUserId).orElseThrow();
        List<AudioSummary> audioSummaryList = new ArrayList<>();

        // 업체일 때
        if (user instanceof Vendor) {
            throw new IllegalArgumentException("업체는 조회 불가합니다.");

            // 소비자일 때
        } else {
            // 커플 여부 확인
            if (((Customer)user).getSpouse() == null) {
                audioSummaryList = summaryRepository.findAllCompletedSummaryByUserId(loginUserId);
            } else {
                audioSummaryList = summaryRepository.findAllCompletedSummaryWithSpouse(loginUserId, ((Customer)user).getSpouse().getUserId());
            }
        }

        // 반환타입으로 변환하여 반환
        if (audioSummaryList.size() > 0) {
            return toAudioSummaryResponseDtoList(audioSummaryList, loginUserId);
        } else {
            throw new IllegalArgumentException("해당하는 일정이 없습니다.");
        }
    }

    /**
     * 업체 추천 기능
     */
    // 사용자 요구사항을 받아 ai 서버로 업체 추천 요청 => 응답 받아 DB에 저장 후 결과 반환
    @Transactional
    public RecommendResponseDto addRecommend(RecommendCreateDto recommendCreateDto, Integer loginUserId) {
        User user = userRepository.findById(loginUserId).orElseThrow();

        if (user instanceof Vendor) throw new IllegalArgumentException("소비자만 추천 요청 가능합니다.");

        Recommend recommend = new Recommend();
        recommend.setCustomer((Customer) user);
        recommend.setWeddingHallRequest(recommendCreateDto.getWeddingHallRequest());
        recommend.setStudioRequest(recommendCreateDto.getStudioRequest());
        recommend.setDressRequest(recommendCreateDto.getDressRequest());
        recommend.setMakeUpRequest(recommendCreateDto.getMakeUpRequest());



        // FastAPI 요청을 위한 데이터 준비
        String fastApiUrl = "http://127.0.0.1:8000/recommend";  // FastAPI 서버 URL


        RestTemplate restTemplate = new RestTemplate();Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("wedding_hall", recommend.getWeddingHallRequest());
        requestBody.put("studio", recommend.getStudioRequest());
        requestBody.put("dress", recommend.getDressRequest());
        requestBody.put("makeup", recommend.getMakeUpRequest());

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<Map<String, Object>> requestEntity = new HttpEntity<>(requestBody, headers);

        // FastAPI 서버에 동기 요청 보내기
        try {
            ResponseEntity<String> response = restTemplate.exchange(
                    fastApiUrl,
                    HttpMethod.POST,
                    requestEntity,
                    String.class
            );
            System.out.println("✅ FastAPI 요청 성공: " + response.getBody());

            // ✅ JSON 응답 파싱 (Jackson ObjectMapper 사용)
            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode root = objectMapper.readTree(response.getBody());

            // ✅ 추천된 업체명 가져오기
            Integer weddingHallVendorId = Integer.valueOf(root.path("recommendations").path("1").asText(null));
            Integer studioVendorId = Integer.valueOf(root.path("recommendations").path("2").asText(null));
            Integer dressVendorId = Integer.valueOf(root.path("recommendations").path("3").asText(null));
            Integer makeupVendorId = Integer.valueOf(root.path("recommendations").path("4").asText(null));

            // ✅ recommend 객체에 추천된 업체 저장 (이름으로 검색)
            recommend.setWeddingHallVendor(vendorRepository.findById(weddingHallVendorId).orElseThrow());
            recommend.setStudioVendor(vendorRepository.findById(studioVendorId).orElseThrow());
            recommend.setDressVendor(vendorRepository.findById(dressVendorId).orElseThrow());
            recommend.setMakeUpVendor(vendorRepository.findById(makeupVendorId).orElseThrow());

            // 저장
            recommendRepository.save(recommend);

        } catch (Exception e) {
            System.out.println("❌ FastAPI 요청 실패: " + e.getMessage());
            throw new IllegalArgumentException("ai 서버 요청 실패");
        }
        // 최종 응답 반환
        return toRecommendResponseDto(recommend, loginUserId);
        
    }

    @Transactional(readOnly = true)
    public RecommendResponseDto getRecentRecommend(Integer loginUserId) {
        User user = userRepository.findById(loginUserId).orElseThrow();

        // 소비자인가?
        if (user instanceof Vendor) throw new IllegalArgumentException("소비자만 AI 추천이 가능합니다.");

        Recommend recommend = recommendRepository.findRecentRecommend(loginUserId).orElseThrow();

        return toRecommendResponseDto(recommend, loginUserId);
    }

    private RecommendResponseDto toRecommendResponseDto(Recommend recommend, Integer loginUserId) {
        RecommendResponseDto recommendResponseDto = new RecommendResponseDto();

        recommendResponseDto.setRecommendId(recommend.getRecommendId());
        recommendResponseDto.setCustomerId(loginUserId);
        recommendResponseDto.setWeddingHallRequest(recommend.getWeddingHallRequest());
        recommendResponseDto.setStudioRequest(recommend.getStudioRequest());
        recommendResponseDto.setDressRequest(recommend.getDressRequest());
        recommendResponseDto.setMakeUpRequest(recommend.getMakeUpRequest());
        recommendResponseDto.setWeddingHallVendor(toVendorDetailResponseDto(recommend.getWeddingHallVendor()));
        recommendResponseDto.setStudioVendor(toVendorDetailResponseDto(recommend.getStudioVendor()));
        recommendResponseDto.setDressVendor(toVendorDetailResponseDto(recommend.getDressVendor()));
        recommendResponseDto.setMakeUpVendor(toVendorDetailResponseDto(recommend.getMakeUpVendor()));

        return recommendResponseDto;
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
    private ImageDto convertToImageDto(Image image) {
        ImageDto imageDto = new ImageDto();
        imageDto.setImageType(image.getImageType().name());
        imageDto.setOrderIndex(image.getOrderIndex());
        imageDto.setImageUrl(image.getImageUrl());

        return imageDto;
    }
    private List<AudioSummaryResponseDto> toAudioSummaryResponseDtoList(List<AudioSummary> audioSummaryList, Integer loginUserId) {
        List<AudioSummaryResponseDto> audioSummaryResponseDtoList = new ArrayList<>();

        for (AudioSummary audioSummary : audioSummaryList) {
            audioSummaryResponseDtoList.add(toAudioSummaryResponseDto(audioSummary, loginUserId));
        }

        return audioSummaryResponseDtoList;
    }

    private AudioSummaryResponseDto toAudioSummaryResponseDto(AudioSummary audioAnalysis, Integer loginUserId) {
        AudioSummaryResponseDto audioAnalysisResponseDto = new AudioSummaryResponseDto();

        audioAnalysisResponseDto.setLoginUserId(loginUserId);
        audioAnalysisResponseDto.setScheduleId(audioAnalysis.getSchedule().getScheduleId());
        audioAnalysisResponseDto.setScheduleTitle(audioAnalysis.getSchedule().getTitle());
        audioAnalysisResponseDto.setCategoryId(audioAnalysis.getSchedule().getCategory().getId());
        audioAnalysisResponseDto.setCategoryName(audioAnalysis.getSchedule().getCategory().getName());
        audioAnalysisResponseDto.setAudioSummaryId(audioAnalysis.getAudioSummaryId());
        audioAnalysisResponseDto.setStatus(audioAnalysis.getStatus());
        audioAnalysisResponseDto.setSummaryResult(audioAnalysis.getSummaryResult());

        return audioAnalysisResponseDto;
    }
}
