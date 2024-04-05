package com.lms.libraryService.external.dto;

public record BookInstanceRequestDTO(

    
    long book,
    String imprint,
    String status,
    long  bookshelf
) {

}
