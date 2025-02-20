package com.ssafy.wevi.repository;

import com.ssafy.wevi.domain.user.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Integer> {
    // 단건 조회는 Optional로 나옴
    // 다건 조회는 List로 나옴
    // 만약 다건 조회에 Optional을 리턴 타입으로 걸면, LIMIT 1 처럼 한 개만 나오지만
    // 당연히 사용하면 안됨;;
    Optional<Customer> findByEmail(String email);
}
