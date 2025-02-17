package com.ssafy.wevi.service;

import com.ssafy.wevi.domain.AudioSummary;
import com.ssafy.wevi.dto.AudioSummary.AudioSummaryResponseDto;
import com.ssafy.wevi.repository.SummaryRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;
import java.util.concurrent.CompletableFuture;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class SummaryService {
    private final SummaryRepository analysisRepository;
    private final S3ClientService s3ClientService;

    // ✅ 1. 파일을 S3에 저장 후 AI 분석 요청
    public AudioSummaryResponseDto uploadAndSummarizeAudio(MultipartFile file) throws IOException {
        // ✅ 1.1 파일을 S3에 업로드하고 URL 가져오기
//        try {
            String s3Url = s3ClientService.upload(file);
//        } catch (IOException e) {
//            System.out.println("========== S3 업로드 중 에러 발생 ==========");
//        }
        // ✅ 1.2 DB에 원본 파일 URL 저장
        AudioSummary audioAnalysis = new AudioSummary();
        audioAnalysis.setOriginalFileUrl(s3Url);
        audioAnalysis = analysisRepository.save(audioAnalysis); // 현재 원본파일url, status(PENDING)만 존재

        // ✅ 1.3 AI 서버에 비동기 요청
        summarizeAudioAsync(audioAnalysis.getId(), s3Url);

        return toAudioSummaryResponseDto(audioAnalysis);
    }

    // ✅ 2. 비동기 AI 분석 실행 (원본 파일 URL 전달)
    @Async
    public CompletableFuture<Void> summarizeAudioAsync(Integer fileId, String originalFileUrl) {
        Optional<AudioSummary> optionalAnalysis = analysisRepository.findById(fileId);

        if (optionalAnalysis.isEmpty()) {
            log.error("분석 요청 실패: 파일 ID {}를 찾을 수 없음", fileId);
            return CompletableFuture.completedFuture(null); // 예외 대신 빈 CompletableFuture 반환하여 비동기 흐름 유지
        }

        // 존재하는 경우, AudioAnalysis 객체를 가져옴
        AudioSummary audioAnalysis = optionalAnalysis.get();

        // 현재 상태를 "PROCESSING"으로 변경 (AI 분석 시작됨)
        audioAnalysis.setStatus("PROCESSING");
        analysisRepository.save(audioAnalysis); // 변경 사항을 DB에 반영

        // FastAPI 서버에 비동기 HTTP 요청 (파일 URL 전달)
//        webClient.post()
//                .uri(aiServerUrl) // FastAPI 서버의 분석 API 엔드포인트
//                .bodyValue(Map.of("file_url", originalFileUrl)) // JSON 형식으로 요청 데이터 전송
//                .retrieve() // 응답을 받기 위한 WebClient의 메서드
//                .bodyToMono(Map.class) // 응답을 Map 형태로 비동기 처리
//                .doOnError(error -> log.error("❌ AI 서버 요청 중 오류 발생: {}", error.getMessage())) // 오류 발생 시 로그 출력
//                .subscribe(response -> { // 응답이 오면 아래 로직 실행 (비동기 처리)
//                    log.info("AI 분석 완료: {}", response);
//
//                    // ✅ 분석이 완료되었으므로 결과를 DB에 반영
//                    audioAnalysis.setAnalysisResult(response.toString()); // 응답 결과를 저장
//                    audioAnalysis.setStatus("COMPLETED"); // 상태를 "완료"로 변경
//                    analysisRepository.save(audioAnalysis); // DB에 반영
//                });

        // 비동기 작업이므로 즉시 반환 (AI 서버의 응답을 기다리지 않음)
        return CompletableFuture.completedFuture(null);
    }

    // 분석 상황 반환
    public AudioSummaryResponseDto getSummaryResult(Integer audioSummarizeId) {

        AudioSummary audioAnalysis = analysisRepository.findById(audioSummarizeId).orElseThrow();

        return toAudioSummaryResponseDto(audioAnalysis);
    }


    private AudioSummaryResponseDto toAudioSummaryResponseDto(AudioSummary audioAnalysis) {
        AudioSummaryResponseDto audioAnalysisResponseDto = new AudioSummaryResponseDto();

        audioAnalysisResponseDto.setId(audioAnalysis.getId());
        audioAnalysisResponseDto.setStatus(audioAnalysis.getStatus());
        audioAnalysisResponseDto.setAnalysisResult(audioAnalysis.getAnalysisResult());

        return audioAnalysisResponseDto;
    }
}
