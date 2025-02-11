package com.ssafy.wevi.repository;

import com.ssafy.wevi.domain.schedule.Schedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ScheduleRepository extends JpaRepository<Schedule, Integer> {

    @Query("SELECT s FROM Schedule s WHERE s.customer.userId = :customerId")
    List<Schedule> findAllScheduleByCustomerId(@Param("customerId") Integer customerId);
    @Query("SELECT s FROM Schedule s WHERE s.vendor.userId = :vendorId")
    List<Schedule> findAllScheduleByVendorId(@Param("vendorId") Integer vendorId);
    @Query("SELECT s FROM Schedule s WHERE s.customer.userId = :customerId OR s.customer.spouse.userId = :spouseId")
    List<Schedule> findAllScheduleWithSpouse(@Param("customerId") Integer customerId,@Param("spouseId") Integer spouseId);


    @Query("SELECT m FROM MiddleProcess m WHERE m.customer.userId = :customerId")
    List<Schedule> findAllMiddleProcessByCustomerId(@Param("customerId") Integer customerId);
    @Query("SELECT m FROM MiddleProcess m WHERE m.vendor.userId = :vendorId")
    List<Schedule> findAllMiddleProcessByVendorId(@Param("vendorId") Integer vendorId);
    @Query("SELECT m FROM MiddleProcess m WHERE m.customer.userId = :customerId OR m.customer.spouse.userId = :spouseId")
    List<Schedule> findAllMiddleProcessWithSpouse(@Param("customerId") Integer customerId,@Param("spouseId") Integer spouseId);

    List<Schedule> findAllByCustomer_UserId(Integer UserId);

}
