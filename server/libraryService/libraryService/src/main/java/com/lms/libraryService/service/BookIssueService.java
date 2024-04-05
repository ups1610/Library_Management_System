package com.lms.libraryService.service;

import com.lms.libraryService.dto.BookIssueRequestDTO;
import com.lms.libraryService.dto.BookIssueResponseDTO;
import java.util.List;

public interface BookIssueService {

    public BookIssueResponseDTO newBookIssue(BookIssueRequestDTO bookIssueRequest);

    public BookIssueResponseDTO updateBookIssue(long id, BookIssueRequestDTO bookIssue);

    public BookIssueResponseDTO deleteBookIssue(long id);

    public BookIssueResponseDTO getBookIssue(long id);

    public List<BookIssueResponseDTO> getAllBookIssue();
}
