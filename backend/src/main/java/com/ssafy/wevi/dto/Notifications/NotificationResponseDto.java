package com.ssafy.wevi.dto.Notifications;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class NotificationResponseDto {
    private Integer notificationId;
    private String type;
    private String title;
    private String message;
    private Boolean isRead;
}
