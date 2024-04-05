package com.lms.libraryService.controllers;

import java.util.List;

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
    public ResponseEntity<BookIssueResponseDTO> issueNewBook(@RequestBody BookIssueRequestDTO bookIssueRequest)
    {
        BookIssueResponseDTO response = bookIssueService.newBookIssue(bookIssueRequest);
        return new ResponseEntity<>(response,HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<BookIssueResponseDTO> getIssuedBooks(@PathVariable("id") long id)
    {
        BookIssueResponseDTO response = bookIssueService.getBookIssue(id);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/all")
    public ResponseEntity<List<BookIssueResponseDTO>> getAllIssuedBooks(){
        List<BookIssueResponseDTO> response = bookIssueService.getAllBookIssue();
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PutMapping("/{id}/update")
    public ResponseEntity<BookIssueResponseDTO> updateIssuedBook(@PathVariable long id, @RequestBody BookIssueRequestDTO bookIssueRequest)
    {
        BookIssueResponseDTO response = bookIssueService.updateBookIssue(id,bookIssueRequest);
        return new ResponseEntity<>(response,HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}/delete")
    public ResponseEntity<BookIssueResponseDTO> deleteIssuedBook(@PathVariable("id") long id)
    {
        BookIssueResponseDTO response = bookIssueService.deleteBookIssue(id);
        return new ResponseEntity<>(response,HttpStatus.CREATED);
    }

}
