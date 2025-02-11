package com.ssafy.wevi.config;

import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.context.SecurityContextHolderStrategy;

public class SecurityUtils {
    // SecurityContext: 인증정보가 담겨있는 틀
    // SecurityContextHolder: 틀이 담겨있는 장소
    private static final SecurityContextHolderStrategy securityContextHolderStrategy = SecurityContextHolder.getContextHolderStrategy();

    public static String getAuthenticatedUserId() {
        // 현재 요청의 인증 정보 가져오기
        Authentication authentication = securityContextHolderStrategy.getContext().getAuthentication();

        if (authentication == null || !authentication.isAuthenticated()) {
            throw new AccessDeniedException("Access denied");
        }

        // 인증 정보 안에서 userId 가져오기 (UserDetailsService.loadUserByUsername 메서드에서 리턴한 UserDetails.getUsername의 값)
        return authentication.getName();
    }

    public static Boolean isAuthenticated() {
        // 현재 요청의 인증 정보 가져오기
        Authentication authentication = securityContextHolderStrategy.getContext().getAuthentication();

        if (authentication == null || !authentication.isAuthenticated()) {
            throw new AccessDeniedException("Access denied");
        }

        return true;
    }
}
