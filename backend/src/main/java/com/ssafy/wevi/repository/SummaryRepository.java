package com.ssafy.wevi.repository;

import com.ssafy.wevi.domain.AudioSummary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SummaryRepository extends JpaRepository<AudioSummary, Integer> {
    // 소비자 ID로 조회
    @Query("SELECT a FROM AudioSummary a WHERE a.status = 'COMPLETED' AND a.customer.userId = :customerId")
    List<AudioSummary> findAllCompletedSummaryByUserId(@Param("customerId") Integer customerId);
    // 소비자 ID, 커플 ID로 모두 조회
    @Query("SELECT a FROM AudioSummary a WHERE (a.status = 'COMPLETED') AND (a.customer.userId = :customerId OR a.customer.spouse.userId = :spouseId)")
    List<AudioSummary> findAllCompletedSummaryWithSpouse(@Param("customerId") Integer customerId,@Param("spouseId") Integer spouseId);

    @Query("SELECT a FROM AudioSummary a WHERE a.schedule.scheduleId = :scheduleId")

    AudioSummary findBySchedule_ScheduleId(Integer scheduleId);
}

