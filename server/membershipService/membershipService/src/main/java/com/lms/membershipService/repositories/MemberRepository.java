package com.lms.membershipService.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.lms.membershipService.entities.Member;
import java.util.List;
import java.util.Optional;


@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {

    Optional<Member>  findByMobile(long mobile);
    Optional<Member>  findByEmail(String email);
}

