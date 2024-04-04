package com.lms.membershipService.services.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.lms.membershipService.dto.MemberRequestDTO;
import com.lms.membershipService.dto.MemberResponseDTO;
import com.lms.membershipService.entities.Member;
import com.lms.membershipService.repositories.MemberRepository;
import com.lms.membershipService.services.MemberService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class MemberServiceImpl implements MemberService {

    private MemberRepository memberRepository;

    @Override
    public MemberResponseDTO newMember(MemberRequestDTO memberRequest) {
        Member member = new Member();
        member.setFirstName(memberRequest.firstName());
        member.setFamilyName(memberRequest.familyName());
        member.setMobile(memberRequest.mobile());
        member.setEmail(memberRequest.email());
        member.setCurrentAddress(memberRequest.currentAddress());
        member.setPermanentAddress(memberRequest.permanentAddress());
        member = memberRepository.save(member);
        return mapToMemberResponseDTO(member);
    }

    @Override
    public MemberResponseDTO updateMember(long id, MemberRequestDTO memberRequest) {
        Member member = memberRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Member not found with id: " + id));
        member.setFirstName(memberRequest.firstName());
        member.setFamilyName(memberRequest.familyName());
        member.setMobile(memberRequest.mobile());
        member.setEmail(memberRequest.email());
        member.setCurrentAddress(memberRequest.currentAddress());
        member.setPermanentAddress(memberRequest.permanentAddress());
        member = memberRepository.save(member);
        return mapToMemberResponseDTO(member);
    }

    @Override
    public MemberResponseDTO deleteMember(long id) {
        Member member = memberRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Member not found with id: " + id));
        memberRepository.deleteById(id);
        return mapToMemberResponseDTO(member);
    }

    @Override
    public MemberResponseDTO getMember(long id) {
        Member member = memberRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Member not found with id: " + id));
        return mapToMemberResponseDTO(member);
    }

    @Override
    public List<MemberResponseDTO> getAllMembers() {
        return memberRepository.findAll().stream()
                .map(this::mapToMemberResponseDTO)
                .collect(Collectors.toList());
    }

    private MemberResponseDTO mapToMemberResponseDTO(Member member) {
        return new MemberResponseDTO(
                member.getMemberId(),
                member.getFirstName(),
                member.getFamilyName(),
                member.getMobile(),
                member.getEmail(),
                member.getCurrentAddress(),
                member.getPermanentAddress());
    }
}