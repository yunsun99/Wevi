package com.ssafy.wevi.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "MiddleProcessSteps")
public class MiddleProcessStep {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "middle_process_step_id")
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    private String name;

    private boolean isVisit;
}