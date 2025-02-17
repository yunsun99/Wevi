package com.ssafy.wevi.service;

import com.ssafy.wevi.domain.AudioSummary;
import com.ssafy.wevi.domain.schedule.Consultation;
import com.ssafy.wevi.domain.schedule.Schedule;
import com.ssafy.wevi.domain.user.Customer;
import com.ssafy.wevi.domain.user.User;
import com.ssafy.wevi.dto.AudioSummary.AudioSummaryCreateDto;
import com.ssafy.wevi.dto.AudioSummary.AudioSummaryResponseDto;
import com.ssafy.wevi.repository.ScheduleRepository;
import com.ssafy.wevi.repository.SummaryRepository;
import com.ssafy.wevi.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class SummaryService {
    private final SummaryRepository summaryRepository;
    private final S3ClientService s3ClientService;
    private final UserRepository userRepository;
    private final ScheduleRepository scheduleRepository;
    // ✅ 1. 파일을 S3에 저장 후 AI 분석 요청
    @Transactional
    public AudioSummaryResponseDto uploadAndSummarizeAudio(MultipartFile file, Integer loginUserId, Integer scheduleId) throws IOException {
        User user = userRepository.findById(loginUserId).orElseThrow();
        Schedule schedule = scheduleRepository.findById(scheduleId).orElseThrow();

        if (!(user instanceof Customer)) throw new IllegalArgumentException("소비자만 상담 요약 요청할 수 있습니다.");
        if (!(schedule instanceof Consultation)) throw new IllegalArgumentException("상담 일정에 대해서만 상담 요약 요청할 수 있습니다.");
        // ✅ 1.1 파일을 S3에 업로드하고 URL 가져오기
//        try {

        String s3Url = s3ClientService.upload(file);
//        } catch (IOException e) {
//            System.out.println("========== S3 업로드 중 에러 발생 ==========");
//        }
        // ✅ 1.2 DB에 원본 파일 URL 저장
        AudioSummary audioSummary = new AudioSummary();
        audioSummary.setOriginalFileUrl(s3Url);
        audioSummary.setCustomer((Customer) user);
        audioSummary.setSchedule((Consultation) schedule);
        audioSummary.setStatus("PENDING");
        audioSummary = summaryRepository.save(audioSummary); // 현재 원본파일url, status(PENDING)만 존재

        // ✅ 1.3 FastAPI 요청을 위한 데이터 준비
        String fastApiUrl = "http://127.0.0.1:8001/predict";  // FastAPI 서버 URL
        RestTemplate restTemplate = new RestTemplate();

        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("file_url", s3Url);
        requestBody.put("audio_summary_id", audioSummary.getId());

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

            // 요청이 성공하면 상태를 "COMPLETED"로 업데이트 가능
            audioSummary.setStatus("PROCESSING");
            summaryRepository.save(audioSummary);

        } catch (Exception e) {
            System.out.println("❌ FastAPI 요청 실패: " + e.getMessage());
            audioSummary.setStatus("FAILED");  // 요청 실패 시 상태 변경
            summaryRepository.save(audioSummary);
        }
        // ✅ 4. 최종 응답 반환
        return toAudioSummaryResponseDto(audioSummary);
    }

    // AI 서버로부터 결과를 받음
    @Transactional
    public AudioSummaryResponseDto registSummaryResult(AudioSummaryCreateDto audioSummaryCreateDto) {
        AudioSummary audioSummary = summaryRepository.findById(audioSummaryCreateDto.getAudioSummaryId()).orElseThrow();

        if (audioSummaryCreateDto.getStatus().equals("COMPLETED")) {
            audioSummary.setStatus("COMPLETED");
            audioSummary.setSummaryResult(audioSummaryCreateDto.getSummaryResult());
        } else {
            audioSummary.setStatus("FAILED");
        }
        // 현재 상태를 "PROCESSING"으로 변경 (AI 분석 시작됨)
        summaryRepository.save(audioSummary); // 변경 사항을 DB에 반영

        return toAudioSummaryResponseDto(audioSummary);
    }

    // 분석 상황 반환
    public AudioSummaryResponseDto registSummaryResult(Integer audioSummarizeId) {

        AudioSummary audioAnalysis = summaryRepository.findById(audioSummarizeId).orElseThrow();

        return toAudioSummaryResponseDto(audioAnalysis);
    }


    private AudioSummaryResponseDto toAudioSummaryResponseDto(AudioSummary audioAnalysis) {
        AudioSummaryResponseDto audioAnalysisResponseDto = new AudioSummaryResponseDto();

        audioAnalysisResponseDto.setId(audioAnalysis.getId());
        audioAnalysisResponseDto.setStatus(audioAnalysis.getStatus());
        audioAnalysisResponseDto.setSummaryResult(audioAnalysis.getSummaryResult());

        return audioAnalysisResponseDto;
    }
}
