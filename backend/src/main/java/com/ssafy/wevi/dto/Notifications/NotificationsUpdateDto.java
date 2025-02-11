package com.ssafy.wevi.dto.Notifications;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class NotificationsUpdateDto {
    private List<Integer> notificationIds;
}
