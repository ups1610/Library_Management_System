package com.lms.catalogueService.service;

import java.util.List;

import com.lms.catalogueService.dto.BookInstanceResponseDTO;
import com.lms.catalogueService.dto.BookRequestDTO;
import com.lms.catalogueService.dto.BookResponseDTO;

public interface BooksService {

    public BookResponseDTO addNewBook(BookRequestDTO book);

    public List<BookResponseDTO> getAllBook();

    public BookResponseDTO getParitcularBook(long id);
    public BookResponseDTO updateParitcularBook(long id,BookRequestDTO book);
    public String deleteParitcularBook(long id);

    public List<BookInstanceResponseDTO> getBookIntances(long id);


}
