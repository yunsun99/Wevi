package com.ssafy.wevi.service;

import com.ssafy.wevi.domain.CoupleRequest;
import com.ssafy.wevi.domain.user.Customer;
import com.ssafy.wevi.enums.CoupleRequestStatus;
import com.ssafy.wevi.repository.CoupleRequestRepository;
import com.ssafy.wevi.repository.CustomerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.NoSuchElementException;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class CoupleRequestService {

    private final CustomerRepository customerRepository;
    private final CoupleRequestRepository coupleRequestRepository;
    private final NotificationService notificationService;

    // 커플 요청 보내기
    @Transactional
    public CoupleRequest createCoupleRequest(Integer customerId, String spouseEmail) {
        Customer customer = customerRepository.findById(customerId)
                .orElseThrow(() -> new NoSuchElementException("해당 ID의 사용자를 찾을 수 없습니다: " + customerId));

        Customer spouse = customerRepository.findByEmail(spouseEmail)
                .orElseThrow(() -> new NoSuchElementException("해당 이메일의 사용자를 찾을 수 없습니다: " + spouseEmail));

        CoupleRequest coupleRequest = CoupleRequest.builder()
                        .sender(customer)
                        .receiver(spouse)
                        .status(CoupleRequestStatus.PENDING.name())
                        .build();

        coupleRequestRepository.save(coupleRequest);

        // 알림을 생성하고 푸시 알림 전송
        String message = customer.getName() + "님이 커플 연동 신청을 보냈습니다.";
        notificationService.createCoupleRequestSentNotification(spouse, message, coupleRequest);

        return coupleRequest;
    }

    @Transactional
    public CoupleRequest updateCoupleRequest(Integer customerId, String status) {
        // 상태 값 검증
        if (!CoupleRequestStatus.ACCEPTED.name().equals(status) && !CoupleRequestStatus.REJECTED.name().equals(status)) {
            throw new IllegalArgumentException("유효하지 않은 상태 값입니다: " + status);
        }

        // 로그인된 사용자 확인
        Customer customer = customerRepository.findById(customerId)
                .orElseThrow(() -> new NoSuchElementException("해당 ID의 사용자를 찾을 수 없습니다: " + customerId));

        // 수신된 커플 요청 확인
        CoupleRequest coupleRequest = customer.getReceivedRequest();
        if (coupleRequest == null) {
            throw new IllegalStateException("해당 사용자는 커플 요청을 받은 적이 없습니다.");
        }

        // 상대방 사용자 정보 조회
        Customer spouse = coupleRequest.getSender();

        // 상태가 "REJECTED"인 경우, 요청 삭제 후 void 반환
        if (CoupleRequestStatus.REJECTED.name().equals(status)) {
            String message = customer.getName() + "님이 커플 연동 신청을 거절하였습니다.";
            notificationService.createCoupleRequestSentNotification(spouse, message, coupleRequest);
            coupleRequestRepository.delete(coupleRequest); // 요청 삭제
            return null; // 거절된 경우 반환값 없음
        }

        // 상태가 "ACCEPTED"인 경우, 상태 업데이트
        coupleRequest.setStatus(status);
        coupleRequestRepository.save(coupleRequest);

        // 알림 메시지 설정 및 전송
        String message = customer.getName() + "님이 커플 연동 신청을 수락하였습니다.";
        notificationService.createCoupleRequestSentNotification(spouse, message, coupleRequest);

        // 수락된 경우 업데이트된 객체 반환
        return coupleRequest;
    }

}
