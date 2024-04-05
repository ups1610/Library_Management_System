package com.lms.catalogueService.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.lms.catalogueService.dto.BookResponseDTO;
import com.lms.catalogueService.dto.GenreRequestDTO;
import com.lms.catalogueService.dto.GenreResponseDTO;
import com.lms.catalogueService.entities.Books;
import com.lms.catalogueService.entities.Genre;
import com.lms.catalogueService.repository.GenreRepository;
import com.lms.catalogueService.service.GenreService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class GenreServiceImpl implements GenreService {

    private GenreRepository genreRepository;

    @Override
    public GenreResponseDTO createGenre(GenreRequestDTO genreRequestDTO) {
        Genre genre = new Genre();
        genre.setGenreName(genreRequestDTO.genreName());
        genre = genreRepository.save(genre);
        return convertToGenreResponseDTO(genre);
    }

    @Override
    public GenreResponseDTO updateGenre(long id, GenreRequestDTO genreRequestDTO) {
        Genre genre = genreRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Invalid genre id: " + id));

        genre.setGenreName(genreRequestDTO.genreName());

        genre = genreRepository.save(genre);
        return convertToGenreResponseDTO(genre);
    }

    @Override
    public GenreResponseDTO deleteGenre(long id) {
        Genre genre = genreRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Invalid genre id: " + id));

        genreRepository.delete(genre);
        return convertToGenreResponseDTO(genre);
    }

    @Override
    public GenreResponseDTO getGenre(long id) {
        Genre genre = genreRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Invalid genre id: " + id));

        return convertToGenreResponseDTO(genre);
    }

    @Override
    public List<GenreResponseDTO> getAllGenre() {
        List<Genre> genres = genreRepository.findAll();
        return genres.stream().map(this::convertToGenreResponseDTO).collect(Collectors.toList());
    }

    @Override
    public List<BookResponseDTO> getBooksOfParticularGenre(long id) {
        Genre genre = genreRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Invalid genre id: " + id));
        return genre.getBooks().stream()
                .map(this::mapToBooksResponseDTO)
                .collect(Collectors.toList());

    }

    private GenreResponseDTO convertToGenreResponseDTO(Genre genre) {
        GenreResponseDTO genreResponseDTO = new GenreResponseDTO(
                genre.getGenreId(), genre.getGenreName());
        return genreResponseDTO;
    }

    private BookResponseDTO mapToBooksResponseDTO(Books book) {

        List<String> genres = book.getGenre().stream()
                .map(Genre::getGenreName)
                .collect(Collectors.toList());
        return new BookResponseDTO(
                book.getBookId(),
                book.getBookTitle(),
                book.getAuthor().getAuthorId(),
                book.getAuthor().getFirstName()+" "+  book.getAuthor().getFamilyName(),
                genres,
                book.getISBN());
    }
}
