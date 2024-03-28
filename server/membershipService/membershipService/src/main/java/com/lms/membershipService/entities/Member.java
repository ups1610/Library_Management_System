package com.lms.membershipService.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Member {

    @Id
    @GeneratedValue
    private long memberId;

    private String firstName;

    private String familyName;

    private String number;

    private String email;

    @OneToOne
    @JoinColumn(name = "current_address_id", referencedColumnName = "addressId")
    private Address currentAddress;

    @OneToOne
    @JoinColumn(name = "permanent_address_id", referencedColumnName = "addressId")
    private Address permanentAddress;



}
