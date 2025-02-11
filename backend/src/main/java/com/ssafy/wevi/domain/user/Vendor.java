package com.ssafy.wevi.domain.user;

import com.ssafy.wevi.domain.Category;
import com.ssafy.wevi.domain.Sigungu;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "vendors")
@Getter
@Setter
@NoArgsConstructor
@DiscriminatorValue("vendor")
//@PrimaryKeyJoinColumn(name = "vendor_id")
public class Vendor extends User {
//    @Id
//    @Column(name = "user_id")
//    private Integer userId;
//
//    @OneToOne
//    @MapsId
//    @JoinColumn(name = "user_id")
//    private User user;

    @Column(nullable = false)
    private String ownerName;   // 대표자명

    @Column(nullable = false)
    private String ownerPhone;  // 대표자 연락처

    @Column(unique = true, nullable = false)
    private String name;    // 상호명

    @Column(nullable = false)
    private String zonecode;    // 우편번호

//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "do_code", nullable = false)
//    private Do doCode; // 도 - 외래키

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumns({
            @JoinColumn(name = "do_id", referencedColumnName = "doId"),
            @JoinColumn(name = "sigungu_code", referencedColumnName = "sigunguId")
    })
    private Sigungu sigunguCode;  //시군구 - 외래키

    @Column(nullable = false)
    private String autoRoadAddress;  // 도로명주소

    @Column(nullable = false)
    private String addressDetail;  // 세부 주소

    @Column(nullable = false)
    private String phone;   // 업체 연락처

    @Column(nullable = false)
    private String registrationNumber;  // 사업자등록번호

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private Category category; // 카테고리 - 외래키

    @Column(nullable = false)
    private String businessHour;  // 영업시간

    @Column(nullable = true)
    private String homepage; // 홈페이지 URL

    /**
     * 옵션별 가격 : String
     * {옵션명|가격|옵션명|가격|...}
     * 띄어쓰기 X, 가격은 세자리마다 쉼표(,)
     */

    @Column(nullable = false)
    private String price;   // 옵션별 가격

    @Column(nullable = true)
    private String details; // 상세설명

    @Column(nullable = false)
    private boolean isIndoor;   // 실내/야외 여부

    @Column(nullable = false)
    private int minPrice;  // 최소가격

    @Column(nullable = false)
    private String subway;  // 가까운 지하철역

    @Column(nullable = false)
    private String parkinglot;  // 주차 정보
//    // 양방향 연결
//    @OneToMany(mappedBy = "vendor")
//    private List<Schedule> schedules;
}
