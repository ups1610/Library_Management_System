package com.lms.transactionService.entities;

import java.util.Date;

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
public class Transaction {

    @Id
    @GeneratedValue
    private long transactionId;

  
    private long member;

    private Date transactionTimeStamp;

    private double amount;

    private String narration;

    private String paidMode;

    private String referenceId=null;
    private long initiatedBy;

}
