package com.lms.membershipService.services.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.lms.membershipService.dto.MembershipPlanRequestDTO;
import com.lms.membershipService.dto.MembershipPlanResponseDTO;
import com.lms.membershipService.entities.MembershipPlan;
import com.lms.membershipService.repositories.MembershipPlanRepository;
import com.lms.membershipService.services.MembershipPlanService;

@Service
public class MembershipPlanServiceImpl implements MembershipPlanService {

    @Autowired
    private MembershipPlanRepository membershipPlanRepository;

    @Override
    public MembershipPlanResponseDTO newMembershipPlan(MembershipPlanRequestDTO planRequest) {
        MembershipPlan membershipPlan = new MembershipPlan();
        membershipPlan.setPlanName(planRequest.planName());
        membershipPlan.setDescription(planRequest.description());
        membershipPlan.setPrice(planRequest.price());
        membershipPlan.setDurationMonth(planRequest.durationMonth());
        membershipPlan = membershipPlanRepository.save(membershipPlan);
        return mapToMembershipPlanResponseDTO(membershipPlan);
    }

    @Override
    public MembershipPlanResponseDTO updateMembershipPlan(long id, MembershipPlanRequestDTO planRequest) {
        MembershipPlan membershipPlan = membershipPlanRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Membership plan not found with id: " + id));
        membershipPlan.setPlanName(planRequest.planName());
        membershipPlan.setDescription(planRequest.description());
        membershipPlan.setPrice(planRequest.price());
        membershipPlan.setDurationMonth(planRequest.durationMonth());
        membershipPlan = membershipPlanRepository.save(membershipPlan);
        return mapToMembershipPlanResponseDTO(membershipPlan);
    }

    @Override
    public MembershipPlanResponseDTO deleteMembershipPlan(long id) {
        MembershipPlan membershipPlan = membershipPlanRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Membership plan not found with id: " + id));
        membershipPlanRepository.deleteById(id);
        return mapToMembershipPlanResponseDTO(membershipPlan);
    }

    @Override
    public MembershipPlanResponseDTO getMembershipPlan(long id) {
        MembershipPlan membershipPlan = membershipPlanRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Membership plan not found with id: " + id));
        return mapToMembershipPlanResponseDTO(membershipPlan);
    }

    @Override
    public List<MembershipPlanResponseDTO> getAllMembershipPlans() {
        return membershipPlanRepository.findAll().stream()
                .map(this::mapToMembershipPlanResponseDTO)
                .collect(Collectors.toList());
    }

    private MembershipPlanResponseDTO mapToMembershipPlanResponseDTO(MembershipPlan membershipPlan) {
        return new MembershipPlanResponseDTO(
                membershipPlan.getPlanId(),
                membershipPlan.getPlanName(),
                membershipPlan.getDescription(),
                membershipPlan.getPrice(),
                membershipPlan.getDurationMonth());
    }
}
