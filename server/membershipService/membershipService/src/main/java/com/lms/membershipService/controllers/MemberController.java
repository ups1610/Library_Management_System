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

import com.lms.membershipService.dto.MemberRequestDTO;
import com.lms.membershipService.dto.MemberResponseDTO;
import com.lms.membershipService.services.MemberService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("membershipService/member")
@AllArgsConstructor
public class MemberController {

    private MemberService memberService;

    @PostMapping("/newMember")
    public ResponseEntity<MemberResponseDTO> addNewMember(@RequestBody MemberRequestDTO memberRequest) {
        MemberResponseDTO response = memberService.newMember(memberRequest);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping("/all")
    public ResponseEntity<List<MemberResponseDTO>> getAllMembers() {
        List<MemberResponseDTO> members = memberService.getAllMembers();
        return new ResponseEntity<>(members, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<MemberResponseDTO> getMember(@PathVariable("id") long id) {
        MemberResponseDTO member = memberService.getMember(id);
        return new ResponseEntity<>(member, HttpStatus.OK);
    }

    @PutMapping("/{id}/update")
    public ResponseEntity<MemberResponseDTO> updateMember(@PathVariable("id") long id,
            @RequestBody MemberRequestDTO memberRequest) {
        MemberResponseDTO updatedMember = memberService.updateMember(id, memberRequest);
        return new ResponseEntity<>(updatedMember, HttpStatus.OK);
    }

    @DeleteMapping("/{id}/delete")
    public ResponseEntity<MemberResponseDTO> deleteMember(@PathVariable("id") long id) {
        MemberResponseDTO deletedMember = memberService.deleteMember(id);
        return new ResponseEntity<>(deletedMember, HttpStatus.OK);
    }

}
