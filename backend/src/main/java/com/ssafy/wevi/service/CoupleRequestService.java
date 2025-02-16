package com.ssafy.wevi.service;

import com.ssafy.wevi.domain.CoupleRequest;
import com.ssafy.wevi.domain.user.Customer;
import com.ssafy.wevi.dto.CoupleRequest.CoupleRequestResponseDto;
import com.ssafy.wevi.enums.CoupleRequestStatus;
import com.ssafy.wevi.enums.NotificationType;
import com.ssafy.wevi.repository.CoupleRequestRepository;
import com.ssafy.wevi.repository.CustomerRepository;
import com.ssafy.wevi.repository.NotificationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class CoupleRequestService {

    private final CustomerRepository customerRepository;
    private final CoupleRequestRepository coupleRequestRepository;
    private final NotificationService notificationService;
    private final NotificationRepository notificationRepository;

    // 커플 요청 보내기
    @Transactional
    public CoupleRequestResponseDto createCoupleRequest(Integer customerId, String spouseEmail) {
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
        notificationService.createCoupleRequestNotification(spouse, "❤ 커플 연동 신청", message, coupleRequest, NotificationType.COUPLE_REQUEST_SENT.name());

        return toCoupleRequestResponseDto(coupleRequest);
    }

    @Transactional
    public CoupleRequestResponseDto updateCoupleRequest(Integer customerId, String status) {
        if (!CoupleRequestStatus.ACCEPTED.name().equals(status) && !CoupleRequestStatus.REJECTED.name().equals(status)) {
            throw new IllegalArgumentException("유효하지 않은 상태 값입니다: " + status);
        }

        Customer customer = customerRepository.findById(customerId)
                .orElseThrow(() -> new NoSuchElementException("해당 ID의 사용자를 찾을 수 없습니다: " + customerId));

        List<CoupleRequest> coupleRequests = customer.getReceivedRequests();
        if (coupleRequests == null || coupleRequests.isEmpty()) {
            throw new IllegalStateException("해당 사용자는 커플 요청을 받은 적이 없습니다.");
        }
        CoupleRequest coupleRequest = coupleRequests.get(0);

        Customer spouse = coupleRequest.getSender();

        // 상태가 "REJECTED"인 경우, 요청 삭제 후 void 반환
        if (CoupleRequestStatus.REJECTED.name().equals(status)) {
            coupleRequest.setStatus(CoupleRequestStatus.REJECTED.name());
            coupleRequestRepository.save(coupleRequest);

            String message = customer.getName() + "님이 커플 연동 신청을 거절하였습니다.";
            notificationService.createCoupleRequestNotification(spouse, "❤ 커플 연동 답장", message, coupleRequest, NotificationType.COUPLE_REQUEST_RESPONSE.name());

            // coupleRequestRepository.delete(coupleRequest); // 요청 삭제
            // return null; // 거절된 경우 반환값 없음

            return toCoupleRequestResponseDto(coupleRequest);
        }

        // 상태가 "ACCEPTED"인 경우, 상태 업데이트

        // customer의 배우자 정보 저장
        customer.setSpouse(spouse);
        customerRepository.save(customer);

        // sposue의 배우자 정보 저장
        spouse.setSpouse(customer);
        customerRepository.save(spouse);

        // coupleRequest 정보 저장
        coupleRequest.setStatus(status);
        coupleRequestRepository.save(coupleRequest);

        // 알림 메시지 설정 및 전송
        String message = customer.getName() + "님이 커플 연동 신청을 수락하였습니다.";
        notificationService.createCoupleRequestNotification(spouse, "❤ 커플 연동 답장", message, coupleRequest, NotificationType.COUPLE_REQUEST_RESPONSE.name());

        // 수락된 경우 업데이트된 객체 반환
        return toCoupleRequestResponseDto(coupleRequest);
    }

    // 커플 요청 취소
    @Transactional
    public void cancelCoupleRequest(Integer customerId, Integer coupleRequestId) {
        // 해당 id의 coupleRequest가 존재하지 않는 경우
        CoupleRequest coupleRequest = coupleRequestRepository.findById(coupleRequestId)
                .orElseThrow(() -> new NoSuchElementException("해당 ID의 커플요청을 찾을 수 없습니다: " + coupleRequestId));

        // 보낸 사람만 삭제 가능하도록 검증
        if (!coupleRequest.getSender().getUserId().equals(customerId)) {
            throw new SecurityException("본인이 보낸 요청만 취소할 수 있습니다.");
        }

        // 상대에게 전송된 커플요청 알림 삭제
        notificationRepository.deleteByCoupleRequest(coupleRequest);

        // 커플요청 삭제
        coupleRequestRepository.delete(coupleRequest);
    }

    // 커플연동 삭제 - 커플요청삭제
    @Transactional
    public void deleteCoupleRequest(Integer customerId) {
        Customer customer = customerRepository.findById(customerId)
                .orElseThrow(() -> new NoSuchElementException("해당 ID의 사용자를 찾을 수 없습니다: " + customerId));

        Integer spouseId = customer.getSpouse().getUserId();
        Customer spouse = customerRepository.findById(spouseId).orElseThrow(() -> new NoSuchElementException("해당 ID의 배우자를 찾을 수 없습니다: " + spouseId));

        // 본인의 spouse 정보를 초기화
        customer.setSpouse(null);
        customer.setSentRequests(new ArrayList<>());
        customer.setReceivedRequests(new ArrayList<>());
        customerRepository.save(customer);

        // 배우자의 spouse 정보를 초기화
        spouse.setSpouse(null);
        customerRepository.save(spouse);

        // userId가 sender 또는 receiver인 커플 요청 삭제
        coupleRequestRepository.deleteBySenderUserIdOrReceiverUserId(customer.getUserId(), spouseId);


    }

    // 커플 요청 응답 형식으로 변환
    private CoupleRequestResponseDto toCoupleRequestResponseDto(CoupleRequest coupleRequest) {
        if (coupleRequest == null) return null;

        return CoupleRequestResponseDto.builder()
                .coupleRequestId(coupleRequest.getCoupleRequestId())
                .senderId(coupleRequest.getSender().getUserId())
                .receiverId(coupleRequest.getReceiver().getUserId())
                .status(coupleRequest.getStatus())
                .build();
    }
}
