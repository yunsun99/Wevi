package com.ssafy.wevi.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "audio_analysis")
@Getter
@Setter
@NoArgsConstructor
public class AudioSummary {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private String originalFileUrl;  // 원본 파일 URL

    @Column
    private String convertedFileUrl; // 변환된 WAV 파일 URL (없을 수도 있음)

    @Column(nullable = false)
    private String status = "PENDING"; // ✅ 분석 상태 (PENDING, PROCESSING, COMPLETED)

    @Lob
    private String analysisResult; // AI 분석 결과 (JSON 형태)



//    @Lob
//    private String transcription; // Whisper STT 결과
}
