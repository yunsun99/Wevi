package com.ssafy.wevi.controller;

import com.ssafy.wevi.dto.ApiResponseDto;
import com.ssafy.wevi.dto.AudioAnalysis.AudioAnalysisResponseDto;
import com.ssafy.wevi.repository.AnalysisRepository;
import com.ssafy.wevi.service.AnalysisService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/ai")
@RequiredArgsConstructor
public class AiController {
    private final AnalysisService analysisService;
    private final AnalysisRepository analysisRepository;

    // ✅ 1. 오디오 파일 업로드 및 AI 분석 요청
    @PostMapping("/analyze")
    public ApiResponseDto<?> uploadAudio(@RequestParam("file") MultipartFile file) throws IOException {
        AudioAnalysisResponseDto audioAnalysisResponseDto = analysisService.uploadAndAnalyzeAudio(file);

        return new ApiResponseDto<>(
                HttpStatus.OK.value(),
                true,
                "Audio analysis request successfully.",
                audioAnalysisResponseDto
        );
    }

//    // ✅ 2. 분석 상태 확인 API
//    @GetMapping("/analyze/{audioAnalyzeId}")
//    public ResponseEntity<?> getAnalysisStatus(@PathVariable Integer audioAnalyzeId) {
//        AudioAnalysisResponseDto audioAnalysisResponseDto = analysisService.getAnalysisResult(audioAnalyzeId);
////        if (audioAnalysisResponseDto) {
////            return ResponseEntity.status(404).body(Map.of("status", "NOT_FOUND"));
////        }
//        AudioAnalysisResponseDto audioAnalysisResponseDto = optionalAnalysis.get();
//        return ResponseEntity.ok(Map.of("status", analysis.getStatus(), "result", analysis.getAnalysisResult()));
//    }
}
