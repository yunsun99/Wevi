package com.ssafy.wevi.service;

import com.ssafy.wevi.domain.CoupleRequest;
import com.ssafy.wevi.domain.Notification;
import com.ssafy.wevi.domain.user.User;
import com.ssafy.wevi.domain.schedule.Schedule;
import com.ssafy.wevi.enums.NotificationType;
import com.ssafy.wevi.repository.NotificationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class NotificationService {
    private final NotificationRepository notificationRepository;
    private final FirebaseCloudMessagingService firebaseCloudMessagingService;

    // NotificationType: COUPLE_REQUEST_SENT
    public void createCoupleRequestSentNotification(User receiver, String message, CoupleRequest coupleRequest) {
        Notification notification = Notification.builder()
                .receiver(receiver)
                .message(message)
                .type(NotificationType.COUPLE_REQUEST_SENT.name())
                .coupleRequest(coupleRequest)  // 커플 요청 연결
                .isRead(false)
                .build();

        notificationRepository.save(notification);

        if (receiver.getFcmToken() != null) {
            firebaseCloudMessagingService.sendPushNotification(receiver.getFcmToken(), "❤ 커플 연동 신청", message);
        }
    }

    // NotificationType: COUPLE_REQUEST_RESPONSE
    public void createCoupleRequestResponseNotification(User receiver, String message, CoupleRequest coupleRequest) {
        Notification notification = Notification.builder()
                .receiver(receiver)
                .message(message)
                .type(NotificationType.COUPLE_REQUEST_RESPONSE.name())
                .coupleRequest(coupleRequest)  // 커플 요청 연결
                .isRead(false)
                .build();

        notificationRepository.save(notification);

        if (receiver.getFcmToken() != null) {
            firebaseCloudMessagingService.sendPushNotification(receiver.getFcmToken(), "❤ 커플 연동 답장", message);
        }
    }

    // CONSULTATION_REGISTERED, CONTRACT_REGISTERED, SCHEDULE_REMINDER
    public void createScheduleNotification(User receiver, String message, Schedule schedule) {
        Notification notification = Notification.builder()
                .receiver(receiver)
                .message(message)
                .type("SCHEDULE_REMINDER")
                .schedule(schedule)
                .isRead(false)
                .build();

        notificationRepository.save(notification);

        if (receiver.getFcmToken() != null) {
            firebaseCloudMessagingService.sendPushNotification(receiver.getFcmToken(), "📅 일정 알림", message);
        }
    }
}
