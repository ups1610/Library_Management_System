package com.lms.membershipService.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.lms.membershipService.entities.Membership;

@Repository
public interface MembershipRepository extends JpaRepository<Membership, Long> {

}

