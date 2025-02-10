package com.ssafy.wevi.repository;

import com.ssafy.wevi.domain.user.Vendor;
import com.ssafy.wevi.domain.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface VendorRepository extends JpaRepository<Vendor, Integer> {
    Optional<Vendor> findByEmail(String email);

    @Query("SELECT v FROM Vendor v " +
            "WHERE v.sigunguCode.doId = :doId " +
            "AND v.sigunguCode.sigunguId = :sigunguId " +
            "AND v.category = :category")
    List<Vendor> findByLocationAndCategory(@Param("doId") Integer doId,
                                           @Param("sigunguId") Integer sigunguId,
                                           @Param("category") Category category);

    List<Vendor> findByUserId(Integer userId);
}
