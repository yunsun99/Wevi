package com.ssafy.wevi.repository;

import com.ssafy.wevi.domain.Recommend;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RecommendRepository extends JpaRepository<Recommend, Integer> {

    @Query("SELECT r FROM Recommend r WHERE r.customer.userId = :customerId AND r.createdAt >= " +
            "(SELECT max (r.createdAt) FROM Recommend r WHERE r.customer.userId = :customerId)")
    public Optional<Recommend> findRecentRecommend(Integer customerId);
}
