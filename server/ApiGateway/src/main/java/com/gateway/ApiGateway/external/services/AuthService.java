package com.gateway.ApiGateway.external.services;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.gateway.ApiGateway.external.dto.UserResponseDto;

@FeignClient(name="AuthService", url="http://192.168.155.39:8081")
public interface AuthService {

    @GetMapping("auth/validate")
     UserResponseDto getCurrentUser(@RequestParam String token);
}
