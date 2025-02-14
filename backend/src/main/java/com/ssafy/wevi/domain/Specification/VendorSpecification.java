package com.ssafy.wevi.domain.Specification;

import com.ssafy.wevi.domain.Category;
import com.ssafy.wevi.domain.Sigungu;
import com.ssafy.wevi.domain.user.Vendor;
import com.ssafy.wevi.dto.vendor.VendorSearchCondition;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.JoinType;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;

public class VendorSpecification {
    public static Specification<Vendor> searchVendor(VendorSearchCondition condition) {
        return (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();

            // 시군구 조인
            Join<Vendor, Sigungu> sigunguJoin = root.join("sigunguCode", JoinType.INNER);

            // Category 조인
            Join<Vendor, Category> categoryJoin = root.join("category", JoinType.INNER);

            // 지역 필터
            if (condition.getDoId() != null) {
                predicates.add(criteriaBuilder.equal(sigunguJoin.get("doId"), condition.getDoId()));
            }
            if (condition.getSigunguId() != null) {
                predicates.add(criteriaBuilder.equal(sigunguJoin.get("sigunguId"), condition.getSigunguId()));
            }

            // 카테고리 필터
            if (condition.getCategoryId() != null) {
                predicates.add(criteriaBuilder.equal(categoryJoin.get("id"), condition.getCategoryId()));
            }

            // 업체명 검색
            if (condition.getVendorName() != null && !condition.getVendorName().isEmpty()) {
                predicates.add(criteriaBuilder.like(root.get("name"), "%" + condition.getVendorName() + "%"));
            }

            // 실내/야외 필터 (웨딩홀 카테고리(categoryId=1)만 적용)
            if (condition.getCategoryId() != null && condition.getCategoryId() == 1 && condition.getIsIndoor() != null) {
                predicates.add(criteriaBuilder.equal(root.get("isIndoor"), condition.getIsIndoor()));
            }

            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };
    }
}