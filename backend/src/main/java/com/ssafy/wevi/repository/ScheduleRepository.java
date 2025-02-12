package com.ssafy.wevi.repository;

import com.ssafy.wevi.domain.schedule.Consultation;
import com.ssafy.wevi.domain.schedule.Schedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ScheduleRepository extends JpaRepository<Schedule, Integer> {
    // 전체 일정 조회
    // 소비자ID로 조회
    @Query("SELECT s FROM Schedule s WHERE s.customer.userId = :customerId")
    List<Schedule> findAllScheduleByCustomerId(@Param("customerId") Integer customerId);
    // 업체ID로 조회
    @Query("SELECT s FROM Schedule s WHERE s.vendor.userId = :vendorId")
    List<Schedule> findAllScheduleByVendorId(@Param("vendorId") Integer vendorId);
    // 소비자ID, 커플ID로 모두 조회
    @Query("SELECT s FROM Schedule s WHERE s.customer.userId = :customerId OR s.customer.userId = :spouseId")
    List<Schedule> findAllScheduleWithSpouse(@Param("customerId") Integer customerId,@Param("spouseId") Integer spouseId);

    // 전체 중간과정 조회
    @Query("SELECT m FROM MiddleProcess m WHERE m.customer.userId = :customerId")
    List<Schedule> findAllMiddleProcessByCustomerId(@Param("customerId") Integer customerId);
    @Query("SELECT m FROM MiddleProcess m WHERE m.vendor.userId = :vendorId")
    List<Schedule> findAllMiddleProcessByVendorId(@Param("vendorId") Integer vendorId);
    @Query("SELECT m FROM MiddleProcess m WHERE m.customer.userId = :customerId OR m.customer.spouse.userId = :spouseId")
    List<Schedule> findAllMiddleProcessWithSpouse(@Param("customerId") Integer customerId,@Param("spouseId") Integer spouseId);

    // 전체 상담 조회
    @Query("SELECT c FROM Consultation c WHERE c.customer.userId = :customerId")
    List<Schedule> findAllConsultationByCustomerId(@Param("customerId") Integer customerId);
    @Query("SELECT c FROM Consultation c WHERE c.vendor.userId = :vendorId")
    List<Schedule> findAllConsultationByVendorId(@Param("vendorId") Integer vendorId);
    @Query("SELECT c FROM Consultation c WHERE c.customer.userId = :customerId OR c.customer.spouse.userId = :spouseId")
    List<Schedule> findAllConsultationWithSpouse(@Param("customerId") Integer customerId,@Param("spouseId") Integer spouseId);

    // 전체 계약 조회
    // 소비자 ID로 조회
    @Query("SELECT c FROM Contract c WHERE c.customer.userId = :customerId")
    List<Schedule> findAllContractByCustomerId(@Param("customerId") Integer customerId);
    // 업체 ID로 조회
    @Query("SELECT c FROM Contract c WHERE c.vendor.userId = :vendorId")
    List<Schedule> findAllContractByVendorId(@Param("vendorId") Integer vendorId);
    // 소비자 ID, 커플 ID로 모두 조회    
    @Query("SELECT c FROM Contract c WHERE c.customer.userId = :customerId OR c.customer.spouse.userId = :spouseId")
    List<Schedule> findAllContractWithSpouse(@Param("customerId") Integer customerId,@Param("spouseId") Integer spouseId);

    @Query("SELECT c FROM Consultation c WHERE c.vendor.userId = :vendorId AND c.startDateTime < :endDateTime AND c.endDateTime > :startDateTime")
    List<Consultation> findConflictSchedule(@Param("startDateTime")LocalDateTime startDateTime, @Param("endDateTime") LocalDateTime endDateTime, @Param("vendorId") Integer vendorId);
}
