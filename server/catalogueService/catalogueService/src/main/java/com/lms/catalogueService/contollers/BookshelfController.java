package com.lms.catalogueService.contollers;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lms.catalogueService.dto.BookInstanceResponseDTO;
import com.lms.catalogueService.dto.BookShelfResponseDTO;
import com.lms.catalogueService.dto.BookshelfRequestDTO;
import com.lms.catalogueService.service.BookshelfService;

import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("/api/bookshelves")
public class BookshelfController {

    private final BookshelfService bookshelfService;

    @PostMapping("/create")
    public BookShelfResponseDTO createBookShelf(@RequestBody BookshelfRequestDTO bookshelfRequestDTO) {
        return bookshelfService.createBookShelf(bookshelfRequestDTO);
    }

    @GetMapping("/all")
    public List<BookShelfResponseDTO> getAllBookShelves() {
        return bookshelfService.getAllBookShelf();
    }

    @GetMapping("/{id}")
    public BookShelfResponseDTO getBookShelf(@PathVariable("id") long id) {
        return bookshelfService.getBookShelf(id);
    }

    @PutMapping("/{id}/update")
    public BookShelfResponseDTO updateBookShelf(@PathVariable("id") long id, @RequestBody BookshelfRequestDTO bookshelfRequestDTO) {
        return bookshelfService.updateBookShelf(id, bookshelfRequestDTO);
    }

    @DeleteMapping("/{id}/delete")
    public BookShelfResponseDTO deleteBookShelf(@PathVariable("id") long id) {
        return bookshelfService.deleteBookShelf(id);
    }

    @GetMapping("/{id}/books")
    public List<BookInstanceResponseDTO> getBooksOfParticularShelf(@PathVariable("id") long id) {
        return bookshelfService.gatBooksofParticularShelf(id);
    }
}
