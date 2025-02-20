package com.ssafy.wevi.filter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Slf4j
public class LoggingFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        log.debug("HTTP REQUEST {} {}", request.getMethod(), request.getRequestURI());
        try {
            filterChain.doFilter(request, response);
        } catch (AuthenticationException | AccessDeniedException e) {
            log.debug("{}: {}", e.getClass().getName(), e.getMessage());
            throw e;
        } catch (Exception e) {
            log.error("{}: {}", e.getClass().getName(), e.getMessage());
            throw e;
        } finally {
            log.debug("HTTP RESPONSE {} {} >> {}", request.getMethod(), request.getRequestURI(), response.getStatus());
        }
    }
}
