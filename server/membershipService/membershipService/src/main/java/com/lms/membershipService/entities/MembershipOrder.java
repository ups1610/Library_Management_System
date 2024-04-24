package com.lms.membershipService.entities;

import java.util.Date;

import jakarta.persistence.Column;
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
public class MembershipOrder {

    @Id
    @GeneratedValue
    private long id;

    private long memberId;

    @Column(length = 300)
    private String orderId;

    private Date orderDate;

    private String status;

    // Constructor without date parameter
    public MembershipOrder(long memberId, String orderId, String status) {
       
        this.memberId = memberId;
        this.orderId = orderId;
        this.orderDate = new Date();
        this.status = status;
    }
}
