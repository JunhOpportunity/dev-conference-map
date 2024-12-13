package com.example.demo.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;


@EnableWebSecurity
@Configuration
public class SecurityConfig {
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(auth -> auth
                .anyRequest().permitAll()
        );
        return http.build();
    }
    
}

/*
csrf(csrf -> csrf.disable()):
CSRF 보호를 비활성화합니다.
이는 개발/테스트 환경에서 클라이언트가 CSRF 토큰 없이도 요청을 보낼 수 있도록 하기 위한 설정입니다.

authorizeHttpRequests(auth -> auth.anyRequest().permitAll()):
모든 HTTP 요청에 대해 인증 없이 접근을 허용합니다.

http.build():
SecurityFilterChain을 반환합니다.
이는 Spring Security에서 필터 체인을 구성하는 데 사용됩니다.
 */