package com.lms.catalogueService.contollers;

import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lms.catalogueService.dto.BookInstanceResponseDTO;
import com.lms.catalogueService.dto.BookRequestDTO;
import com.lms.catalogueService.dto.BookResponseDTO;
import com.lms.catalogueService.service.BooksService;

import lombok.AllArgsConstructor;

@RestController

@RequestMapping("/catalog/books")
public class BooksController {

    private Logger log=LoggerFactory.getLogger(BooksController.class);

    private BooksService booksService;

    public BooksController( BooksService booksService){
        this.booksService=booksService;
    }

    @PostMapping("/create")
    public ResponseEntity<BookResponseDTO> addNewBook(@RequestBody BookRequestDTO bookRequest) {
        BookResponseDTO response = booksService.addNewBook(bookRequest);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping("/all")
    public ResponseEntity<List<BookResponseDTO>> getAllBooks() {
        log.debug("Getting gel All request");
        List<BookResponseDTO> books = booksService.getAllBook();
        return new ResponseEntity<>(books, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<BookResponseDTO> getBook(@PathVariable("id") long id) {
        BookResponseDTO book = booksService.getParitcularBook(id);
        return new ResponseEntity<>(book, HttpStatus.OK);
    }

    @PutMapping("/{id}/update")
    public ResponseEntity<BookResponseDTO> updateBook(@PathVariable("id") long id, @RequestBody BookRequestDTO bookRequest) {
        BookResponseDTO updatedBook = booksService.updateParitcularBook(id, bookRequest);
        return new ResponseEntity<>(updatedBook, HttpStatus.OK);
    }

    @DeleteMapping("/{id}/delete")
    public ResponseEntity<String> deleteBook(@PathVariable("id") long id) {
        String deletedBook = booksService.deleteParitcularBook(id);
        return new ResponseEntity<>(deletedBook, HttpStatus.OK);
    }

    @GetMapping("/{id}/instances")
    public ResponseEntity<List<BookInstanceResponseDTO>> getBookInstances(@PathVariable("id") long id) {
        List<BookInstanceResponseDTO> instances = booksService.getBookIntances(id);
        return new ResponseEntity<>(instances, HttpStatus.OK);
    }

    @GetMapping("/total-books")
    public ResponseEntity<Map<String, Long>> getTotalBooks() {
        Map<String, Long> totalBooks = booksService.getTotalBooks();
        return ResponseEntity.ok().body(totalBooks);
    }

}
