package com.ssafy.wevi.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class NotificationResponseDto {
    private Integer notificationId;
    private String type;   // type에 따라 title이 정해짐
    private String title;
    private String message;
    private Boolean isRead;
}
