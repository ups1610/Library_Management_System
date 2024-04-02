package com.lms.membershipService.services.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.lms.membershipService.dto.MembershipRequestDTO;
import com.lms.membershipService.dto.MembershipResponseDTO;
import com.lms.membershipService.entities.Member;
import com.lms.membershipService.entities.Membership;
import com.lms.membershipService.entities.MembershipPlan;
import com.lms.membershipService.repositories.MemberRepository;
import com.lms.membershipService.repositories.MembershipPlanRepository;
import com.lms.membershipService.repositories.MembershipRepository;
import com.lms.membershipService.services.MembershipService;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class MembershipServiceImpl implements MembershipService {

    private MembershipRepository membershipRepository;

    private MemberRepository memberRepository;

    private MembershipPlanRepository membershipPlanRepository;

    @Override
    public MembershipResponseDTO newMembership(MembershipRequestDTO membershipRequest) {
        Member member = memberRepository.findById(membershipRequest.memberId())
                .orElseThrow(() -> new IllegalArgumentException(
                        "Member not found with id: " + membershipRequest.memberId()));

        MembershipPlan membershipPlan = membershipPlanRepository.findById(membershipRequest.membershipPlanId())
                .orElseThrow(() -> new IllegalArgumentException(
                        "Membership Plan not found with id: " + membershipRequest.membershipPlanId()));

        Membership membership = new Membership();
        membership.setMember(member);
        membership.setStartDate(membershipRequest.startDate());
        membership.setEndDate(membershipRequest.endDate());
        membership.setStatus(membershipRequest.status());
        membership.setMembershipPlan(membershipPlan);
        membership.setTransactionId(membershipRequest.transactionId());

        membership = membershipRepository.save(membership);
        return mapToMembershipResponseDTO(membership);
    }

    @Override
    public MembershipResponseDTO updateMembership(long id, MembershipRequestDTO membershipRequest) {
        Membership membership = membershipRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Membership not found with id: " + id));

        Member member = memberRepository.findById(membershipRequest.memberId())
                .orElseThrow(() -> new IllegalArgumentException(
                        "Member not found with id: " + membershipRequest.memberId()));

        MembershipPlan membershipPlan = membershipPlanRepository.findById(membershipRequest.membershipPlanId())
                .orElseThrow(() -> new IllegalArgumentException(
                        "Membership Plan not found with id: " + membershipRequest.membershipPlanId()));

        membership.setMember(member);
        membership.setStartDate(membershipRequest.startDate());
        membership.setEndDate(membershipRequest.endDate());
        membership.setStatus(membershipRequest.status());
        membership.setMembershipPlan(membershipPlan);
        membership.setTransactionId(membershipRequest.transactionId());

        membership = membershipRepository.save(membership);
        return mapToMembershipResponseDTO(membership);
    }

    @Override
    public MembershipResponseDTO deleteMembership(long id) {
        Membership membership = membershipRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Membership not found with id: " + id));

        membershipRepository.deleteById(id);
        return mapToMembershipResponseDTO(membership);
    }

    @Override
    public MembershipResponseDTO getMembership(long id) {
        Membership membership = membershipRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Membership not found with id: " + id));

        return mapToMembershipResponseDTO(membership);
    }

    @Override
    public List<MembershipResponseDTO> getAllMemberships() {
        return membershipRepository.findAll().stream()
                .map(this::mapToMembershipResponseDTO)
                .collect(Collectors.toList());
    }

    private MembershipResponseDTO mapToMembershipResponseDTO(Membership membership) {
        return new MembershipResponseDTO(
                membership.getMemberShipId(),
                membership.getMember().getMemberId(),
                membership.getStartDate(),
                membership.getEndDate(),
                membership.getStatus(),
                membership.getMembershipPlan().getPlanId(),
                membership.getTransactionId());
    }

}
