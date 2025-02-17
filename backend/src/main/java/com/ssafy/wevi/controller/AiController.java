package com.ssafy.wevi.controller;

import com.ssafy.wevi.config.SecurityUtils;
import com.ssafy.wevi.dto.ApiResponseDto;
import com.ssafy.wevi.dto.AudioSummary.AudioSummaryCreateDto;
import com.ssafy.wevi.dto.AudioSummary.AudioSummaryResponseDto;
import com.ssafy.wevi.repository.SummaryRepository;
import com.ssafy.wevi.service.SummaryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/ai")
@RequiredArgsConstructor
public class AiController {
    private final SummaryService summaryService;
    private final SummaryRepository analysisRepository;

    // ✅ 1. 오디오 파일 업로드 및 AI 분석 요청
    @PostMapping("/analyze/{scheduleId}")
    public ApiResponseDto<?> uploadAudio(@RequestParam("file") MultipartFile file, @PathVariable Integer scheduleId) throws IOException {
        // 로그인한 유저 ID 가져오기
        Integer loginUserId = Integer.parseInt(SecurityUtils.getAuthenticatedUserId());

        AudioSummaryResponseDto audioAnalysisResponseDto = summaryService.uploadAndSummarizeAudio(file, loginUserId, scheduleId);

        return new ApiResponseDto<>(
                HttpStatus.OK.value(),
                true,
                "Audio analysis request successfully.",
                audioAnalysisResponseDto
        );
    }
    // AI 서버로부터 결과를 받음
    @PatchMapping("/analyze/result")
    public ApiResponseDto<?> addSummaryResult(@RequestBody AudioSummaryCreateDto audioSummaryCreateDto) {
        System.out.println(audioSummaryCreateDto.getAudioSummaryId()+", "+ audioSummaryCreateDto.getSummaryResult()+", "+audioSummaryCreateDto.getStatus());
        AudioSummaryResponseDto audioAnalysisResponseDto = summaryService.registSummaryResult(audioSummaryCreateDto);

        return new ApiResponseDto<>(
                HttpStatus.OK.value(),
                true,
                "Audio summary completed successfully.",
                audioAnalysisResponseDto
        );
    }
    // ✅ 2. 분석 상태 확인 API
    @GetMapping("/analyze/{audioAnalyzeId}")
    public ApiResponseDto<?> getAnalysisStatus(@PathVariable Integer audioSummarizeId) {
        AudioSummaryResponseDto audioAnalysisResponseDto = summaryService.registSummaryResult(audioSummarizeId);
//        if (audioAnalysisResponseDto) {
//            return ResponseEntity.status(404).body(Map.of("status", "NOT_FOUND"));
//        }
        return new ApiResponseDto<>(
                HttpStatus.OK.value(),
                true,
                "Audio summary status founded successfully.",
                audioAnalysisResponseDto
        );
    }
}
