package com.lms.catalogueService.service;

import java.util.List;

import com.lms.catalogueService.dto.AuthorRequestDTO;
import com.lms.catalogueService.dto.AuthorResponseDTO;
import com.lms.catalogueService.dto.BookResponseDTO;

public interface AuthorService {

    public AuthorResponseDTO  newAuthor(AuthorRequestDTO author);
    public AuthorResponseDTO  updateAuthor(long id,AuthorRequestDTO author);
    public AuthorResponseDTO  deleteAuthor(long id);
    public AuthorResponseDTO  getAuthor(long id);
    public List<AuthorResponseDTO>  getAllAuthor();
    public List<BookResponseDTO> getBooksOfParticularAuthor(long id);



}
