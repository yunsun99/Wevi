package com.ssafy.wevi.domain;

import com.ssafy.wevi.domain.user.Customer;
import com.ssafy.wevi.domain.user.Vendor;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "reviews")
@Getter @Setter
@NoArgsConstructor
public class Review {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer reviewId;          // 리뷰 ID

    @Column(nullable = false)
    private String content;        // 내용

    @Column(nullable = false)
    private LocalDateTime createdAt; // 생성 시간

//    @Column(nullable = false)
    private LocalDateTime updatedAt; // 수정 시간

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "customer_id")
    private Customer customer;        // 소비자 ID

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "vendor_id")
    private Vendor vendor;          // 업체 ID

}
