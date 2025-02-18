package com.ssafy.wevi.domain;

import com.ssafy.wevi.domain.user.Customer;
import com.ssafy.wevi.domain.user.Vendor;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "recommend")
@Getter
@Setter
@NoArgsConstructor
public class Recommend {

    @Id
    @GeneratedValue
    private Integer recommendId;

    private String weddingHallRequest;
    private String studioRequest;
    private String dressRequest;
    private String makeUpRequest;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "customer_id", referencedColumnName = "user_id")
    private Customer customer;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "wedding_hall_vendor_id", referencedColumnName = "user_id")
    private Vendor weddingHallVendor;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "studio_vendor_id", referencedColumnName = "user_id")
    private Vendor studioVendor;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "dress_vendor_id", referencedColumnName = "user_id")
    private Vendor dressVendor;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "make_up_vendor_id", referencedColumnName = "user_id")
    private Vendor makeUpVendor;
}
