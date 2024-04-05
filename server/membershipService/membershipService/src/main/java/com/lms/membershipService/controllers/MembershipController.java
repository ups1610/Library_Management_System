package com.lms.membershipService.controllers;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lms.membershipService.dto.MembershipRequestDTO;
import com.lms.membershipService.dto.MembershipResponseDTO;
import com.lms.membershipService.services.MembershipService;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/membershipService/membership")
@AllArgsConstructor
public class MembershipController {

    private MembershipService membershipService;

    @PostMapping("/newMemebership")
    public ResponseEntity<MembershipResponseDTO> addNewMembership(@RequestBody MembershipRequestDTO membershipRequest) {
        MembershipResponseDTO response = membershipService.newMembership(membershipRequest);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping("/all")
    public ResponseEntity<List<MembershipResponseDTO>> getAllMemberships() {
        List<MembershipResponseDTO> memberships = membershipService.getAllMemberships();
        return new ResponseEntity<>(memberships, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<MembershipResponseDTO> getMembership(@PathVariable("id") long id) {
        MembershipResponseDTO membership = membershipService.getMembership(id);
        return new ResponseEntity<>(membership, HttpStatus.OK);
    }

    @GetMapping("/member/{id}")
    public  ResponseEntity<MembershipResponseDTO>getBymember(@PathVariable Long id) {
        MembershipResponseDTO membership = membershipService.getMembershipByMemberID(id);
        return new ResponseEntity<>(membership, HttpStatus.OK);
    }
    

   
}
