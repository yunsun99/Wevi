package com.ssafy.wevi.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
@NoArgsConstructor
public class ImageDto {
    private String imageType;
    private String imageUrl;
    private int orderIndex;
}
