package com.ssafy.wevi.controller;

import com.ssafy.wevi.config.SecurityUtils;
import com.ssafy.wevi.dto.Ai.RecommendCreateDto;
import com.ssafy.wevi.dto.Ai.RecommendResponseDto;
import com.ssafy.wevi.dto.ApiResponseDto;
import com.ssafy.wevi.dto.Ai.AudioSummaryCreateDto;
import com.ssafy.wevi.dto.Ai.AudioSummaryResponseDto;
import com.ssafy.wevi.repository.SummaryRepository;
import com.ssafy.wevi.service.AiService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/ai")
@RequiredArgsConstructor
public class AiController {
    private final AiService aiService;
    private final SummaryRepository analysisRepository;

    // ✅ 1. 오디오 파일 업로드 및 AI 분석 요청
    @PostMapping("/analyze/{scheduleId}")
    public ApiResponseDto<?> uploadAudio(@RequestParam("file") MultipartFile file, @PathVariable Integer scheduleId) throws IOException {
        // 로그인한 유저 ID 가져오기
        Integer loginUserId = Integer.parseInt(SecurityUtils.getAuthenticatedUserId());

        AudioSummaryResponseDto audioSummaryResponseDto = aiService.uploadAndSummarizeAudio(file, loginUserId, scheduleId);

        if (audioSummaryResponseDto.getStatus().equals("FAILED")) {
            return new ApiResponseDto<>(
                    HttpStatus.SERVICE_UNAVAILABLE.value(),
                    true,
                    "AI Server doesn't work normally.",
                    audioSummaryResponseDto
            );
        } else {
            return new ApiResponseDto<>(
                    HttpStatus.OK.value(),
                    true,
                    "Summary requested successfully.",
                    audioSummaryResponseDto
            );
        }
    }
    // AI 서버로부터 분석 결과를 받는 API
    @PatchMapping("/analyze/result")
    public ApiResponseDto<?> addSummaryResult(@RequestBody AudioSummaryCreateDto audioSummaryCreateDto) {
        System.out.println(audioSummaryCreateDto.getAudioSummaryId()+", "+ audioSummaryCreateDto.getSummaryResult()+", "+audioSummaryCreateDto.getStatus());
        AudioSummaryResponseDto audioAnalysisResponseDto = aiService.patchSummaryResult(audioSummaryCreateDto);

        return new ApiResponseDto<>(
                HttpStatus.OK.value(),
                true,
                "Audio summary completed successfully.",
                audioAnalysisResponseDto
        );
    }
    // ✅ 2. 분석 상태 확인 API
//    @GetMapping("/analyze/{audioAnalyzeId}")
//    public ApiResponseDto<?> getAnalysisStatus(@PathVariable Integer audioSummarizeId) {
//        AudioSummaryResponseDto audioAnalysisResponseDto = summaryService.patchSummaryResult(audioSummarizeId);
////        if (audioAnalysisResponseDto) {
////            return ResponseEntity.status(404).body(Map.of("status", "NOT_FOUND"));
////        }
//        return new ApiResponseDto<>(
//                HttpStatus.OK.value(),
//                true,
//                "Audio summary status founded successfully.",
//                audioAnalysisResponseDto
//        );
//    }

    // 모든 요약 정보 조회
    @GetMapping("/analyze")
    public ApiResponseDto<?> getAllSummary() {
        // 로그인한 유저 ID 가져오기
        Integer loginUserId = Integer.parseInt(SecurityUtils.getAuthenticatedUserId());

        List<AudioSummaryResponseDto> audioSummaryResponseDtoList = aiService.getAllSummary(loginUserId);
        return new ApiResponseDto<>(
                HttpStatus.OK.value(),
                true,
                "Audio summary status founded successfully.",
                audioSummaryResponseDtoList
        );
    }
    
    // 업체 추천 요청
    @PostMapping("/recommend")
    public ApiResponseDto<?> getRecommend(@RequestBody RecommendCreateDto recommendCreateDto) {
        // 로그인한 유저 ID 가져오기
        Integer loginUserId = Integer.parseInt(SecurityUtils.getAuthenticatedUserId());

        RecommendResponseDto audioSummaryResponseDtoList = aiService.addRecommend(recommendCreateDto, loginUserId);
        return new ApiResponseDto<>(
                HttpStatus.OK.value(),
                true,
                "Audio summary status founded successfully.",
                audioSummaryResponseDtoList
        );
    }

    // 최근 추천 내용 조회
    @GetMapping("/recommend")
    public ApiResponseDto<?> getRecentRecommend() {
        // 로그인한 유저 ID 가져오기
        Integer loginUserId = Integer.parseInt(SecurityUtils.getAuthenticatedUserId());

        RecommendResponseDto recommendResponseDto = aiService.getRecentRecommend(loginUserId);
        return new ApiResponseDto<>(
                HttpStatus.OK.value(),
                true,
                "Audio summary status founded successfully.",
                recommendResponseDto
        );
    }
}