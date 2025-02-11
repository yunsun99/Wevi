package com.ssafy.wevi.dto.schedule;

import com.ssafy.wevi.domain.user.Customer;
import com.ssafy.wevi.domain.user.Vendor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
@Getter
@Setter
@NoArgsConstructor
public class ScheduleDto {
    private int id;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private String title;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private Customer customer;
    private Vendor vendor;
//    private ScheduleStatus status;
}
