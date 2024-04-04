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

import com.lms.membershipService.dto.MembershipPlanRequestDTO;
import com.lms.membershipService.dto.MembershipPlanResponseDTO;
import com.lms.membershipService.services.MembershipPlanService;

@RestController
@RequestMapping("/api/membership-plans")
public class MembershipPlanController {

    private final MembershipPlanService membershipPlanService;

    public MembershipPlanController(MembershipPlanService membershipPlanService) {
        this.membershipPlanService = membershipPlanService;
    }

    @PostMapping("/create")
    public ResponseEntity<MembershipPlanResponseDTO> addNewMembershipPlan(
            @RequestBody MembershipPlanRequestDTO planRequest) {
        MembershipPlanResponseDTO response = membershipPlanService.newMembershipPlan(planRequest);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping("/all")
    public ResponseEntity<List<MembershipPlanResponseDTO>> getAllMembershipPlans() {
        List<MembershipPlanResponseDTO> plans = membershipPlanService.getAllMembershipPlans();
        return new ResponseEntity<>(plans, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<MembershipPlanResponseDTO> getMembershipPlan(@PathVariable("id") long id) {
        MembershipPlanResponseDTO plan = membershipPlanService.getMembershipPlan(id);
        return new ResponseEntity<>(plan, HttpStatus.OK);
    }

    @PutMapping("/{id}/update")
    public ResponseEntity<MembershipPlanResponseDTO> updateMembershipPlan(@PathVariable("id") long id,
            @RequestBody MembershipPlanRequestDTO planRequest) {
        MembershipPlanResponseDTO updatedPlan = membershipPlanService.updateMembershipPlan(id, planRequest);
        return new ResponseEntity<>(updatedPlan, HttpStatus.OK);
    }

    @DeleteMapping("/{id}/delete")
    public ResponseEntity<MembershipPlanResponseDTO> deleteMembershipPlan(@PathVariable("id") long id) {
        MembershipPlanResponseDTO deletedPlan = membershipPlanService.deleteMembershipPlan(id);
        return new ResponseEntity<>(deletedPlan, HttpStatus.OK);
    }
}
