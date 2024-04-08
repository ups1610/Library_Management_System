package com.lms.transactionService.repositry;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.lms.transactionService.entities.Transaction;

public interface TransactionRepositry extends JpaRepository<Transaction,Long> {

  

    List<Transaction> findByMember(long member);

    List<Transaction> findByInitiatedBy(long initiator);

    List<Transaction> findByTransactionTimeStampBetween(Date today, Date endOfDay);

    

}
