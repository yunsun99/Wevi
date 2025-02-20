package com.ssafy.wevi.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class ApiResponseDto<T> {
    private int status;
    private boolean success;
    private String message;
    private T data;
}
