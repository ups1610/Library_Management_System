package com.lms.catalogueService.service;

import java.util.List;

import com.lms.catalogueService.dto.BookResponseDTO;
import com.lms.catalogueService.dto.GenreRequestDTO;
import com.lms.catalogueService.dto.GenreResponseDTO;

public interface GenreService {

    public GenreResponseDTO  createGenre(GenreRequestDTO genre);
    public GenreResponseDTO  updateGenre(long id,GenreRequestDTO genre);
    public GenreResponseDTO deleteGenre(long id);
    public GenreResponseDTO  getGenre(long id);
    public List<GenreResponseDTO>  getAllGenre();
    public List<BookResponseDTO> getBooksOfParticularGenre(long id);


}
