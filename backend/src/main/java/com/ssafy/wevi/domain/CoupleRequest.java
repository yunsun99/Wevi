package com.ssafy.wevi.domain;

import com.ssafy.wevi.domain.user.Customer;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "couple_requests")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CoupleRequest extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer coupleRequestId;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sender_id")
    private Customer sender;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "receiver_id")
    private Customer receiver;

    @Column(nullable = false)
    private String status;
}
