package com.lms.catalogueService.service;

import java.util.List;

import com.lms.catalogueService.dto.BookInstanceRequestDTO;
import com.lms.catalogueService.dto.BookInstanceResponseDTO;
import com.lms.catalogueService.dto.BookResponseDTO;

public interface BookInstanceService {

    public BookInstanceResponseDTO newInstance(BookInstanceRequestDTO entity);

    public BookInstanceResponseDTO  getParticularInstance(long id);

    public BookInstanceResponseDTO updateInstance(long id, BookInstanceRequestDTO instance);

    public BookInstanceResponseDTO deleteInstance(long id);
    public BookInstanceResponseDTO updateStatus(long id, String status);

    public List<BookInstanceResponseDTO> getAllInstance();



}
