package com.lms.transactionService.entities;

import java.util.Date;

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
@NoArgsConstructor
@AllArgsConstructor
public class Transaction {

    @Id
    @GeneratedValue
    private long transactionId;

    @OneToOne
    @JoinColumn(name = "memberId")
    private Member member;

    private String transactionType; // cash , upi 

    private Date date;

    private double amount;

    private String naration;

    private String mode;

    @OneToOne
    private User user;

}
