package com.lms.catalogueService.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.lms.catalogueService.dto.AuthorRequestDTO;
import com.lms.catalogueService.dto.AuthorResponseDTO;
import com.lms.catalogueService.dto.BookResponseDTO;
import com.lms.catalogueService.entities.Author;
import com.lms.catalogueService.entities.Genre;
import com.lms.catalogueService.repository.AuthorRepository;
import com.lms.catalogueService.service.AuthorService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class AuthorServiceImpl implements AuthorService {

    private AuthorRepository authorRepository;

    @Override
    public AuthorResponseDTO newAuthor(AuthorRequestDTO authorRequest) {
        Author author = new Author();
        author.setFirstName(authorRequest.firstName());
        author.setFamilyName(authorRequest.familyName());
        author.setDob(authorRequest.dob());
        author.setBiography(authorRequest.biography());
        author = authorRepository.save(author);
        return mapToAuthorResponseDTO(author);
    }

    @Override
    public AuthorResponseDTO updateAuthor(long id, AuthorRequestDTO authorRequest) {
        Author author = authorRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Author not found with id: " + id));
        author.setFirstName(authorRequest.firstName());
        author.setFamilyName(authorRequest.familyName());
        author.setDob(authorRequest.dob());
        author.setBiography(authorRequest.biography());
        author = authorRepository.save(author);
        return mapToAuthorResponseDTO(author);
    }

    @Override
    public AuthorResponseDTO deleteAuthor(long id) {
        Author author = authorRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Author not found with id: " + id));
        authorRepository.deleteById(id);
        return mapToAuthorResponseDTO(author);
    }

    @Override
    public AuthorResponseDTO getAuthor(long id) {
        Author author = authorRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Author not found with id: " + id));
        return mapToAuthorResponseDTO(author);
    }

    @Override
    public List<AuthorResponseDTO> getAllAuthor() {
        return authorRepository.findAll().stream()
                .map(this::mapToAuthorResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<BookResponseDTO> getBooksOfParticularAuthor(long id) {
        Author author = authorRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Author not found with id: " + id));

        return author.getBooks().stream()
                .map(book -> {
                    List<String> genres = book.getGenre().stream()
                            .map(Genre::getGenreName)
                            .collect(Collectors.toList());

                    return new BookResponseDTO(
                            book.getBookId(),
                            book.getBookTitle(),
                            id,
                            null,
                            genres,
                            book.getISBN());
                })
                .collect(Collectors.toList());
    }

    private AuthorResponseDTO mapToAuthorResponseDTO(Author author) {
        return new AuthorResponseDTO(
                author.getAuthorId(),
                author.getFirstName(),
                author.getFamilyName(),
                author.getDob(),
                author.getBiography());
    }
}
