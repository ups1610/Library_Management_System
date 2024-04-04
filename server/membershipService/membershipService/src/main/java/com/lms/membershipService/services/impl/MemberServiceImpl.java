package com.lms.membershipService.services.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.lms.membershipService.dto.AddressResponseDTO;
import com.lms.membershipService.dto.MemberRequestDTO;
import com.lms.membershipService.dto.MemberResponseDTO;
import com.lms.membershipService.entities.Address;
import com.lms.membershipService.entities.Member;
import com.lms.membershipService.exceptions.DuplicateDataException;
import com.lms.membershipService.repositories.MemberRepository;
import com.lms.membershipService.services.MemberService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class MemberServiceImpl implements MemberService {

    private MemberRepository memberRepository;

    @Override
    public MemberResponseDTO newMember(MemberRequestDTO memberRequest) {
        if (memberRepository.findByMobile(memberRequest.mobile()).isPresent()) {
            throw new DuplicateDataException("Mobile Number already in use");
        }
        if (memberRepository.findByEmail(memberRequest.email()).isPresent()) {
            throw new DuplicateDataException("Email already in use");
        }

        Member member = new Member();
        member.setFirstName(memberRequest.firstName());
        member.setFamilyName(memberRequest.familyName());
        member.setMobile(memberRequest.mobile());
        member.setEmail(memberRequest.email());
        member.setCurrentAddress(new Address(0, memberRequest.currentAddress().landmark(), memberRequest.currentAddress().address1(), memberRequest.currentAddress().address2(), memberRequest.currentAddress().city(), memberRequest.currentAddress().district(), memberRequest.currentAddress().state(), memberRequest.currentAddress().pincode()));
        member.setPermanentAddress(new Address(0, memberRequest.permanentAddress().landmark(), memberRequest.permanentAddress().address1(), memberRequest.permanentAddress().address2(), memberRequest.permanentAddress().city(), memberRequest.permanentAddress().district(), memberRequest.permanentAddress().state(), memberRequest.permanentAddress().pincode()));
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
        member.setCurrentAddress(new Address(0, memberRequest.currentAddress().landmark(), memberRequest.currentAddress().address1(), memberRequest.currentAddress().address2(), memberRequest.currentAddress().city(), memberRequest.currentAddress().district(), memberRequest.currentAddress().state(), memberRequest.currentAddress().pincode()));
        member.setPermanentAddress(new Address(0, memberRequest.permanentAddress().landmark(), memberRequest.permanentAddress().address1(), memberRequest.permanentAddress().address2(), memberRequest.permanentAddress().city(), memberRequest.permanentAddress().district(), memberRequest.permanentAddress().state(), memberRequest.permanentAddress().pincode()));
        
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
        AddressResponseDTO currentAddressDTO = mapToAddressResponseDTO(member.getCurrentAddress());
        AddressResponseDTO permanentAddressDTO = mapToAddressResponseDTO(member.getPermanentAddress());
    
        return new MemberResponseDTO(
                member.getMemberId(),
                member.getFirstName(),
                member.getFamilyName(),
                member.getMobile(),
                member.getEmail(),
                currentAddressDTO,
                permanentAddressDTO
        );
    }
    private AddressResponseDTO mapToAddressResponseDTO(Address address) {
    return new AddressResponseDTO(
            address.getLandmark(),
            address.getAddress1(),
            address.getAddress2(),
            address.getCity(),
            address.getDistrict(),
            address.getState(),
            address.getPincode()
    );
}
}