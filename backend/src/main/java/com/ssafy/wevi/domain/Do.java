package com.ssafy.wevi.domain;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "do")
@Getter @Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Do {
    @Id
    private Integer doId;

    @Column(nullable = false, length = 45)
    private String doName;
}