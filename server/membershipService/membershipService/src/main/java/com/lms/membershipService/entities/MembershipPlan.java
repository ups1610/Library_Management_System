package com.lms.membershipService.entities;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
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

     @OneToMany(mappedBy = "membershipPlan")
    List<Membership> members=new ArrayList<>() ;

}
