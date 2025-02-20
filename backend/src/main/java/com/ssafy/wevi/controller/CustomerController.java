package com.ssafy.wevi.controller;

import com.ssafy.wevi.config.SecurityUtils;
import com.ssafy.wevi.dto.ApiResponseDto;
import com.ssafy.wevi.dto.Customer.CustomerCreateDto;
import com.ssafy.wevi.dto.Customer.CustomerResponseDto;
import com.ssafy.wevi.dto.Customer.CustomerSpouseResponseDto;
import com.ssafy.wevi.dto.Customer.CustomerUpdateDto;
import com.ssafy.wevi.service.CustomerService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/customers")
@RequiredArgsConstructor
@Slf4j
public class CustomerController {

    private final CustomerService customerService;

    // CREATE는 Optional일 수가 없으므로 Optional 벗길 필요 X
    // 회원가입
    @PostMapping("/signup")
    @ResponseStatus(HttpStatus.CREATED)
    public ApiResponseDto<CustomerResponseDto> createCustomer(@RequestBody CustomerCreateDto customerCreateDto) {
        CustomerResponseDto customerResponseDto = customerService.createCustomer(customerCreateDto);

        return new ApiResponseDto<>(
                HttpStatus.CREATED.value(),
                true,
                "Customer created successfully.",
                customerResponseDto
        );
    }

    // 본인 유저 정보 조회하기
    @GetMapping
    public ApiResponseDto<CustomerResponseDto> getCustomer() {
        // 로그인한 유저 ID 가져오기
        String customerId = SecurityUtils.getAuthenticatedUserId();

        CustomerResponseDto customerResponseDto = customerService.findCustomerById(Integer.valueOf(customerId));

        return new ApiResponseDto<>(
                HttpStatus.OK.value(),
                true,
                "Customer found by auth successfully.",
                customerResponseDto
        );
    }

    // 다른 유저 정보 조회하기
    @GetMapping("/{id}")
    public ApiResponseDto<CustomerResponseDto> getCustomerById(@PathVariable Integer id) {
        CustomerResponseDto customerResponseDto = customerService.findCustomerById(id);

        return new ApiResponseDto<>(
                HttpStatus.OK.value(),
                true,
                "Customer found by id successfully.",
                customerResponseDto
        );
    }

    // 배우자 정보 조회하기
    @GetMapping("/spouse")
    public ApiResponseDto<CustomerSpouseResponseDto> getSpouseInfo() {
        // 로그인한 유저 ID 가져오기
        String customerId = SecurityUtils.getAuthenticatedUserId();

        // 배우자 정보 가져오기
        CustomerSpouseResponseDto spouseResponse = customerService.getSpouse(Integer.valueOf(customerId));

        // 배우자가 있는 경우
        if (spouseResponse != null) {
            return new ApiResponseDto<>(
                    HttpStatus.OK.value(),
                    true,
                    "Spouse information found successfully.",
                    spouseResponse
            );
        } else {   // 베우자가 없는 경우
            return new ApiResponseDto<>(
                    HttpStatus.NO_CONTENT.value(),
                    true,
                    "No spouse information found.",
                    null
            );
        }
    }

    // 회원 정보 수정하기
    @PatchMapping
    public ApiResponseDto<CustomerResponseDto> updateCustomer(@RequestBody CustomerUpdateDto customerUpdateDto) {
        Integer customerId = Integer.valueOf(SecurityUtils.getAuthenticatedUserId());

        CustomerResponseDto customerResponseDto = customerService.updateCustomer(customerId, customerUpdateDto);

        return new ApiResponseDto<>(
                HttpStatus.OK.value(),
                true,
                "Customer information updated successfully.",
                customerResponseDto
        );
    }

    // 회원 탈퇴하기
    @PatchMapping("/deactivate")
    public ApiResponseDto<CustomerResponseDto> deactivateCustomer(HttpServletRequest request, HttpServletResponse response) {
        String customerId = SecurityUtils.getAuthenticatedUserId();

        // 서비스 호출
        customerService.deactivateCustomer(Integer.valueOf(customerId), request, response);

        return new ApiResponseDto<>(
                HttpStatus.NO_CONTENT.value(),
                true,
                "Customer information deactivated successfully.",
                null
        );
    }
}
