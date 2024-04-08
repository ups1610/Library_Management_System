package com.lms.libraryService.service;

import com.lms.libraryService.dto.BookIssueRequestDTO;
import com.lms.libraryService.dto.BookIssueResponseDTO;
import java.util.List;
import java.util.Map;

public interface BookIssueService {

    public BookIssueResponseDTO newBookIssue(BookIssueRequestDTO bookIssueRequest);

 

    public BookIssueResponseDTO getBookIssue(long id);

    public List<BookIssueResponseDTO> getAllBookIssue();

    public List<BookIssueResponseDTO> getAllBooKIssueByMember(long member);
    public Map<String,Integer> countIssueBooks();
    public BookIssueResponseDTO getIssueBookByBookInstance(long bookInstance);

    public List<BookIssueResponseDTO> getAllDueReturnBooks();
    
}
