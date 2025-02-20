package com.ssafy.wevi.config.security;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;

import java.io.IOException;

@Slf4j
@RequiredArgsConstructor
public class HttpStatusAccessDeniedHandler implements AccessDeniedHandler {

    private final HttpStatus httpStatus;

    @Override
    public void handle(HttpServletRequest request, HttpServletResponse response, AccessDeniedException accessDeniedException) throws IOException, ServletException {
        log.warn("Access denied: {} {}. {}", request.getMethod(), request.getRequestURI(), accessDeniedException.getMessage());

        if (!response.isCommitted()) {
            response.setStatus(httpStatus.value());
            response.flushBuffer();
        }
    }
}
