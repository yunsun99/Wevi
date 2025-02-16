package com.ssafy.wevi.repository;

import com.ssafy.wevi.domain.AudioAnalysis;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AnalysisRepository extends JpaRepository<AudioAnalysis, Integer> {
}
