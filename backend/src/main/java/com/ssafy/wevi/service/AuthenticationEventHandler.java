package com.ssafy.wevi.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;
import org.springframework.security.authentication.event.AbstractAuthenticationEvent;
import org.springframework.security.authentication.event.AbstractAuthenticationFailureEvent;
import org.springframework.security.authentication.event.AuthenticationSuccessEvent;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class AuthenticationEventHandler {
    @EventListener(AuthenticationSuccessEvent.class)
    public void onAuthenticationSuccess(AuthenticationSuccessEvent event) {
        log.debug("Authentication SUCCESS: {}", event);
    }

    @EventListener(AbstractAuthenticationFailureEvent.class)
    public void onAuthenticationFailure(AbstractAuthenticationFailureEvent event) {
        log.debug("Authentication FAILED: {}", event);
    }
}
