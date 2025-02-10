package com.ssafy.wevi.domain.schedule;


import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "consultations")
@NoArgsConstructor
@DiscriminatorValue("consultation")
//@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Consultation extends Schedule{
//    private int id; // 스케줄ID
//    private LocalDateTime startTime;
//    private LocalDateTime endTime;
//    private String title;
//    private Customer customer;
//    private Vendor vendor;
//    private String dtype;
    private String request; // 고객 요청사항
}
