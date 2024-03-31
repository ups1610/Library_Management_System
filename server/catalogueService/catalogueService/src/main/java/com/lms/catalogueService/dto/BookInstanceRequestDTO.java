package com.lms.catalogueService.dto;

public record BookInstanceRequestDTO(

    
    long book,
    String imprint,
    String status,
    long  bookshelf
) {

}
