package com.ssafy.wevi.repository;

import com.ssafy.wevi.domain.Do;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DoRepository extends JpaRepository<Do, Integer> {
}