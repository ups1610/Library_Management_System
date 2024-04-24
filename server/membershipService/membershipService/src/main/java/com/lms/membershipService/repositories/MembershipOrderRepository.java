package com.lms.membershipService.repositories;

import org.springframework.data.jpa.repository.JpaRepository;


import com.lms.membershipService.entities.MembershipOrder;
import java.util.List;
import java.util.Optional;


public interface MembershipOrderRepository  extends JpaRepository<MembershipOrder,Long> {

    public Optional<MembershipOrder> findByOrderId(String orderId);


    public Optional<MembershipOrder> findByMemberId(long id);
}