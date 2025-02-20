package com.ssafy.wevi.domain;

import com.ssafy.wevi.domain.schedule.Schedule;
import com.ssafy.wevi.domain.user.Customer;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "audio_summaries")
@Getter
@Setter
@NoArgsConstructor
public class AudioSummary {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer audioSummaryId;

    @Column(nullable = false)
    private String originalFileUrl;  // 원본 파일 URL

//    @Column
//    private String convertedFileUrl; // 변환된 WAV 파일 URL (없을 수도 있음)

    @Column(nullable = false)
    private String status; // ✅ 분석 상태 (PROCESSING, COMPLETED)

    @Lob
    private String summaryResult; // AI 분석 결과 (JSON 형태)

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "customer_id", referencedColumnName = "user_id")
    private Customer customer;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "consultation_id", referencedColumnName = "schedule_id")
    private Schedule schedule;

//    @Lob
//    private String transcription; // Whisper STT 결과
}
