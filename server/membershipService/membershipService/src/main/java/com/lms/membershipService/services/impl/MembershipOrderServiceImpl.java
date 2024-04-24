package com.lms.membershipService.services.impl;

import java.util.Date;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.lms.membershipService.dto.MemberResponseDTO;
import com.lms.membershipService.dto.MembershipOrderResponseDto;
import com.lms.membershipService.dto.MembershipResponseDTO;
import com.lms.membershipService.entities.MembershipOrder;
import com.lms.membershipService.external.dto.SendMailRequestDto;
import com.lms.membershipService.external.services.EmailService;
import com.lms.membershipService.external.services.TransactionService;
import com.lms.membershipService.repositories.MembershipOrderRepository;
import com.lms.membershipService.services.MemberService;
import com.lms.membershipService.services.MembershipOrderService;
import com.lms.membershipService.services.MembershipService;

import lombok.AllArgsConstructor;

@Service
@Transactional
public class MembershipOrderServiceImpl  implements MembershipOrderService {
    
    
  
    private final MembershipOrderRepository membershipOrderRepository;
    private final MembershipService membershipService;
    private final MemberService memberService;
    private final TransactionService transactionService;
    private final EmailService emailService;

    @Autowired
    public MembershipOrderServiceImpl(MembershipOrderRepository membershipOrderRepository, MembershipService membershipService, MemberService memberService, TransactionService transactionService, EmailService emailService) {
        this.membershipOrderRepository = membershipOrderRepository;
        this.membershipService = membershipService;
        this.memberService = memberService;
        this.transactionService = transactionService;
        this.emailService = emailService;
    }
    
    @Override
    @Transactional(rollbackFor = Exception.class)
public MembershipOrderResponseDto newMembershipOrder(long memberId, double amount) {
    Optional<MembershipOrder> existingOrder = membershipOrderRepository.findByMemberId(memberId);
    String orderId;

    MembershipResponseDTO membership = membershipService.getMembershipByMemberID(memberId);
    MemberResponseDTO member = memberService.getMember(memberId);

    if (existingOrder.isPresent() && existingOrder.get().getStatus().equals("Created")) {
         orderId = existingOrder.get().getOrderId();
    } else {
        orderId = transactionService.makePayment(membership.memberName(), member.email(), amount);

       MembershipOrder newOrder = membershipOrderRepository.save(new MembershipOrder(memberId, orderId,"Created"));
    }

     emailService.sendMail(new SendMailRequestDto(member.email(), "Membership Fee", "Please pay your membership fee by clicking here: " + orderId));


    return mapToMembershipOrderResponse(memberId, membership.membershipId(), membership.memberName(), member.email(), member.mobile(), orderId, amount, "Created");
}

    @Override
    public MembershipOrderResponseDto getMembershipOrder(String orderId) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getMembershipOrder'");
    }

    @Override
    public MembershipOrderResponseDto activateMembership(String orderId) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'activateMembership'");
    }




    private MembershipOrderResponseDto mapToMembershipOrderResponse(long memberId, long membershipId, String name, String email, long mobile , String orderId,double amount, String status) {
        return new MembershipOrderResponseDto(
                memberId,
                membershipId,  
                name,
                email,
               mobile, 
               orderId,
                amount,
                status
        );
    }

}
