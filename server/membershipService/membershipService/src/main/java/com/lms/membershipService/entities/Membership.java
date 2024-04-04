package com.lms.membershipService.entities;

import java.util.Date;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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

    @OneToOne
    private Member member;

    private Date startDate;

    private Date endDate;

    private String status="active";

    @ManyToOne
    @JoinColumn(name="planId")
    private MembershipPlan membershipPlan;

    private long transactionId;

}
