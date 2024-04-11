package com.lms.libraryService.service;

import java.util.Date;
import java.util.List;

import com.lms.libraryService.dto.BookReturnRequestDTO;
import com.lms.libraryService.dto.BookReturnResponseDTO;

public interface BookReturnService {

    public BookReturnResponseDTO returnBook(BookReturnRequestDTO bookReturn);

   

    public BookReturnResponseDTO getBookReturn(long id);

    public List<BookReturnResponseDTO> getAllBookReturn();

   
    public BookReturnResponseDTO getReturnDetailsofIssueBook(long  bookIssue);

    public int  getFine(long bookIssue);
}
