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

    @Column(name="ORDER_AMOUNT")
    private double price;

    private Date orderDate;

    private String status;

    public MembershipOrder(long memberId, String orderId,double amount, String status) {
       
        this.memberId = memberId;
        this.orderId = orderId;
        this.orderDate = new Date();
        this.status = status;
        this.price=amount;
    }
}
