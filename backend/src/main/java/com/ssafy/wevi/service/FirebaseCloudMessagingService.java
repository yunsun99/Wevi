package com.ssafy.wevi.service;

import com.google.firebase.messaging.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.concurrent.ExecutionException;

@Service
@RequiredArgsConstructor
@Slf4j
public class FirebaseCloudMessagingService {
    public void sendPushNotification(String targetToken, String title, String body) {

        Message message = Message.builder()
                .setWebpushConfig(WebpushConfig.builder()
                        .setNotification(new WebpushNotification(
                                title, body))
                        .setFcmOptions(WebpushFcmOptions.withLink("https://i12b208.p.ssafy.io/notification"))
                        .build())
                .setToken(targetToken)
                .build();

        try {
            String response = FirebaseMessaging.getInstance().sendAsync(message).get();
            log.info("✅ FCM 푸시 알림 전송 성공: {}", response);
        } catch (InterruptedException | ExecutionException e) {
            log.error("🔥 FCM 푸시 알림 전송 실패!", e);
        }
    }
}