package com.lms.libraryService.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.lms.libraryService.dto.BookIssueRequestDTO;
import com.lms.libraryService.dto.BookIssueResponseDTO;
import com.lms.libraryService.entities.BookIssue;
import com.lms.libraryService.repository.BookIssueRepository;
import com.lms.libraryService.service.BookIssueService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class BookIssueServiceImpl implements BookIssueService {

    private final BookIssueRepository bookIssueRepository;

    @Override
    public BookIssueResponseDTO newBookIssue(BookIssueRequestDTO bookIssueRequest) {
        BookIssue bookIssue = new BookIssue();
        bookIssue.setBook(bookIssueRequest.book());
        bookIssue.setBookInstance(bookIssueRequest.bookInstance());
        bookIssue.setDateOfIssue(bookIssueRequest.dateOfIssue());
        bookIssue.setDateOfReturn(bookIssueRequest.dateOfReturn());
        bookIssue.setMember(bookIssueRequest.member());
        bookIssue.setIssueBy(bookIssueRequest.issueBy());

        bookIssue = bookIssueRepository.save(bookIssue);
        return mapToBookIssueResponseDTO(bookIssue);
    }

    @Override
    public BookIssueResponseDTO updateBookIssue(long id, BookIssueRequestDTO bookIssueRequest) {
        BookIssue bookIssue = bookIssueRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Issue can't done " + id + " does not exist"));
        bookIssue.setBook(bookIssueRequest.book());
        bookIssue.setBookInstance(bookIssueRequest.bookInstance());
        bookIssue.setDateOfIssue(bookIssueRequest.dateOfIssue());
        bookIssue.setDateOfReturn(bookIssueRequest.dateOfReturn());
        bookIssue.setMember(bookIssueRequest.member());
        bookIssue.setIssueBy(bookIssueRequest.issueBy());

        bookIssue = bookIssueRepository.save(bookIssue);
        return mapToBookIssueResponseDTO(bookIssue);

    }

    @Override
    public BookIssueResponseDTO deleteBookIssue(long id) {
        BookIssue bookIssue = bookIssueRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Issue can't deleted " + id + " does not exist"));
        bookIssueRepository.deleteById(id);
        return mapToBookIssueResponseDTO(bookIssue);

    }

    @Override
    public BookIssueResponseDTO getBookIssue(long id) {
        BookIssue bookIssue = bookIssueRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Issue with ID " + id + " does not exist"));
        return mapToBookIssueResponseDTO(bookIssue);

    }

    @Override
    public List<BookIssueResponseDTO> getAllBookIssue() {
        return bookIssueRepository.findAll().stream().map(this:: mapToBookIssueResponseDTO).collect(Collectors.toList());
    }


    private BookIssueResponseDTO mapToBookIssueResponseDTO(BookIssue bookIssue){
        return new BookIssueResponseDTO(
                bookIssue.getBookIssueId(),
                bookIssue.getBook(),
                bookIssue.getBookInstance(),
                bookIssue.getMember(),
                bookIssue.getDateOfIssue(),
                bookIssue.getDateOfReturn(),
                bookIssue.getIssueBy());
    }


}
