package com.lms.transactionService.external.services;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.lms.transactionService.external.dto.UserResponseDto;

@FeignClient(name="AuthService", url="http://192.168.155.39:8081")
public interface UserService {

    @GetMapping("auth/user/{id}")
     UserResponseDto getUser(@RequestParam long id);

}
