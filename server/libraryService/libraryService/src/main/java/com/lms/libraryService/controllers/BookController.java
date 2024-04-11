package com.lms.libraryService.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lms.libraryService.external.dto.BookInstanceResponseDTO;
import com.lms.libraryService.external.dto.BookResponseDTO;
import com.lms.libraryService.external.dto.MembershipResponseDTO;
import com.lms.libraryService.external.service.BookService;
import com.lms.libraryService.external.service.MemberService;

import java.util.List;

import org.springframework.http.HttpStatus;

@RestController
@RequestMapping("/library/book")
public class BookController {

    private final BookService bookService;

    public BookController(BookService bookService){
        this.bookService=bookService;
    }
    @GetMapping("/all")
    public ResponseEntity<List<BookResponseDTO>> getAllBooks() {
        List<BookResponseDTO>response = bookService.getAllBooks();
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/{id}/instances")
    public ResponseEntity<List<BookInstanceResponseDTO>> getInstances(@PathVariable long id) {
        List<BookInstanceResponseDTO>response = bookService.getBookInstances(id);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
