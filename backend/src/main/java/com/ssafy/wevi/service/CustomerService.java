package com.ssafy.wevi.service;

import com.ssafy.wevi.domain.user.Customer;
import com.ssafy.wevi.dto.Customer.CustomerCreateDto;
import com.ssafy.wevi.dto.Customer.CustomerResponseDto;
import com.ssafy.wevi.dto.Customer.CustomerSpouseResponseDto;
import com.ssafy.wevi.dto.Customer.CustomerUpdateDto;
import com.ssafy.wevi.enums.UserStatus;
import com.ssafy.wevi.repository.CustomerRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Objects;

@Service
@RequiredArgsConstructor
public class CustomerService {

    private final CustomerRepository customerRepository;
    private final PasswordEncoder passwordEncoder;

    @Transactional
    public CustomerResponseDto createCustomer(CustomerCreateDto customerCreateDto) {
        Customer customer = Customer.builder()
                .email(customerCreateDto.getEmail())
                .nickname(customerCreateDto.getNickname())
                .name(customerCreateDto.getName())
                .password(passwordEncoder.encode(customerCreateDto.getPassword()))
                .phone(customerCreateDto.getPhone())
                .zonecode(customerCreateDto.getZonecode())
                .autoRoadAddress(customerCreateDto.getAutoRoadAddress())
                .addressDetail(customerCreateDto.getAddressDetail())
                .status(UserStatus.ACTIVE.name())
                .build();

        customerRepository.save(customer);
        return toCustomerResponseDto(customer);
    }

    @Transactional(readOnly = true)
    public CustomerResponseDto findCustomerById(Integer id) {
        return customerRepository.findById(id).map(customer -> toCustomerResponseDto(customer)).orElseThrow();
    }

    @Transactional(readOnly = true)
    public CustomerSpouseResponseDto getSpouse(Integer customerId) {
        // 배우자 정보 조회
        return customerRepository.findById(customerId)
                .map(customer -> customer.getSpouse())
                .filter(Objects::nonNull)
                .map(spouse -> {
                    CustomerSpouseResponseDto customerSpouseResponseDto = new CustomerSpouseResponseDto();
                    customerSpouseResponseDto.setSpouseId(spouse.getUserId());
                    customerSpouseResponseDto.setNickname(spouse.getNickname());
                    customerSpouseResponseDto.setName(spouse.getName());

                    return customerSpouseResponseDto;
                })
                .orElse(null);
    }

    @Transactional
    public CustomerResponseDto updateCustomer(Integer customerId, CustomerUpdateDto customerUpdateDto) {
        return customerRepository.findById(customerId).map(customer -> {
            // 비밀번호가 변경된 경우만 암호화
            if (customerUpdateDto.getPassword() != null && !customerUpdateDto.getPassword().isBlank()) {
                customer.setPassword(passwordEncoder.encode(customerUpdateDto.getPassword()));
            }
            customer.setNickname(customerUpdateDto.getNickname());
            customer.setPhone(customerUpdateDto.getPhone());
            customer.setZonecode(customerUpdateDto.getZonecode());
            customer.setAutoRoadAddress(customerUpdateDto.getAutoRoadAddress());
            customer.setAddressDetail(customerUpdateDto.getAddressDetail());

            customerRepository.save(customer);

            return toCustomerResponseDto(customer);
        }).orElseThrow();
    }

    @Transactional
    public void deactivateCustomer(Integer customerId, HttpServletRequest request, HttpServletResponse response) {
        customerRepository.findById(customerId).ifPresentOrElse(customer -> {
            customer.setStatus(UserStatus.TERMINATED.name());
            customerRepository.save(customer);

            // 탈퇴 후 로그아웃 처리
            new SecurityContextLogoutHandler().logout(request, response, null);
        }, () -> {
            throw new EntityNotFoundException("Customer not found");  // NoSuch로 바꾸쟝
        });
    }

    // 내가 원하는 값만 내보내기 위해서
    // 예를 들어, 유저 정보를 조회할 때 굳이 계약까지 불러올 필요는 없음
    // 유저 -> 계약 -> 유저 무한루프 발생을 막음
    private CustomerResponseDto toCustomerResponseDto(Customer customer) {
        if (customer == null) return null;

        return CustomerResponseDto.builder()
                .userId(customer.getUserId())
                .email(customer.getEmail())
                .nickname(customer.getNickname())
                .name(customer.getName())
                .phone(customer.getPhone())
                .zonecode(customer.getZonecode())
                .autoRoadAddress(customer.getAutoRoadAddress())
                .addressDetail(customer.getAddressDetail())
                .spouseId(customer.getSpouse() != null ? customer.getSpouse().getUserId() : null)
                .build();
    }
}
