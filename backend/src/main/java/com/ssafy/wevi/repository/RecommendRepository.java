package com.ssafy.wevi.repository;

import com.ssafy.wevi.domain.Recommend;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RecommendRepository extends JpaRepository<Recommend, Integer> {
}
