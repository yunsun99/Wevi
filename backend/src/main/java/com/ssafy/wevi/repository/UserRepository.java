package com.ssafy.wevi.repository;

import com.ssafy.wevi.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {

}
