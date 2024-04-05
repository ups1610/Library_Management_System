package com.lms.libraryService.service;

import java.util.List;

import com.lms.libraryService.dto.FineRequestDTO;
import com.lms.libraryService.dto.FineResponseDTO;


public interface FineService {

    public FineResponseDTO newFine(FineRequestDTO fine);

    public FineResponseDTO updateFine(long id, FineRequestDTO fine);

    public FineResponseDTO deleteFine(long id);

    public FineResponseDTO getFine(long id);

    public List<FineResponseDTO> getAllFine();

}
