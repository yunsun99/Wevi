package com.ssafy.wevi.repository;

import com.ssafy.wevi.domain.Image;
import com.ssafy.wevi.domain.Review;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ImageRepository extends JpaRepository<Image, Integer> {
    Image findByReview(Review review);
}
