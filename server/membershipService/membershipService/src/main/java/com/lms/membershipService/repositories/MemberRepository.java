package com.lms.membershipService.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.lms.membershipService.entities.Member;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {
}

