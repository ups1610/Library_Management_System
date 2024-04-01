package com.lms.catalogueService.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.lms.catalogueService.dto.BookInstanceResponseDTO;
import com.lms.catalogueService.dto.BookResponseDTO;
import com.lms.catalogueService.dto.BookShelfResponseDTO;
import com.lms.catalogueService.dto.BookshelfRequestDTO;
import com.lms.catalogueService.entities.Bookshelf;
import com.lms.catalogueService.repository.BookshelfRepository;
import com.lms.catalogueService.service.BookshelfService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class BookshelfServiceImpl implements BookshelfService {
    private final BookshelfRepository bookshelfRepository;

    @Override
    public BookShelfResponseDTO createBookShelf(BookshelfRequestDTO bookshelfRequestDTO) {
        Bookshelf bookshelf = new Bookshelf();
        bookshelf.setShelfName(bookshelfRequestDTO.shelfName());
        bookshelf.setLocation(bookshelfRequestDTO.location());
        bookshelf.setCapacity(bookshelfRequestDTO.capacity());
        bookshelf.setDescription(bookshelfRequestDTO.description());
        bookshelf = bookshelfRepository.save(bookshelf);
        
        return mapToBookShelfResponseDTO(bookshelf);
    }

    @Override
    public BookShelfResponseDTO updateBookShelf(long id, BookshelfRequestDTO bookshelfRequestDTO) {
        Bookshelf bookshelf = bookshelfRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Invalid bookshelf id: " + id));

        bookshelf.setShelfName(bookshelfRequestDTO.shelfName());
        bookshelf.setLocation(bookshelfRequestDTO.location());
        bookshelf.setCapacity(bookshelfRequestDTO.capacity());
        bookshelf.setDescription(bookshelfRequestDTO.description());

        bookshelf = bookshelfRepository.save(bookshelf);
        return mapToBookShelfResponseDTO(bookshelf);
    }

    @Override
    public BookShelfResponseDTO deleteBookShelf(long id) {
        Bookshelf bookshelf = bookshelfRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Invalid bookshelf id: " + id));
        bookshelfRepository.delete(bookshelf);
        return mapToBookShelfResponseDTO(bookshelf);
    }

    @Override
    public List<BookShelfResponseDTO> getAllBookShelf() {
        List<Bookshelf> bookshelves = bookshelfRepository.findAll();
        return bookshelves.stream()
                .map(this::mapToBookShelfResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    public BookShelfResponseDTO getBookShelf(long id) {
        Bookshelf bookshelf = bookshelfRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Invalid bookshelf id: " + id));
        return mapToBookShelfResponseDTO(bookshelf);
    }

    @Override
    public List<BookInstanceResponseDTO> gatBooksofParticularShelf(long id) {
        Bookshelf bookshelf = bookshelfRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Invalid bookshelf id: " + id));
        return bookshelf.getBooks().stream()
                .map(book -> new BookInstanceResponseDTO(
                        book.getInstanceId(),
                        book.getBook().getBookTitle(),
                        book.getImprint(),
                        book.getStatus() ,
                        null))
                .collect(Collectors.toList());
    }

    private BookShelfResponseDTO mapToBookShelfResponseDTO(Bookshelf bookshelf) {
        return new BookShelfResponseDTO(
                bookshelf.getShelfId(),
                bookshelf.getShelfName(),
                bookshelf.getLocation(),
                bookshelf.getCapacity(),
                bookshelf.getDescription());
    }
}
