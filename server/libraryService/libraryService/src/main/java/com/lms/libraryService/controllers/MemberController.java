package com.lms.libraryService.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lms.libraryService.external.dto.MembershipResponseDTO;
import com.lms.libraryService.external.service.MemberService;

import java.util.List;

import org.springframework.http.HttpStatus;

@RestController
@RequestMapping("/library/member")
public class MemberController {

    private final MemberService memberService;

    public MemberController(MemberService memberService){
        this.memberService=memberService;
    }
    @GetMapping("/all")
    public ResponseEntity<List<MembershipResponseDTO>> getAllmembers() {
        List<MembershipResponseDTO>response = memberService.getAllMembershipHolderMember();
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
