package com.ssafy.wevi.domain.schedule;

import com.ssafy.wevi.domain.BaseEntity;
import com.ssafy.wevi.domain.Category;
import com.ssafy.wevi.domain.user.Customer;
import com.ssafy.wevi.domain.user.Vendor;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;

@Entity
@Table(name = "schedules")
@Getter
@Setter
@Inheritance(strategy = InheritanceType.JOINED)
@DiscriminatorColumn(name = "dtype")
public abstract class Schedule extends BaseEntity {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "schedule_id")
    private int id; // 스케줄ID

    @Column(name = "start_date_time", nullable = true)
    private LocalDateTime startDateTime;

    @Column(name = "end_date_time", nullable = true)
    private LocalDateTime endDateTime;

    @Column
    private String title;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "customer_id", referencedColumnName = "user_id")
    private Customer customer;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "vendor_id", referencedColumnName = "user_id")
    private Vendor vendor;

    @Column(insertable = false, updatable = false, name = "dtype")
    private String dtype;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;
}
