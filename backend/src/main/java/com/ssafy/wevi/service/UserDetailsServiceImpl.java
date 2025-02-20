package com.ssafy.wevi.service;

import com.ssafy.wevi.enums.UserStatus;
import com.ssafy.wevi.repository.CustomerRepository;
import com.ssafy.wevi.repository.VendorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {

    private final CustomerRepository customerRepository;
    private final VendorRepository vendorRepository;

    @Override
    // username으로 이메일이 들어옴
    // 내가 만든 User 아니고 SpringSecurity User임...
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return findUserInCustomerRepository(username)
                .or(() -> findUserInVendorRepository(username))
                .orElseThrow(() -> new UsernameNotFoundException("User not found or deactivated: " + username));
    }

    private Optional<UserDetails> findUserInCustomerRepository(String username) {
        return customerRepository.findByEmail(username)
                .filter(user -> !UserStatus.TERMINATED.name().equals(user.getStatus()))
                .map(user -> createSpringSecurityUser(user.getUserId(), user.getPassword()));
    }

    private Optional<UserDetails> findUserInVendorRepository(String username) {
        return vendorRepository.findByEmail(username)
                .filter(user -> !UserStatus.TERMINATED.name().equals(user.getStatus()))
                .map(user -> createSpringSecurityUser(user.getUserId(), user.getPassword()));
    }

    private UserDetails createSpringSecurityUser(Integer id, String password) {
        return User.builder()
                .username(String.valueOf(id)) // Authentication.getName
                .password(password)
                .authorities(List.of()) // 권한이 필요하면 추가
                .build();
    }
}
