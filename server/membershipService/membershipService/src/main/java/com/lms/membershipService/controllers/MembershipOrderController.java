package com.lms.membershipService.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.lms.membershipService.dto.MembershipOrderResponseDto;
import com.lms.membershipService.external.dto.VerifyMembershipPaymentRequestDto;
import com.lms.membershipService.services.MembershipOrderService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/membershipService")
@AllArgsConstructor
public class MembershipOrderController {
        private MembershipOrderService membershipOrderService;


        @PostMapping("/validateMembershipOrder")
        public ResponseEntity<MembershipOrderResponseDto> addNewMembership(@RequestBody VerifyMembershipPaymentRequestDto membershipRequest) {
            MembershipOrderResponseDto  response = membershipOrderService.activateMembership(membershipRequest);
            return new ResponseEntity<>(response, HttpStatus.OK);
        }


        @GetMapping("/getMembershipOrder")
        public ResponseEntity<MembershipOrderResponseDto> getmembershipOrder(@RequestParam  String orderId) {
            MembershipOrderResponseDto  response = membershipOrderService.getMembershipOrder(orderId);
            return new ResponseEntity<>(response, HttpStatus.OK);
        }


}
