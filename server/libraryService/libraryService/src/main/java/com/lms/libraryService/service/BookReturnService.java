package com.lms.libraryService.service;

import java.util.List;

import com.lms.libraryService.dto.BookReturnRequestDTO;
import com.lms.libraryService.dto.BookReturnResponseDTO;

public interface BookReturnService {

    public BookReturnResponseDTO newBookReturn(BookReturnRequestDTO bookReturn);

    public BookReturnResponseDTO updateBookReturn(long id, BookReturnRequestDTO bookReturn);

    public BookReturnResponseDTO deleteBookReturn(long id);

    public BookReturnResponseDTO getBookReturn(long id);

    public List<BookReturnResponseDTO> getAllBookReturn();
}
