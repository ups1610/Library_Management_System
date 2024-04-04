package com.lms.membershipService;

import org.junit.jupiter.api.Test;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.lms.membershipService.external.dto.TransactionRequestDTO;
import com.lms.membershipService.external.dto.TransactionResponseDTO;
import com.lms.membershipService.external.services.TransactionService;

@SpringBootTest
class MembershipServiceApplicationTests {


	@Autowired
	private TransactionService transactionService;

	private Logger log= LoggerFactory.getLogger(MembershipServiceApplicationTests.class);
	@Test
	void contextLoads() {
	}

	@Test
	  void creteTransaction(){
		TransactionRequestDTO transactionRequestDTO=new TransactionRequestDTO(0, 0, "Membership", "Cash", 0);

		TransactionResponseDTO resp=transactionService.transaction(transactionRequestDTO);
		log.info("Transaction {}",resp);
		
	}



}
