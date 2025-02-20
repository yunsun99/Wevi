package com.ssafy.wevi.service;

import com.ssafy.wevi.domain.CoupleRequest;
import com.ssafy.wevi.domain.Notification;
import com.ssafy.wevi.domain.user.User;
import com.ssafy.wevi.domain.schedule.Schedule;
import com.ssafy.wevi.dto.Notifications.NotificationResponseDto;
import com.ssafy.wevi.enums.NotificationType;
import com.ssafy.wevi.repository.NotificationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class NotificationService {
    private final NotificationRepository notificationRepository;
    private final FirebaseCloudMessagingService firebaseCloudMessagingService;

    // NotificationType: COUPLE_REQUEST_SENT, COUPLE_REQUEST_RESPONSE
    @Transactional
    public void createCoupleRequestNotification(User receiver, String title, String message, CoupleRequest coupleRequest, String type) {
        Notification notification = Notification.builder()
                .receiver(receiver)
                .title(title)
                .message(message)
                .type(type)
                .coupleRequest(coupleRequest)  // 커플 요청 연결
                .isRead(false)
                .build();

        notificationRepository.save(notification);

        if (receiver.getFcmToken() != null) {
            firebaseCloudMessagingService.sendPushNotification(receiver.getFcmToken(), title, message);
        }
    }

    // NotificationType: CONSULTATION_REGISTERED, CONTRACT_REGISTERED, SCHEDULE_REGISTERED, SCHEDULE_REMINDER
    @Transactional
    public void createScheduleNotification(User receiver, String title, String message, Schedule schedule, String type) {
        Notification notification = Notification.builder()
                .receiver(receiver)
                .title(title)
                .message(message)
                .type(type)
                .schedule(schedule)
                .isRead(false)
                .build();

        notificationRepository.save(notification);

        if (receiver.getFcmToken() != null) {
            firebaseCloudMessagingService.sendPushNotification(receiver.
                    getFcmToken(), "📅 일정 알림", message);
        }
    }

    public List<NotificationResponseDto> getNotifications(Integer userId) {
        return notificationRepository.findByReceiver_UserId(userId).stream()
                .map(notification -> NotificationResponseDto.builder()
                        .notificationId(notification.getNotificationId())
                        .title(notification.getTitle())
                        .message(notification.getMessage())
                        .type(notification.getType())
                        .isRead(notification.getIsRead())
                        .build()
                )
                .collect(Collectors.toList()); // 리스트로 변환
    }

    // 알림들을 한꺼번에 읽음 처리
    @Transactional
    public List<NotificationResponseDto> markNotificationsAsRead(List<Integer> notificationIds) {
        if (notificationIds == null || notificationIds.isEmpty()) {
            throw new IllegalArgumentException("Notification ID는 null이나 empty가 될 수 없습니다.");
        }

        // 알림들을 읽음 처리
        notificationRepository.markNotificationsAsRead(notificationIds);

        // 읽음 처리된 알림 목록 반환
        List<Notification> updatedNotifications = notificationRepository.findAllById(notificationIds);

        // NotificationResponseDto로 변환하여 반환
        return updatedNotifications.stream()
                .map(notification -> NotificationResponseDto.builder()
                        .notificationId(notification.getNotificationId())  // Integer로 반환
                        .type(notification.getType())
                        .title(notification.getTitle())
                        .message(notification.getMessage())
                        .isRead(notification.getIsRead())
                        .build())
                .collect(Collectors.toList());
    }

    @Transactional
    public void deleteNotifications(List<Integer> notificationIds) {
        if (notificationIds == null || notificationIds.isEmpty()) return;

        for (Integer notificationId : notificationIds) {
            notificationRepository.deleteById(notificationId);
        }
    }

}
