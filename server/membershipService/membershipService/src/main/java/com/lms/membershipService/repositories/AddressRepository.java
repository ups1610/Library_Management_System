package com.lms.membershipService.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.lms.membershipService.entities.Address;

@Repository
public interface AddressRepository extends JpaRepository<Address, Long> {
}

