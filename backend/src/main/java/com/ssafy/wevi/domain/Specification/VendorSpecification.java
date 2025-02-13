package com.ssafy.wevi.domain.Specification;

import com.ssafy.wevi.domain.user.Vendor;
import com.ssafy.wevi.dto.vendor.VendorSearchCondition;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;

public class VendorSpecification {
    public static Specification<Vendor> searchVendor(VendorSearchCondition condition) {
        return (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();

            // 지역 필터
            if (condition.getDoId() != null) {
                predicates.add(criteriaBuilder.equal(root.get("doId"), condition.getDoId()));
            }
            if (condition.getSigunguId() != null) {
                predicates.add(criteriaBuilder.equal(root.get("sigunguId"), condition.getSigunguId()));
            }

            // 카테고리 필터
            if (condition.getCategory() != null) {
                predicates.add(criteriaBuilder.equal(root.get("category"), condition.getCategory()));
            }

            // 업체명 검색
            if (condition.getName() != null && !condition.getName().isEmpty()) {
                predicates.add(criteriaBuilder.like(root.get("name"), "%" + condition.getName() + "%"));
            }

            // 실내/실외 필터 (웨딩홀 카테고리만 적용)
            if ("웨딩홀".equals(condition.getCategory()) && condition.getLocation() != null) {
                predicates.add(criteriaBuilder.equal(root.get("location"), condition.getLocation()));
            }

            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };
    }
}