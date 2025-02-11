package com.ssafy.wevi.repository;

import com.ssafy.wevi.domain.CoupleRequest;
import com.ssafy.wevi.domain.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Integer> {
    List<Notification> findByReceiver_UserId(int receiverId);

    @Modifying
    @Query("UPDATE Notification n SET n.isRead = true WHERE n.notificationId IN :notificationIds")
    int markNotificationsAsRead(@Param("notificationIds") List<Integer> notificationIds);

    void deleteByCoupleRequest(CoupleRequest coupleRequest);
}
