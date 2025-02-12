package com.ssafy.wevi.dto.schedule;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class MiddleProcessStepCreateDto {
    private Integer scheduleId;
    private Integer categoryId;
    private String stepName;
    private boolean isVisit;
}
