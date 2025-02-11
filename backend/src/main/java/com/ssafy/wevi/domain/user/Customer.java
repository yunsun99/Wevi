package com.ssafy.wevi.domain.user;

import com.ssafy.wevi.domain.CoupleRequest;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

@Entity
@Table(name = "customers")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
@DiscriminatorValue("customer")
//@PrimaryKeyJoinColumn(name = "customer_id")
public class Customer extends User {
//    @Id
//    @Column(name = "user_id")
//    private Integer userId;
//
//    @OneToOne
//    @MapsId
//    @JoinColumn(name = "user_id")
//    private User user;

    @Column(unique = true, nullable = false)
    private String nickname;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String phone;

    @Column(nullable = false)
    private String zonecode;

    @Column(nullable = false)
    private String autoRoadAddress;

    @Column(nullable = false)
    private String addressDetail;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "spouse_id")   // 사실 이거 안써도 똑같음
    private Customer spouse;

    @OneToOne(mappedBy = "sender", fetch = FetchType.LAZY)
    private CoupleRequest sentRequest;  // Customer 엔티티에서 보낸 요청을 쉽게 조회하기 위해 양방향 매핑 사용

    @OneToOne(mappedBy = "receiver", fetch = FetchType.LAZY)
    private CoupleRequest receivedRequest;  // Customer 엔티티에서 받은 요청을 쉽게 조회하기 위해 양방향 매핑 사용
}
