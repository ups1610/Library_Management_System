package com.lms.libraryService.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.lms.libraryService.dto.BookReturnRequestDTO;
import com.lms.libraryService.dto.BookReturnResponseDTO;
import com.lms.libraryService.entities.BookReturn;
import com.lms.libraryService.repository.BookReturnRepository;
import com.lms.libraryService.service.BookReturnService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class BookReturnServiceImpl implements BookReturnService {

    private final BookReturnRepository bookReturnRepository;

    @Override
    public BookReturnResponseDTO newBookReturn(BookReturnRequestDTO bookReturnRequest) {
        BookReturn bookReturn = new BookReturn();
        bookReturn.setBookIssue(bookReturnRequest.bookIssue());
        bookReturn.setMember(bookReturnRequest.member());
        bookReturn.setDate(bookReturnRequest.date());
        bookReturn.setCollectBy(bookReturnRequest.collectBy());

        bookReturn = bookReturnRepository.save(bookReturn);
        return mapToBookReturnResponseDTO(bookReturn);
    }

    @Override
    public BookReturnResponseDTO updateBookReturn(long id, BookReturnRequestDTO bookReturnRequest) {
        BookReturn bookReturn = bookReturnRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Return can't done " + id + " does not exist"));
        bookReturn.setBookIssue(bookReturnRequest.bookIssue());
        bookReturn.setMember(bookReturnRequest.member());
        bookReturn.setDate(bookReturnRequest.date());
        bookReturn.setCollectBy(bookReturnRequest.collectBy());

        bookReturn = bookReturnRepository.save(bookReturn);
        return mapToBookReturnResponseDTO(bookReturn);

    }

    @Override
    public BookReturnResponseDTO deleteBookReturn(long id) {
        BookReturn bookReturn = bookReturnRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Return can't done " + id + " does not exist"));
        bookReturnRepository.deleteById(id);
        return mapToBookReturnResponseDTO(bookReturn);
    }

    @Override
    public BookReturnResponseDTO getBookReturn(long id) {
        BookReturn bookReturn = bookReturnRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Return can't done " + id + " does not exist"));
        return mapToBookReturnResponseDTO(bookReturn);
    }

    @Override
    public List<BookReturnResponseDTO> getAllBookReturn() {
        List<BookReturn> bookReturns = bookReturnRepository.findAll();
        return bookReturns.stream().map(this::mapToBookReturnResponseDTO).collect(Collectors.toList());
    }

    private BookReturnResponseDTO mapToBookReturnResponseDTO(BookReturn bookReturn) {
        return new BookReturnResponseDTO(
                bookReturn.getBookReturnId(),
                bookReturn.getBookIssue(),
                bookReturn.getMember(),
                bookReturn.getDate(),
                bookReturn.getCollectBy());
    }

}
