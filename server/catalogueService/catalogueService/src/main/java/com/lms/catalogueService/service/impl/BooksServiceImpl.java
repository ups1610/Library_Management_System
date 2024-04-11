package com.lms.catalogueService.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.function.Function;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.FluentQuery.FetchableFluentQuery;
import org.springframework.stereotype.Service;

import com.lms.catalogueService.dto.BookInstanceResponseDTO;
import com.lms.catalogueService.dto.BookRequestDTO;
import com.lms.catalogueService.dto.BookResponseDTO;
import com.lms.catalogueService.dto.BookShelfResponseDTO;
import com.lms.catalogueService.entities.Author;
import com.lms.catalogueService.entities.BookInstance;
import com.lms.catalogueService.entities.Books;
import com.lms.catalogueService.entities.Genre;
import com.lms.catalogueService.repository.AuthorRepository;
import com.lms.catalogueService.repository.BookInstanceRepository;
import com.lms.catalogueService.repository.BooksRepository;
import com.lms.catalogueService.repository.GenreRepository;
import com.lms.catalogueService.service.BooksService;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Service
public class BooksServiceImpl implements BooksService {

        private Logger log = LoggerFactory.getLogger(BooksServiceImpl.class);
        private BooksRepository booksRepository;

        private AuthorRepository authorRepository;

        private GenreRepository genreRepository;

        public BooksServiceImpl(BooksRepository booksRepository, AuthorRepository authorRepository,
                        GenreRepository genreRepository) {
                this.booksRepository = booksRepository;
                this.authorRepository = authorRepository;
                this.genreRepository = genreRepository;
        }

        @Override
        public BookResponseDTO addNewBook(BookRequestDTO bookRequest) {

                Author author = authorRepository.findById(bookRequest.authorId())
                                .orElseThrow(() -> new IllegalArgumentException(
                                                "Invalid Author Id: " + bookRequest.authorId()));

                List<Genre> genres = new ArrayList<>();

                for (Long genreId : bookRequest.genre()) {
                        Genre genre = genreRepository.findById(genreId)
                                        .orElseThrow(() -> new IllegalArgumentException(
                                                        "Invalid Genre Id: " + genreId));
                        genres.add(genre);
                }

                Books book = new Books();

                book.setBookTitle(bookRequest.title());
                book.setGenre(genres);
                book.setAuthor(author);
                book.setISBN(bookRequest.ISBN());

                // Set author and genres
                Books savedBook = booksRepository.save(book);
                return mapToBooksResponseDTO(savedBook);
        }

        @Override
        public List<BookResponseDTO> getAllBook() {
                log.debug("calling books Service");
                return booksRepository.findAll()
                                .stream()
                                .map(this::mapToBooksResponseDTO)
                                .collect(Collectors.toList());

        }

        @Override
        public BookResponseDTO getParitcularBook(long id) {
                Books book = booksRepository.findById(id)
                                .orElseThrow(() -> new IllegalArgumentException("Book not found with id: " + id));
                return mapToBooksResponseDTO(book);
        }

        @Override
        public BookResponseDTO updateParitcularBook(long id, BookRequestDTO bookRequest) {
                Books book = booksRepository.findById(id)
                                .orElseThrow(() -> new IllegalArgumentException("Book not found with id: " + id));

                Author author = authorRepository.findById(bookRequest.authorId())
                                .orElseThrow(() -> new IllegalArgumentException(
                                                "Invalid Author Id: " + bookRequest.authorId()));

                List<Genre> genres = new ArrayList<>();

                for (Long genreId : bookRequest.genre()) {
                        Genre genre = genreRepository.findById(genreId)
                                        .orElseThrow(() -> new IllegalArgumentException(
                                                        "Invalid Genre Id: " + genreId));
                        genres.add(genre);
                }

                book.setBookTitle(bookRequest.title());
                book.setGenre(genres);
                book.setISBN(bookRequest.ISBN());
                book.setAuthor(author);

                Books updatedBook = booksRepository.save(book);
                return mapToBooksResponseDTO(updatedBook);
        }

        @Override
        public String deleteParitcularBook(long id) {
                Books book = booksRepository.findById(id)
                                .orElseThrow(() -> new IllegalArgumentException("Book not found with id: " + id));
                booksRepository.deleteById(id);
                return "Success";
        }

        @Override
        public List<BookInstanceResponseDTO> getBookIntances(long id) {
                Books book = booksRepository.findById(id)
                                .orElseThrow(() -> new IllegalArgumentException("Book not found with id: " + id));
                return book.getInstances()
                                .stream()
                                .map(this::mapToBookInstanceResponseDTO)
                                .collect(Collectors.toList());

        }

        private BookResponseDTO mapToBooksResponseDTO(Books book) {

                List<String> genres = book.getGenre().stream()
                                .map(Genre::getGenreName)
                                .collect(Collectors.toList());
                return new BookResponseDTO(
                                book.getBookId(),
                                book.getBookTitle(),
                                book.getAuthor().getAuthorId(),
                                book.getAuthor().getFirstName() + " " + book.getAuthor().getFamilyName(),
                                genres,
                                book.getISBN());
        }

        private BookInstanceResponseDTO mapToBookInstanceResponseDTO(BookInstance instance) {

                BookShelfResponseDTO bookShelfResponseDTO = null;
                if (instance.getBookshelf() != null) {
                        bookShelfResponseDTO = new BookShelfResponseDTO(
                                        instance.getBookshelf().getShelfId(),
                                        instance.getBookshelf().getShelfName(),
                                        instance.getBookshelf().getLocation(),
                                        instance.getBookshelf().getCapacity(),
                                        instance.getBookshelf().getDescription());
                }

                return new BookInstanceResponseDTO(
                                instance.getInstanceId(),
                                null,
                                instance.getImprint(),
                                instance.getStatus(),
                                bookShelfResponseDTO);
        }

        @Override
        public Map<String, Long> getTotalBooks() {
                Map<String, Long> resp = new HashMap<>();
                long total = booksRepository.count();
                resp.put("TotalBooks", total);
                return resp;
        }

}
