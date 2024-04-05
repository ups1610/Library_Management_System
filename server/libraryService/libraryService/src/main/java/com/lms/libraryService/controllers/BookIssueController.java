package com.lms.libraryService.controllers;

import java.util.List;
import java.util.Map;

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
import org.springframework.web.bind.annotation.RestController;

import com.lms.libraryService.dto.BookIssueRequestDTO;
import com.lms.libraryService.dto.BookIssueResponseDTO;
import com.lms.libraryService.service.BookIssueService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/library/books/issue")
@AllArgsConstructor
public class BookIssueController {

    private BookIssueService bookIssueService;
    @PostMapping
    public ResponseEntity<BookIssueResponseDTO> newBookIssue(@RequestBody BookIssueRequestDTO bookIssueRequest) {
        BookIssueResponseDTO response = bookIssueService.newBookIssue(bookIssueRequest);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<BookIssueResponseDTO> getBookIssue(@PathVariable("id") long id) {
        BookIssueResponseDTO response = bookIssueService.getBookIssue(id);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/all")
    public ResponseEntity<List<BookIssueResponseDTO>> getAllBookIssues() {
        List<BookIssueResponseDTO> response = bookIssueService.getAllBookIssue();
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/member/{memberId}")
    public ResponseEntity<List<BookIssueResponseDTO>> getAllBookIssuesByMember(@PathVariable("memberId") long memberId) {
        List<BookIssueResponseDTO> response = bookIssueService.getAllBooKIssueByMember(memberId);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/instance/{bookInstanceId}")
    public ResponseEntity<BookIssueResponseDTO> getIssueBookByBookInstance(@PathVariable("bookInstanceId") long bookInstanceId) {
        BookIssueResponseDTO response = bookIssueService.getIssueBookByBookInstance(bookInstanceId);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/count")
    public ResponseEntity<Map<String, Integer>> countIssueBooks() {
        Map<String, Integer> response = bookIssueService.countIssueBooks();
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

}
