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

import com.lms.libraryService.dto.BookReturnRequestDTO;
import com.lms.libraryService.dto.BookReturnResponseDTO;
import com.lms.libraryService.service.BookReturnService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/library/books/return")
@AllArgsConstructor
public class BookReturnController {

    private final BookReturnService bookReturnService;

    @PostMapping
    public ResponseEntity<BookReturnResponseDTO> returnBook(@RequestBody BookReturnRequestDTO bookReturnRequest) {
        BookReturnResponseDTO response = bookReturnService.newBookReturn(bookReturnRequest);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<BookReturnResponseDTO> getReturnedBook(@PathVariable("id") long id) {
        BookReturnResponseDTO response = bookReturnService.getBookReturn(id);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/all")
    public ResponseEntity<List<BookReturnResponseDTO>> getAllReturnedBooks() {
        List<BookReturnResponseDTO> response = bookReturnService.getAllBookReturn();
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PutMapping("/{id}/update")
    public ResponseEntity<BookReturnResponseDTO> updateReturnedBook(@PathVariable long id,
            @RequestBody BookReturnRequestDTO bookReturnRequest) {
        BookReturnResponseDTO response = bookReturnService.updateBookReturn(id, bookReturnRequest);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}/delete")
    public ResponseEntity<BookReturnResponseDTO> deleteReturnedBook(@PathVariable("id") long id) {
        BookReturnResponseDTO response = bookReturnService.deleteBookReturn(id);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }
}
