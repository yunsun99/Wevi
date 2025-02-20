package com.ssafy.wevi.repository;

import com.ssafy.wevi.domain.MiddleProcessStep;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MiddleProcessStepRepository extends JpaRepository<MiddleProcessStep, Integer> {
    @Query("SELECT m FROM MiddleProcessStep m WHERE m.category.id = :categoryId")
    List<MiddleProcessStep> findAllByCategoryId(@Param("categoryId") Integer categoryId);
}
