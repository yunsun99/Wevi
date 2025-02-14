package com.ssafy.wevi.repository;

import com.ssafy.wevi.domain.CoupleRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CoupleRequestRepository extends JpaRepository<CoupleRequest, Integer> {
    public Optional<CoupleRequest> findBySenderUserIdOrReceiverUserId(Integer senderUserId, Integer receiverUserId);

    public void deleteBySenderUserIdOrReceiverUserId(int senderUserId, int receiverUserId);
}
