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

@RestController
@RequestMapping("/api/memberships")
@AllArgsConstructor
public class MembershipController {

    private MembershipService membershipService;

    @PostMapping("/create")
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

    @PutMapping("/{id}/update")
    public ResponseEntity<MembershipResponseDTO> updateMembership(@PathVariable("id") long id,
            @RequestBody MembershipRequestDTO membershipRequest) {
        MembershipResponseDTO updatedMembership = membershipService.updateMembership(id, membershipRequest);
        return new ResponseEntity<>(updatedMembership, HttpStatus.OK);
    }

    @DeleteMapping("/{id}/delete")
    public ResponseEntity<MembershipResponseDTO> deleteMembership(@PathVariable("id") long id) {
        MembershipResponseDTO deletedMembership = membershipService.deleteMembership(id);
        return new ResponseEntity<>(deletedMembership, HttpStatus.OK);
    }
}
