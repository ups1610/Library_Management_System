package com.lms.transactionService.controllers;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lms.transactionService.dto.TransactionRequestDTO;
import com.lms.transactionService.dto.TransactionResponseDTO;
import com.lms.transactionService.service.TransactionService;

@RestController
@RequestMapping("/transaction")
public class TransactionController {

     private final TransactionService transactionService;

    public TransactionController(TransactionService transactionService) {
        this.transactionService = transactionService;
    }

    @PostMapping
    public ResponseEntity<TransactionResponseDTO> createTransaction(@RequestBody TransactionRequestDTO requestDTO) {
        TransactionResponseDTO responseDTO = transactionService.create(requestDTO);
        return new ResponseEntity<>(responseDTO, HttpStatus.CREATED);
    }

    @GetMapping("/all")
    public ResponseEntity<List<TransactionResponseDTO>> getAllTransactions() {
        List<TransactionResponseDTO> transactionList = transactionService.getAll();
        return new ResponseEntity<>(transactionList, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TransactionResponseDTO> getTransactionById(@PathVariable long id) {
        TransactionResponseDTO transaction = transactionService.getParticular(id);
        return new ResponseEntity<>(transaction, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteTransaction(@PathVariable long id) {
        String result = transactionService.delete(id);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @GetMapping("/member/{memberId}")
    public ResponseEntity<List<TransactionResponseDTO>> getTransactionsByMember(@PathVariable long memberId) {
        List<TransactionResponseDTO> transactions = transactionService.getByMember(memberId);
        return new ResponseEntity<>(transactions, HttpStatus.OK);
    }

    @GetMapping("/initiator/{initiatorId}")
    public ResponseEntity<List<TransactionResponseDTO>> getTransactionsByInitiator(@PathVariable long initiatorId) {
        List<TransactionResponseDTO> transactions = transactionService.getByInitiator(initiatorId);
        return new ResponseEntity<>(transactions, HttpStatus.OK);
    }

}
