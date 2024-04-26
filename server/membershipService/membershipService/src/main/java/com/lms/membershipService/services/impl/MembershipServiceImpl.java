package com.lms.membershipService.services.impl;

import java.text.SimpleDateFormat;
import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import com.lms.membershipService.dto.MembershipRequestDTO;
import com.lms.membershipService.dto.MembershipResponseDTO;
import com.lms.membershipService.entities.Member;
import com.lms.membershipService.entities.Membership;
import com.lms.membershipService.entities.MembershipPlan;
import com.lms.membershipService.external.dto.TransactionRequestDTO;
import com.lms.membershipService.external.dto.TransactionResponseDTO;
import com.lms.membershipService.external.services.TransactionService;
import com.lms.membershipService.repositories.MemberRepository;
import com.lms.membershipService.repositories.MembershipPlanRepository;
import com.lms.membershipService.repositories.MembershipRepository;
import com.lms.membershipService.services.MembershipOrderService;
import com.lms.membershipService.services.MembershipService;

import jakarta.transaction.Transactional;

@Service
@Transactional

public class MembershipServiceImpl implements MembershipService {

        private final MemberRepository memberRepository;
        private final TransactionService transactionService;
        private final MembershipPlanRepository membershipPlanRepository;
        private final MembershipRepository membershipRepository;
        private final MembershipOrderService membershipOrderService;
    
        @Autowired
        public MembershipServiceImpl(MemberRepository memberRepository, TransactionService transactionService, MembershipPlanRepository membershipPlanRepository, MembershipRepository membershipRepository, @Lazy MembershipOrderService membershipOrderService) {
            this.memberRepository = memberRepository;
            this.transactionService = transactionService;
            this.membershipPlanRepository = membershipPlanRepository;
            this.membershipRepository = membershipRepository;
            this.membershipOrderService = membershipOrderService;
        }

    @Override
    @Transactional
    public MembershipResponseDTO newMembership(MembershipRequestDTO membershipRequest) {
        Member member = memberRepository.findById(membershipRequest.memberId())
            .orElseThrow(() -> new IllegalArgumentException(
                    "Member not found with id: " + membershipRequest.memberId()));

    MembershipPlan membershipPlan = membershipPlanRepository.findById(membershipRequest.membershipPlanId())
            .orElseThrow(() -> new IllegalArgumentException(
                    "Membership Plan not found with id: " + membershipRequest.membershipPlanId()));

    Date startDate = membershipRequest.startDate();
     SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        String dateString = sdf.format(startDate);
   
    LocalDate localEndDate = LocalDate.parse(dateString);
    localEndDate=localEndDate.plusMonths(membershipPlan.getDurationMonth());


    Date endDate = java.sql.Date.valueOf(localEndDate);

    Membership membership = new Membership();

    membership.setMember(member);
    membership.setStartDate(startDate);
    membership.setEndDate(endDate);
    
    membership.setMembershipPlan(membershipPlan);

        if(membershipRequest.modeOfPayment().equals("Cash")){
                membership.setStatus("active");
                TransactionResponseDTO transactionResponse = transactionService.transaction(
                        new TransactionRequestDTO(member.getMemberId(), membershipPlan.getPrice(), "Membership", membershipRequest.modeOfPayment(), 1));
            
                membership.setTransactionId(transactionResponse.transactionId());
                membership = membershipRepository.save(membership);
        }else{

           membership.setStatus("pending");
           membership = membershipRepository.save(membership);
        membershipOrderService.newMembershipOrder(membershipRequest.memberId(), membershipPlan.getPrice());
        }
   

       
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
        TransactionResponseDTO transaction = null;
    if (membership.getTransactionId() != 0) {
        transaction = transactionService.getTransaction(membership.getTransactionId());
    }
     return new MembershipResponseDTO(
                membership.getMemberShipId(),
                membership.getMember().getMemberId(),
                membership.getMember().getFirstName()+" "+ membership.getMember().getFamilyName(),
                membership.getStartDate(),
                membership.getEndDate(),
                membership.getStatus(),
                membership.getMembershipPlan().getPlanName(),
                transaction
                );
    }

@Override
public MembershipResponseDTO toggleStatus(long id) {
        Membership membership = membershipRepository.findById(id)
        .orElseThrow(() -> new IllegalArgumentException("Membership not found with id: " + id));
        if("active".equals(membership.getStatus()))
                membership.setStatus("block");
        else
                membership.setStatus("active");
        
        membership= membershipRepository.save(membership);
        return mapToMembershipResponseDTO(membership);
}

@Override
public MembershipResponseDTO getMembershipByMemberID(long id) {
        // TODO Auto-generated method stub
        Member member=memberRepository.findById(id).orElseThrow(()->new IllegalArgumentException("Invalid Member id: "+id));

       Membership membership =membershipRepository.findByMember(member).orElseThrow(()->new IllegalArgumentException("Member have'nt taken membership "));;
       return mapToMembershipResponseDTO(membership);
}

@Override
public MembershipResponseDTO activateMembership(long id,long transaction) {
        

        Membership membership = membershipRepository.findById(id)
        .orElseThrow(() -> new IllegalArgumentException("Membership not found with id: " + id));
        if("pending".equals(membership.getStatus())){
                membership.setStatus("active");
                membership.setTransactionId(transaction);
        }
              

        
        membership= membershipRepository.save(membership);
        return mapToMembershipResponseDTO(membership);
}

}
