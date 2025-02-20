package com.ssafy.wevi.repository;

import com.ssafy.wevi.domain.schedule.Consultation;
import com.ssafy.wevi.domain.schedule.MiddleProcess;
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
    @Query("SELECT s FROM Schedule s WHERE s.customer.userId = :customerId ORDER BY s.startDateTime ASC")
    List<Schedule> findAllScheduleByCustomerId(@Param("customerId") Integer customerId);
    // 업체ID로 조회
    @Query("SELECT s FROM Schedule s WHERE s.vendor.userId = :vendorId ORDER BY s.startDateTime ASC")
    List<Schedule> findAllScheduleByVendorId(@Param("vendorId") Integer vendorId);
    // 소비자ID, 커플ID로 모두 조회
    @Query("SELECT s FROM Schedule s JOIN FETCH s.customer WHERE s.customer.userId = :customerId OR s.customer.userId = :spouseId ORDER BY s.startDateTime ASC")
    List<Schedule> findAllScheduleWithSpouse(@Param("customerId") Integer customerId,@Param("spouseId") Integer spouseId);

    // 전체 중간과정 조회
    @Query("SELECT m FROM MiddleProcess m WHERE m.customer.userId = :customerId ORDER BY m.middleProcessStep.middleProcessStepId ASC")
    List<Schedule> findAllMiddleProcessByCustomerId(@Param("customerId") Integer customerId);
    @Query("SELECT m FROM MiddleProcess m WHERE m.vendor.userId = :vendorId ")
    List<Schedule> findAllMiddleProcessByVendorId(@Param("vendorId") Integer vendorId);
    @Query("SELECT m FROM MiddleProcess m JOIN FETCH m.customer WHERE m.customer.userId = :customerId OR m.customer.userId = :spouseId ORDER BY m.middleProcessStep.middleProcessStepId ASC")
    List<Schedule> findAllMiddleProcessWithSpouse(@Param("customerId") Integer customerId,@Param("spouseId") Integer spouseId);

    @Query("SELECT m FROM MiddleProcess m WHERE m.customer.userId = :userId AND m.vendor.userId = :loginUserId")
    List<Schedule> findMiddleProcessByUserIdAndVendorId(@Param("userId") Integer userId,@Param("loginUserId") Integer loginUserId);

    // 전체 상담 조회
    @Query("SELECT c FROM Consultation c WHERE c.customer.userId = :customerId ORDER BY c.startDateTime ASC")
    List<Schedule> findAllConsultationByCustomerId(@Param("customerId") Integer customerId);
    @Query("SELECT c FROM Consultation c WHERE c.vendor.userId = :vendorId ORDER BY c.startDateTime ASC")
    List<Schedule> findAllConsultationByVendorId(@Param("vendorId") Integer vendorId);
    @Query("SELECT c FROM Consultation c JOIN FETCH c.customer WHERE c.customer.userId = :customerId OR c.customer.userId = :spouseId ORDER BY c.startDateTime ASC")
    List<Schedule> findAllConsultationWithSpouse(@Param("customerId") Integer customerId, @Param("spouseId") Integer spouseId);


    // 전체 계약 조회
    // 소비자 ID로 조회
    @Query("SELECT c FROM Contract c WHERE c.customer.userId = :customerId ORDER BY c.startDateTime ASC")
    List<Schedule> findAllContractByCustomerId(@Param("customerId") Integer customerId);
    // 업체 ID로 조회
    @Query("SELECT c FROM Contract c WHERE c.vendor.userId = :vendorId ORDER BY c.startDateTime ASC")
    List<Schedule> findAllContractByVendorId(@Param("vendorId") Integer vendorId);
    // 소비자 ID, 커플 ID로 모두 조회    
    @Query("SELECT c FROM Contract c JOIN FETCH c.customer WHERE c.customer.userId = :customerId OR c.customer.userId = :spouseId ORDER BY c.startDateTime ASC")
    List<Schedule> findAllContractWithSpouse(@Param("customerId") Integer customerId,@Param("spouseId") Integer spouseId);

    @Query("SELECT c FROM Consultation c WHERE c.vendor.userId = :vendorId AND c.startDateTime < :endDateTime AND c.endDateTime > :startDateTime ")
    List<Consultation> findConflictConsultation(@Param("startDateTime")LocalDateTime startDateTime, @Param("endDateTime") LocalDateTime endDateTime, @Param("vendorId") Integer vendorId);

    @Query("SELECT c FROM Consultation c WHERE c.vendor.userId = :userId AND c.startDateTime < :endDateTime AND c.endDateTime > :startDateTime")
    List<Consultation> findConflictSchedule(@Param("startDateTime")LocalDateTime startDateTime, @Param("endDateTime") LocalDateTime endDateTime, @Param("userId") Integer userId);

    @Query("SELECT m FROM MiddleProcess m WHERE m.contract.scheduleId = :contractId")
    List<MiddleProcess> findAllMiddleProcessByContractId(@Param("contractId")Integer contractId);


}
