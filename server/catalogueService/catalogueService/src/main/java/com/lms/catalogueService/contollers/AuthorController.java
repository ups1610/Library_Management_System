package com.lms.catalogueService.contollers;

import java.util.List;

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

import com.lms.catalogueService.dto.AuthorRequestDTO;
import com.lms.catalogueService.dto.AuthorResponseDTO;
import com.lms.catalogueService.dto.BookResponseDTO;
import com.lms.catalogueService.service.AuthorService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/authors")
@AllArgsConstructor
public class AuthorController {

    private AuthorService authorService;

    @PostMapping("/create")
    public ResponseEntity<AuthorResponseDTO> addNewAuthor(@RequestBody AuthorRequestDTO authorRequest) {
        AuthorResponseDTO response = authorService.newAuthor(authorRequest);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping("/all")
    public ResponseEntity<List<AuthorResponseDTO>> getAllAuthors() {
        List<AuthorResponseDTO> authors = authorService.getAllAuthor();
        return new ResponseEntity<>(authors, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<AuthorResponseDTO> getAuthor(@PathVariable("id") long id) {
        AuthorResponseDTO author = authorService.getAuthor(id);
        return new ResponseEntity<>(author, HttpStatus.OK);
    }

    @PutMapping("/{id}/update")
    public ResponseEntity<AuthorResponseDTO> updateAuthor(@PathVariable("id") long id, @RequestBody AuthorRequestDTO authorRequest) {
        AuthorResponseDTO updatedAuthor = authorService.updateAuthor(id, authorRequest);
        return new ResponseEntity<>(updatedAuthor, HttpStatus.OK);
    }

    @DeleteMapping("/{id}/delete")
    public ResponseEntity<AuthorResponseDTO> deleteAuthor(@PathVariable("id") long id) {
        AuthorResponseDTO deletedAuthor = authorService.deleteAuthor(id);
        return new ResponseEntity<>(deletedAuthor, HttpStatus.OK);
    }

    @GetMapping("/{id}/books")
    public ResponseEntity<List<BookResponseDTO>> getBooksOfAuthor(@PathVariable("id") long id) {
        List<BookResponseDTO> books = authorService.getBooksOfParticularAuthor(id);
        return new ResponseEntity<>(books, HttpStatus.OK);
    }
}
