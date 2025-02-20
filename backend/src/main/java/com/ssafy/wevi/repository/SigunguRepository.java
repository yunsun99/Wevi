package com.ssafy.wevi.repository;

import com.ssafy.wevi.domain.Sigungu;
import com.ssafy.wevi.domain.SigunguId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SigunguRepository extends JpaRepository<Sigungu, SigunguId> {
    List<Sigungu> findByDoId(Integer doId);
}