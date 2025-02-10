package com.ssafy.wevi.repository;

import com.ssafy.wevi.domain.Review;
import com.ssafy.wevi.domain.user.Vendor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Integer> {
    List<Review> findByVendor(Vendor vendor);
}
