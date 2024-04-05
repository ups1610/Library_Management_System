package com.lms.libraryService.service;

import java.util.List;

import com.lms.libraryService.dto.FineRequestDTO;
import com.lms.libraryService.dto.FineResponseDTO;
import com.lms.libraryService.entities.BookReturnFine;



public interface FineService {

    public BookReturnFine newFine(FineRequestDTO fine);

  

    public FineResponseDTO getFine(long id);

    public List<FineResponseDTO> getAllFine();

}
