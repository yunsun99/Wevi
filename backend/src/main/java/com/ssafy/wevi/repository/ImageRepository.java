package com.ssafy.wevi.repository;

import com.ssafy.wevi.domain.Image;
import com.ssafy.wevi.domain.Review;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ImageRepository extends JpaRepository<Image, Integer> {
    List<Image> findByReview(Review review);
}
