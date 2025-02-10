package com.ssafy.wevi.repository;

import com.ssafy.wevi.domain.user.Vendor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface VendorRepository extends JpaRepository<Vendor, Integer> {
    Optional<Vendor> findByEmail(String email);

    // 기본 CRUD 메서드 제공

//    @Query("SELECT v FROM Vendor v " +
//            "WHERE v.doCode = :doCode " +
//            "AND v.sigunguCode = :sigunguCode ")
//    List<Vendor> findVendors(
//            @Param("doCode") Integer doCode,
//            @Param("sigunguCode") Integer sigunguCode
//    );
}
