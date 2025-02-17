package com.ssafy.wevi.repository;

import com.ssafy.wevi.domain.AudioSummary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SummaryRepository extends JpaRepository<AudioSummary, Integer> {
}
