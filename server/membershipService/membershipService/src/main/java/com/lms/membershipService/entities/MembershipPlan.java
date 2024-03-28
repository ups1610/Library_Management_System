package com.lms.membershipService.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MembershipPlan {

    @Id
    @GeneratedValue
    private long planId;

    private String planName;

    private String description;

    private double price;

    private int durationMonth;

}
