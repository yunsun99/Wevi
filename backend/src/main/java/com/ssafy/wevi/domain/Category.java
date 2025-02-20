package com.ssafy.wevi.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter @Setter
@Table(name = "categories")
@NoArgsConstructor
public class Category {

    @Id @GeneratedValue
    @Column(name = "category_id")
    private Integer id;

    private String name;    // 카테고리명 (웨딩홀, 스튜디오, 드레스, 메이크업)
}
