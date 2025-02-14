package com.ssafy.wevi.repository;

import com.ssafy.wevi.domain.schedule.Consultation;
import com.ssafy.wevi.domain.user.Vendor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ConsultationRepository extends JpaRepository<Consultation, Integer> {
    List<Consultation> findByVendorAndStartDateTimeBetween(Vendor vendor, LocalDateTime startDateTime, LocalDateTime endDateTime);
}
