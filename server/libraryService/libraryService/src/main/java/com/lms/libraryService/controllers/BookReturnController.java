package com.lms.libraryService.controllers;

import java.util.Date;
import java.util.List;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.lms.libraryService.dto.BookReturnRequestDTO;
import com.lms.libraryService.dto.BookReturnResponseDTO;
import com.lms.libraryService.service.BookReturnService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/library/books/return")
@AllArgsConstructor
public class BookReturnController {

    private final BookReturnService bookReturnService;

    @PostMapping("/return")
    public ResponseEntity<BookReturnResponseDTO> returnBook(@RequestBody BookReturnRequestDTO bookReturnRequest) {
        BookReturnResponseDTO response = bookReturnService.returnBook(bookReturnRequest);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<BookReturnResponseDTO> getBookReturn(@PathVariable("id") long id) {
        BookReturnResponseDTO response = bookReturnService.getBookReturn(id);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/all")
    public ResponseEntity<List<BookReturnResponseDTO>> getAllBookReturns() {
        List<BookReturnResponseDTO> response = bookReturnService.getAllBookReturn();
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/issue/{bookIssueId}")
    public ResponseEntity<BookReturnResponseDTO> getReturnDetailsOfIssueBook(@PathVariable("bookIssueId") long bookIssueId) {
        BookReturnResponseDTO response = bookReturnService.getReturnDetailsofIssueBook(bookIssueId);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/calculate-fine/{id}")
    public ResponseEntity<Integer> calculateFine(
            @PathVariable("id") long id,
            @RequestParam String returnDate) {
        int fineAmount = bookReturnService.getFine(id, returnDate);
        return new ResponseEntity<>(fineAmount, HttpStatus.OK);
    }

}
