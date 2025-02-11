package com.ssafy.wevi.repository;

import com.ssafy.wevi.domain.CoupleRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CoupleRequestRepository extends JpaRepository<CoupleRequest, Integer> {
}
