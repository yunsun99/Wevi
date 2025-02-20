package com.ssafy.wevi.dto.schedule;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ConsultationCreateDto {
    private String startDate;
    private String startTime;
    private String title;
    private Integer categoryId;
    private String request;
    private Integer vendorId;
}
