package com.ssafy.wevi.domain.schedule;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@Table(name = "contracts")
@NoArgsConstructor
@DiscriminatorValue("contract")
public class Contract extends Schedule{
    private int price;  // 계약금액
//    @Column(nullable = false)
//    private LocalDateTime contractDate; // 계약일
    private String detail;  // 계약 세부사항

    @OneToMany(mappedBy = "contract")
    private List<MiddleProcess> middleProcessList = new ArrayList<>();
}
