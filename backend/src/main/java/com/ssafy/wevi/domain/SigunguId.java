package com.ssafy.wevi.domain;

import jakarta.persistence.Embeddable;
import lombok.*;

import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class SigunguId implements Serializable {
    private Integer doId;
    private Integer sigunguId;
}
