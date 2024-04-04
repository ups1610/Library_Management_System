package com.lms.membershipService.entities;

import java.util.Date;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
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
public class Membership {

    @Id
    @GeneratedValue
    private long memberShipId;

    @OneToOne(cascade = CascadeType.ALL)
    private Member member;

    private Date startDate;

    private Date endDate;

    private String status;

    @OneToOne(cascade = CascadeType.ALL)
    private MembershipPlan membershipPlan;

    private int transactionId;

}
