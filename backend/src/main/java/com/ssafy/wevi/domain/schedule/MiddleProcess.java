package com.ssafy.wevi.domain.schedule;


import com.ssafy.wevi.domain.MiddleProcessStep;
import com.ssafy.wevi.enums.MiddleProcessStatus;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Table(name = "middle_processes")
@DiscriminatorValue("middle_process")
@NoArgsConstructor
public class MiddleProcess extends Schedule{
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private MiddleProcessStatus status;

    private String detail;

    // 단계 완료 날짜
    private LocalDateTime completeDateTime;

//    @Column(name = "is_visit", nullable = false)
//    private boolean isVisit;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "middle_process_step_id", nullable = false)
    private MiddleProcessStep middleProcessStep;

    // 계약과 연동
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "contract_id", referencedColumnName = "schedule_id", nullable = false)
    private Contract contract;
}
