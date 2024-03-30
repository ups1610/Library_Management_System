package com.lms.catalogueService.dto;

public record BookInstanceRequestDTO(

    
    String book,
    String imprint,
    String status,
    long  bookshelf
) {

}
